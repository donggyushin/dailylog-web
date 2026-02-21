import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ThemeToggle } from '../components/ui/ThemeToggle';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const { success, error: loginError } = await login(email, password);

        if (success) {
            navigate('/');
        } else {
            setError(loginError || '로그인에 실패했습니다');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-warm-50 via-white to-warm-100 dark:from-sepia-950 dark:via-sepia-900 dark:to-sepia-950 transition-colors duration-500">
            <ThemeToggle />

            {/* 배경 장식 요소 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-warm-200/30 dark:bg-sepia-700/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-warm-300/20 dark:bg-sepia-600/15 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* 로그인 카드 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white/80 dark:bg-sepia-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-warm-200/20 dark:shadow-sepia-950/40 p-8 md:p-10 border border-warm-100/50 dark:border-sepia-700/50 transition-colors duration-300">
                    {/* 헤더 */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-warm-500 dark:text-sepia-300 mb-2 transition-colors">
                            Daily Log
                        </h1>
                        <p className="text-neutral-600 dark:text-sepia-400 text-lg transition-colors">당신의 하루를 기록하세요</p>
                    </motion.div>

                    {/* 폼 */}
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <Input
                            label="이메일"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            disabled={isLoading}
                        />

                        <Input
                            label="비밀번호"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={isLoading}
                        />

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl text-red-700 dark:text-red-300 text-sm transition-colors"
                            >
                                {error}
                            </motion.div>
                        )}

                        <Button
                            type="submit"
                            size="lg"
                            isLoading={isLoading}
                            className="w-full"
                        >
                            로그인
                        </Button>
                    </motion.form>

                    {/* 푸터 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-neutral-600 dark:text-sepia-400 transition-colors">
                            계정이 없으신가요?{' '}
                            <Link
                                to="/signup"
                                className="text-warm-500 dark:text-sepia-300 font-semibold hover:text-warm-600 dark:hover:text-sepia-200 transition-colors"
                            >
                                회원가입
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
