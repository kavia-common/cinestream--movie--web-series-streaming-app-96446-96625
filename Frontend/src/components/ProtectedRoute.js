import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function ProtectedRoute({ children, role }) {
  /** Route guard component enforcing authentication and optional role. */
  const { token, user, hasRole } = useAuth();
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (role && !hasRole(role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
