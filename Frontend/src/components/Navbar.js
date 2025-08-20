import React, { useState } from 'react';
import { Link, useNavigate, createSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function Navbar() {
  /** Top navigation bar. Shows only Home, Watchlist, and Search when authenticated. */
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth();
  const isAuthed = !!token;

  const doSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate({ pathname: '/search', search: `?${createSearchParams({ q })}` });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">CineStream</Link>
      <div className="nav-links" style={{ flexWrap: 'wrap' }}>
        <Link to="/">Home</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/search">Search</Link>
        <form onSubmit={doSearch} style={{ display: 'flex', gap: 8, flex: 1, minWidth: 200 }}>
          <input
            className="search-input"
            placeholder="Search titles, genres..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search"
          />
          <button className="btn" type="submit" aria-label="Run search">Go</button>
        </form>
      </div>
      <div className="nav-right">
        {/* For authenticated users, we intentionally keep the top bar minimal per requirements */}
        {!isAuthed && (
          <>
            <Link to="/login" className="btn">Log in</Link>
            <Link to="/register" className="btn primary">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
