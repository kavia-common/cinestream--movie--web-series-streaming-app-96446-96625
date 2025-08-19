import React, { useEffect, useState } from 'react';
import { adminCreateContent, adminDeleteContent, adminListContent, adminUpdateContent } from '../../api/admin';

export default function ContentManager() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const refresh = () => {
    setLoading(true);
    adminListContent()
      .then((d) => setList(d?.items || []))
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { refresh(); }, []);

  const create = async (e) => {
    e.preventDefault();
    const payload = { title, year, genre, language, stream_url: streamUrl, thumbnail };
    try {
      // If backend expects multipart, convert accordingly
      await adminCreateContent(objectToFormData(payload));
      setTitle(''); setYear(''); setGenre(''); setLanguage(''); setStreamUrl(''); setThumbnail('');
      refresh();
    } catch {
      alert('Failed to create content');
    }
  };

  const update = async (id, patch) => {
    try {
      await adminUpdateContent(id, patch);
      refresh();
    } catch {
      alert('Update failed');
    }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await adminDeleteContent(id);
      refresh();
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div>
      <h1>Content Manager</h1>

      <form className="form" onSubmit={create}>
        <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <input className="input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input className="input" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
          <input className="input" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
          <input className="input" placeholder="Language" value={language} onChange={(e) => setLanguage(e.target.value)} />
          <input className="input" placeholder="Stream URL (HLS .m3u8 or MP4)" value={streamUrl} onChange={(e) => setStreamUrl(e.target.value)} required />
          <input className="input" placeholder="Thumbnail URL" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
        </div>
        <button className="btn primary" type="submit">Create</button>
      </form>

      <div className="section">
        <h2>Catalog</h2>
        {loading && <div className="helper">Loading content...</div>}
        <div className="grid">
          {list.map((it) => (
            <div className="card" key={it.id} style={{ padding: 12 }}>
              <img className="thumb" src={it.thumbnail || ''} alt={it.title} />
              <div className="content">
                <strong>{it.title}</strong>
                <span className="helper">{it.genre} • {it.year}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, padding: 10 }}>
                <button className="btn" onClick={() => update(it.id, { featured: !it.featured })}>
                  {it.featured ? 'Unfeature' : 'Feature'}
                </button>
                <button className="btn danger" onClick={() => del(it.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function objectToFormData(obj) {
  const fd = new FormData();
  Object.entries(obj).forEach(([k, v]) => fd.append(k, v));
  return fd;
}
