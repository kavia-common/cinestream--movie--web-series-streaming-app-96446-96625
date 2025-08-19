import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHomeSections } from '../api/content';

export default function Home() {
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHomeSections()
      .then((data) => setSections(data || {}))
      .catch(() => setSections({}))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Welcome to CineStream</h1>
      <p className="helper">Watch latest movies, trending shows and originals.</p>
      {loading && <div className="helper">Loading...</div>}
      {!loading && Object.keys(sections).length === 0 && (
        <div className="helper">No content to display.</div>
      )}
      {Object.entries(sections).map(([key, items]) => (
        <div className="section" key={key}>
          <h2>{key}</h2>
          <div className="grid">
            {(items || []).map((it) => (
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
      ))}
    </div>
  );
}
