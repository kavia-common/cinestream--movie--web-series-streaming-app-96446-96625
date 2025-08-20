import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { login, getMe } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      // Request token (backend returns { access_token, token_type })
      const res = await login({ email, password });
      const token = res?.access_token || res?.token;
      if (!token) {
        throw new Error('No token returned from server');
      }

      // Set token first so subsequent calls include Authorization header
      setAuth(token, null);

      // Fetch user info to populate context
      try {
        const me = await getMe();
        setAuth(token, me?.user || me || null);
      } catch {
        // If /users/me fails, allow login to proceed with token only
      }

      const redirect = location.state?.from?.pathname || '/';
      navigate(redirect);
    } catch (e) {
      setErr('Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '0 auto' }}>
      <h1>Log in</h1>
      <form className="form" onSubmit={submit}>
        <label htmlFor="email">Email</label>
        <input id="email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Password</label>
        <input id="password" className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {err && <div className="helper" style={{ color: 'var(--danger)' }}>{err}</div>}
        <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
      </form>
      <p className="helper">New to CineStream? <Link to="/register">Create an account</Link></p>
    </div>
  );
}
