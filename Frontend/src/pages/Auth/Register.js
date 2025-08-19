import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res = await register({ name, email, password });
      setAuth(res?.access_token || res?.token, res?.user);
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
