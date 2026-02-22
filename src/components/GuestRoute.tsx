import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface GuestRouteProps {
  children: React.ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <p>로딩 중...</p>
      </div>
    );
  }

  // 이미 로그인한 사용자는 홈으로 리다이렉트
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
