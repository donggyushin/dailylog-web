import { useAuth } from '../contexts/AuthContext';
import './HomePage.css';

export function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Daily Log</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}!</span>
          <button onClick={logout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <main className="home-content">
        <div className="welcome-card">
          <h2>Welcome to Daily Log</h2>
          <p>You are successfully logged in!</p>
          <div className="user-details">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
