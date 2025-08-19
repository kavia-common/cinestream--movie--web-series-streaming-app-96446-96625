import React, { useState } from 'react';
import { Link, useNavigate, createSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();

  const doSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate({ pathname: '/search', search: `?${createSearchParams({ q })}` });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">CineStream</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/profiles">Profiles</Link>
        {user?.roles?.includes('admin') && <Link to="/admin">Admin</Link>}
        <form onSubmit={doSearch} style={{display: 'flex', gap: 8, flex: 1}}>
          <input
            className="search-input"
            placeholder="Search titles, genres..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search"
          />
          <button className="btn" type="submit" aria-label="Run search">Search</button>
        </form>
      </div>
      <div className="nav-right">
        {!token ? (
          <>
            <Link to="/login" className="btn">Log in</Link>
            <Link to="/register" className="btn primary">Sign up</Link>
          </>
        ) : (
          <>
            <span className="helper">Hi, {user?.name || user?.email}</span>
            <button className="btn" onClick={() => navigate('/plans')}>Plans</button>
            <button className="btn danger" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
