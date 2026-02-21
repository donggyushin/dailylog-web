import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AuthPages.css';

export function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        // 비밀번호 확인
        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다');
            return;
        }

        // 비밀번호 최소 길이 확인
        if (password.length < 6) {
            setError('비밀번호는 최소 6자 이상이어야 합니다');
            return;
        }

        setIsLoading(true);

        const { success, error: signupError } = await signup(email, password, name);

        if (success) {
            navigate('/');
        } else {
            setError(signupError || 'Signup failed');
        }

        setIsLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Daily Log</h1>
                <h2>회원가입</h2>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">이름</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름을 입력하세요"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">비밀번호 확인</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="btn-primary" disabled={isLoading}>
                        {isLoading ? '가입 중...' : '회원가입'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        이미 계정이 있으신가요?{' '}
                        <Link to="/login" className="auth-link">로그인</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
