import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchContent } from '../api/content';

export default function Search() {
  const [params] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const q = params.get('q') || '';

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    searchContent({ q })
      .then((data) => setResults(data?.results || []))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div>
      <h1>Search</h1>
      <p className="helper">Showing results for: <span className="kbd">{q || '—'}</span></p>
      {loading && <div className="helper">Searching...</div>}
      {!loading && results.length === 0 && <div className="helper">No results.</div>}
      <div className="grid">
        {results.map((it) => (
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
