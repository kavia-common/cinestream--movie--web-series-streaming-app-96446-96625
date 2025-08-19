import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as apiRegister, login as apiLogin, getMe } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(''); // collected for UX but backend does not use it
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      // 1) Create account (backend requires only email & password)
      await apiRegister({ email, password });

      // 2) Auto login to obtain token
      const tokenRes = await apiLogin({ email, password });
      const token = tokenRes?.access_token || tokenRes?.token;
      if (!token) throw new Error('No token after registration');

      // 3) Set token immediately so axios includes Authorization
      setAuth(token, null);

      // 4) Fetch user details to store in context
      try {
        const me = await getMe();
        setAuth(token, me?.user || me || null);
      } catch {
        // Allow proceeding even if user fetch fails
      }

      // 5) Forward to plan selection
      navigate('/plans', { replace: true });
    } catch (e) {
      setErr('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <h1>Create your account</h1>
      <form className="form" onSubmit={submit}>
        <label htmlFor="name">Name</label>
        <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
        <label htmlFor="email">Email</label>
        <input id="email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Password</label>
        <input id="password" className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {err && <div className="helper" style={{ color: 'var(--danger)' }}>{err}</div>}
        <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Continue'}</button>
      </form>
      <p className="helper">Already have an account? <Link to="/login">Sign in</Link></p>
    </div>
  );
}
