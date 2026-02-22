import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../utils/api';
import { Button } from '../components/ui/Button';

interface Message {
  id: string;
  user_id: string;
  role: 'SYSTEM' | 'USER' | 'ASSISTANT';
  content: string;
  created_at: string;
}

interface Session {
  id: string;
  user_id: string;
  active: boolean;
  messages: Message[];
  created_at: string;
  updated_at: string;
}

export function ChatPage() {
  const { user } = useAuth();
  const [session, setSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 메시지 목록 끝으로 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 세션 로드
  useEffect(() => {
    const loadSession = async () => {
      setIsLoading(true);
      const { data, error } = await api.chat.getCurrentSession();

      if (data && !error) {
        const sessionData = data as Session;
        setSession(sessionData);
        // SYSTEM 메시지 제외
        const filteredMessages = sessionData.messages.filter(
          (msg) => msg.role !== 'SYSTEM'
        );
        setMessages(filteredMessages);
      }

      setIsLoading(false);
    };

    loadSession();
  }, []);

  // 메시지 변경 시 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  // 메시지 전송
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputMessage.trim() || !user || !session) return;

    const userMessage: Message = {
      id: 'temp-' + Date.now(),
      user_id: user.id,
      role: 'USER',
      content: inputMessage,
      created_at: new Date().toISOString(),
    };

    // 유저 메시지 즉시 표시
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsSending(true);

    try {
      const { data, error } = await api.chat.sendMessage(
        session.id,
        user.id,
        inputMessage
      );

      if (data && !error) {
        const assistantMessage = data as Message;
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        // 에러 처리
        console.error('Failed to send message:', error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-accent-cream dark:bg-dark-bg flex items-center justify-center">
        <div className="text-natural-900 dark:text-dark-text font-bold uppercase tracking-wider">
          로딩 중...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent-cream dark:bg-dark-bg flex flex-col">
      {/* 헤더 */}
      <header className="border-b-2 border-natural-900 dark:border-dark-border bg-white dark:bg-dark-card p-4">
        <h1 className="font-serif font-bold text-2xl text-natural-900 dark:text-dark-text">
          Daily Log 대화
        </h1>
        <p className="text-sm text-natural-600 dark:text-natural-400 mt-1">
          오늘 하루를 함께 돌아봐요
        </p>
      </header>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'USER' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] border-2 border-natural-900 dark:border-dark-border p-4 ${
                message.role === 'USER'
                  ? 'bg-natural-900 dark:bg-dark-text text-white dark:text-dark-bg'
                  : 'bg-white dark:bg-dark-card text-natural-900 dark:text-dark-text'
              }`}
            >
              <div className="font-bold uppercase tracking-wider text-xs mb-2 opacity-70">
                {message.role === 'USER' ? '나' : 'AI'}
              </div>
              <div className="whitespace-pre-wrap break-words">
                {message.content}
              </div>
            </div>
          </div>
        ))}

        {/* 로딩 인디케이터 */}
        {isSending && (
          <div className="flex justify-start">
            <div className="max-w-[70%] border-2 border-natural-900 dark:border-dark-border p-4 bg-white dark:bg-dark-card">
              <div className="font-bold uppercase tracking-wider text-xs mb-2 opacity-70 text-natural-900 dark:text-dark-text">
                AI
              </div>
              <div className="flex space-x-1">
                <span className="animate-bounce text-natural-900 dark:text-dark-text">.</span>
                <span
                  className="animate-bounce text-natural-900 dark:text-dark-text"
                  style={{ animationDelay: '0.2s' }}
                >
                  .
                </span>
                <span
                  className="animate-bounce text-natural-900 dark:text-dark-text"
                  style={{ animationDelay: '0.4s' }}
                >
                  .
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="border-t-2 border-natural-900 dark:border-dark-border bg-white dark:bg-dark-card p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            disabled={isSending}
            className="flex-1 px-4 py-3 border-2 border-natural-900 dark:border-dark-border bg-white dark:bg-dark-bg text-natural-900 dark:text-dark-text placeholder-natural-400 focus:outline-none focus:ring-2 focus:ring-natural-900 dark:focus:ring-dark-border disabled:opacity-50"
          />
          <Button type="submit" disabled={isSending || !inputMessage.trim()}>
            전송
          </Button>
        </form>
      </div>
    </div>
  );
}
