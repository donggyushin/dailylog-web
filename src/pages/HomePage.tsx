import { useAuth } from '../contexts/AuthContext';
import './HomePage.css';

export function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Daily Log</h1>
        <div className="user-info">
          <span>환영합니다, {user?.name}님!</span>
          <button onClick={logout} className="btn-logout">
            로그아웃
          </button>
        </div>
      </header>

      <main className="home-content">
        <div className="welcome-card">
          <h2>Daily Log에 오신 것을 환영합니다</h2>
          <p>로그인에 성공하셨습니다!</p>
          <div className="user-details">
            <p><strong>이름:</strong> {user?.name}</p>
            <p><strong>이메일:</strong> {user?.email}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
