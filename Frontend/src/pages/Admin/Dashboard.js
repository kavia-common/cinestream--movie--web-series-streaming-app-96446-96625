import React, { useEffect, useState } from 'react';
import { adminAnalytics } from '../../api/admin';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    adminAnalytics()
      .then((d) => setStats(d || {}))
      .catch(() => setStats({}));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="grid">
        <div className="card" style={{ padding: 16 }}>
          <h3>Content</h3>
          <p className="helper">Manage your catalog</p>
          <Link className="btn" to="/admin/content">Open</Link>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <h3>Users</h3>
          <p className="helper">Manage user accounts</p>
          <Link className="btn" to="/admin/users">Open</Link>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <h3>Analytics</h3>
          <p className="helper">View engagement and revenue</p>
          <Link className="btn" to="/admin/analytics">Open</Link>
        </div>
      </div>
      <div className="section">
        <h2>Key Metrics</h2>
        <div className="grid">
          <div className="card" style={{ padding: 16 }}>
            <strong>Active Users</strong>
            <div style={{ fontSize: 32 }}>{stats?.active_users ?? '—'}</div>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <strong>Daily Streams</strong>
            <div style={{ fontSize: 32 }}>{stats?.daily_streams ?? '—'}</div>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <strong>MRR</strong>
            <div style={{ fontSize: 32 }}>${stats?.mrr ?? '—'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
