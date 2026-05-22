import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/home';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      setTimeout(() => setError(''), 5000);
      return;
    }
    setLoading(true);
    try {
      const response = await ApiService.loginUser({ email, password });
      if (response.statusCode === 200) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        navigate(from, { replace: true });
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* Top icon */}
        <div style={{ textAlign: 'center', marginBottom: 8, fontSize: 36 }}>🏨</div>
        <h2>Welcome Back</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>
          Sign in to your Phegon Hotel account
        </p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>📧 Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label>🔒 Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? '⏳ Signing in…' : 'Sign In →'}
          </button>
        </form>

        <div className="auth-divider"></div>

        <p className="register-link">
          Don't have an account?{' '}
          <a href="/register">Create one for free</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
