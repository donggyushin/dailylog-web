import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { ThemeToggle } from '../components/ui/ThemeToggle';

export function HomePage() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-accent-cream dark:bg-dark-bg">
            <ThemeToggle />

            {/* 헤더 */}
            <header className="border-b-2 border-natural-900 dark:border-dark-border bg-white dark:bg-dark-card">
                <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
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
            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* 환영 카드 */}
                <div className="bg-white dark:bg-dark-card border-2 border-natural-900 dark:border-dark-border p-10 md:p-12 mb-8">
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-natural-900 dark:text-dark-text mb-3 tracking-tight">
                            환영합니다
                        </h2>
                        <div className="w-16 h-1 bg-natural-900 dark:bg-dark-border mb-6"></div>
                        <p className="text-natural-600 dark:text-dark-text text-lg leading-relaxed">
                            당신의 하루를 기록할 준비가 되었습니다.
                        </p>
                    </div>

                    {/* 사용자 정보 */}
                    <div className="border-t-2 border-natural-200 dark:border-dark-border/30 pt-8">
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-bold text-natural-900 dark:text-dark-text mb-2 uppercase tracking-wider">
                                    이름
                                </p>
                                <p className="text-base text-natural-900 dark:text-dark-text">
                                    {user?.username}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-natural-900 dark:text-dark-text mb-2 uppercase tracking-wider">
                                    이메일
                                </p>
                                <p className="text-base text-natural-900 dark:text-dark-text">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 일기 작성 영역 (향후 구현) */}
                <div className="bg-white dark:bg-dark-card border-2 border-natural-900 dark:border-dark-border p-10 md:p-12">
                    <h3 className="text-2xl font-serif font-bold text-natural-900 dark:text-dark-text mb-6 tracking-tight">
                        오늘의 일기
                    </h3>
                    <p className="text-natural-600 dark:text-dark-text/80 text-center py-12">
                        일기 작성 기능이 곧 추가될 예정입니다.
                    </p>
                </div>
            </main>
        </div>
    );
}
