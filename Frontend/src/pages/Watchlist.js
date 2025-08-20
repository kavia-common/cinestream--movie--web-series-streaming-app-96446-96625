import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWatchlist } from '../api/content';

export default function Watchlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getWatchlist()
      .then((d) => setItems(d?.items || []))
      .catch(() => setItems([]));
  }, []);

  return (
    <div>
      <h1>Your Watchlist</h1>
      {items.length === 0 && <div className="helper">No items yet.</div>}
      <div className="grid">
        {items.map((it) => (
          <Link className="card" key={it.id} to={`/title/${it.id}`}>
            <img className="thumb" src={it.thumbnail || ''} alt={it.title} />
            <div className="content">
              <strong>{it.title}</strong>
              <span className="helper">{it.genre} • {it.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
