import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { api } from '../utils/api';

interface Diary {
    id: string;
    user_id: string;
    chat_session_id: string;
    title: string;
    content: string;
    writed_at: string;
    thumbnail_url: string;
    created_at: string;
    updated_at: string;
}

export function HomePage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 오늘 날짜에 작성한 일기가 있는지 확인
    const hasTodayDiary = () => {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        return diaries.some(diary => diary.writed_at === today);
    };

    // 일기 리스트 로드
    useEffect(() => {
        const loadDiaries = async () => {
            setIsLoading(true);
            const { data, error } = await api.diary.list();

            if (data && !error) {
                setDiaries(data as Diary[]);
            }

            setIsLoading(false);
        };

        loadDiaries();
    }, []);

    // 날짜 포맷팅
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    return (
        <div className="min-h-screen bg-accent-cream dark:bg-dark-bg">
            <ThemeToggle />

            {/* 헤더 */}
            <header className="border-b-2 border-natural-900 dark:border-dark-border bg-white dark:bg-dark-card">
                <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 dark:text-dark-text tracking-tight">
                        Daily Log
                    </h1>
                    <div className="flex items-center gap-6">
                        <span className="text-sm text-natural-600 dark:text-dark-text/80">
                            {user?.username}님
                        </span>
                        <Button
                            onClick={logout}
                            variant="outline"
                            size="sm"
                        >
                            로그아웃
                        </Button>
                    </div>
                </div>
            </header>

            {/* 메인 콘텐츠 */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                {isLoading ? (
                    <div className="text-center py-20">
                        <p className="text-natural-600 dark:text-dark-text font-bold uppercase tracking-wider">
                            로딩 중...
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* 오늘 일기가 없으면 작성하기 카드 표시 */}
                        {!hasTodayDiary() && (
                            <button
                                onClick={() => navigate('/chat')}
                                className="bg-natural-900 dark:bg-dark-text hover:bg-natural-800 dark:hover:bg-natural-100 border-2 border-natural-900 dark:border-dark-border p-8 flex flex-col items-center justify-center min-h-[300px] transition-colors group"
                            >
                                <div className="text-6xl mb-4 text-white dark:text-dark-bg">+</div>
                                <h3 className="text-2xl font-serif font-bold text-white dark:text-dark-bg mb-2">
                                    일기 작성하기
                                </h3>
                                <p className="text-sm text-white/80 dark:text-dark-bg/80 uppercase tracking-wider">
                                    오늘의 이야기를 들려주세요
                                </p>
                            </button>
                        )}

                        {/* 일기 리스트 */}
                        {diaries.map((diary) => (
                            <div
                                key={diary.id}
                                className="bg-white dark:bg-dark-card border-2 border-natural-900 dark:border-dark-border p-6 flex flex-col min-h-[300px] cursor-pointer hover:bg-natural-50 dark:hover:bg-natural-900/20 transition-colors"
                            >
                                {/* 날짜 */}
                                <div className="text-right mb-4">
                                    <span className="text-xs font-bold uppercase tracking-wider text-natural-600 dark:text-natural-400">
                                        {formatDate(diary.writed_at)}
                                    </span>
                                </div>

                                {/* 썸네일이 있는 경우 */}
                                {diary.thumbnail_url ? (
                                    <>
                                        <div className="mb-4 border-2 border-natural-900 dark:border-dark-border overflow-hidden aspect-video flex-1">
                                            <img
                                                src={diary.thumbnail_url}
                                                alt={diary.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {/* 제목만 표시 */}
                                        <h3 className="font-serif font-bold text-xl text-natural-900 dark:text-dark-text line-clamp-2">
                                            {diary.title}
                                        </h3>
                                    </>
                                ) : (
                                    <>
                                        {/* 제목 */}
                                        <h3 className="font-serif font-bold text-xl text-natural-900 dark:text-dark-text mb-3 line-clamp-2">
                                            {diary.title}
                                        </h3>

                                        {/* 본문 미리보기 */}
                                        <p className="text-natural-600 dark:text-dark-text/80 text-sm line-clamp-3 flex-1">
                                            {diary.content}
                                        </p>

                                        {/* 하단 구분선 */}
                                        <div className="mt-4 pt-4 border-t-2 border-natural-900 dark:border-dark-border">
                                            <span className="text-xs font-bold uppercase tracking-widest text-natural-600 dark:text-natural-400">
                                                더 읽기 →
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* 일기가 하나도 없을 경우 */}
                {!isLoading && diaries.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-natural-600 dark:text-dark-text/80 mb-6">
                            아직 작성된 일기가 없습니다.
                        </p>
                        <Button onClick={() => navigate('/chat')}>
                            첫 일기 작성하기
                        </Button>
                    </div>
                )}
            </main>
        </div>
    );
}
