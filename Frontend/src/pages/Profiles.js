import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createProfile, deleteProfile, listProfiles } from '../api/auth';

export default function Profiles() {
  const { profiles, setActiveProfile } = useAuth();
  const [localProfiles, setLocalProfiles] = useState(profiles || []);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { setLocalProfiles(profiles || []); }, [profiles]);

  const add = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const p = await createProfile({ name });
      const list = await listProfiles();
      setLocalProfiles(list || []);
      setName('');
      setActiveProfile(p);
    } catch {} finally { setSaving(false); }
  };

  const remove = async (id) => {
    setSaving(true);
    try {
      await deleteProfile(id);
      const list = await listProfiles();
      setLocalProfiles(list || []);
    } catch {} finally { setSaving(false); }
  };

  return (
    <div>
      <h1>Profiles</h1>
      <div className="section">
        <div className="form" style={{ maxWidth: 480 }}>
          <label htmlFor="pname">Add profile</label>
          <input id="pname" className="input" placeholder="Profile name" value={name} onChange={(e) => setName(e.target.value)} />
          <button className="btn primary" onClick={add} disabled={saving}>{saving ? 'Saving...' : 'Add'}</button>
        </div>
      </div>
      <div className="grid">
        {localProfiles.map((p) => (
          <div key={p.id} className="card" style={{ padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{p.name}</strong>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn success" onClick={() => setActiveProfile(p)}>Use</button>
                <button className="btn danger" onClick={() => remove(p.id)} disabled={saving}>Delete</button>
              </div>
            </div>
            <div className="helper">Age rating: {p.age_rating || 'All'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
