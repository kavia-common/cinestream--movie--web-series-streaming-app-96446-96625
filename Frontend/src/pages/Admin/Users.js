import React, { useEffect, useState } from 'react';
import { adminUsers } from '../../api/admin';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    adminUsers()
      .then((d) => setUsers(d?.items || []))
      .catch(() => setUsers([]));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <div className="grid">
        {users.map((u) => (
          <div className="card" style={{ padding: 12 }} key={u.id}>
            <div><strong>{u.name || u.email}</strong></div>
            <div className="helper">Roles: {(u.roles || []).join(', ') || 'user'}</div>
            <div className="helper">Status: {u.status || 'active'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
