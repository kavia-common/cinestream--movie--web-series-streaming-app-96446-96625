import React, { useEffect, useState } from 'react';
import { adminAnalytics } from '../../api/admin';

export default function Analytics() {
  const [data, setData] = useState({});

  useEffect(() => {
    adminAnalytics()
      .then((d) => setData(d || {}))
      .catch(() => setData({}));
  }, []);

  return (
    <div>
      <h1>Analytics</h1>
      <div className="grid">
        <div className="card" style={{ padding: 16 }}>
          <strong>Daily Active Users</strong>
          <div style={{ fontSize: 32 }}>{data?.dau ?? '—'}</div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <strong>Monthly Streams</strong>
          <div style={{ fontSize: 32 }}>{data?.monthly_streams ?? '—'}</div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <strong>Churn</strong>
          <div style={{ fontSize: 32 }}>{data?.churn_rate ?? '—'}%</div>
        </div>
      </div>
    </div>
  );
}
