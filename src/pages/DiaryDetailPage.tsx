import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DiaryEntry } from '../components/DiaryEntry';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { Button } from '../components/ui/Button';
import { api } from '../utils/api';

interface Diary {
    id: string;
    user_id: string;
    chat_session_id: string;
    title: string;
    content: string;
    writed_at: string;
    thumbnail_url?: string;
    created_at: string;
    updated_at: string;
}

export function DiaryDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [diary, setDiary] = useState<Diary | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDiary = async () => {
            if (!id) {
                setError('일기 ID가 없습니다.');
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            const { data, error } = await api.diary.getById(id);

            if (error) {
                setError(error);
            } else if (data) {
                setDiary(data as Diary);
            }

            setIsLoading(false);
        };

        loadDiary();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-accent-cream dark:bg-dark-bg flex items-center justify-center">
                <p className="text-natural-600 dark:text-dark-text font-bold uppercase tracking-wider">
                    로딩 중...
                </p>
            </div>
        );
    }

    if (error || !diary) {
        return (
            <div className="min-h-screen bg-accent-cream dark:bg-dark-bg flex items-center justify-center">
                <div className="text-center">
                    <p className="text-natural-600 dark:text-dark-text mb-6">
                        {error || '일기를 찾을 수 없습니다.'}
                    </p>
                    <Button onClick={() => navigate('/')}>
                        홈으로 돌아가기
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-accent-cream dark:bg-dark-bg">
            <ThemeToggle />

            {/* 헤더 */}
            <header className="border-b-2 border-natural-900 dark:border-dark-border bg-white dark:bg-dark-card">
                <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="text-2xl md:text-3xl font-serif font-bold text-natural-900 dark:text-dark-text tracking-tight hover:underline"
                    >
                        Daily Log
                    </button>
                    <Button
                        onClick={() => navigate('/')}
                        variant="outline"
                        size="sm"
                    >
                        ← 목록으로
                    </Button>
                </div>
            </header>

            {/* 메인 콘텐츠 */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <DiaryEntry
                    title={diary.title}
                    content={diary.content}
                    createdAt={diary.writed_at}
                    thumbnailUrl={diary.thumbnail_url}
                    showSaveButton={false}
                />
            </main>
        </div>
    );
}
