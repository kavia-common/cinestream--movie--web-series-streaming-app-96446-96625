import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getMe, listProfiles } from '../api/auth';
import { getToken, saveToken, clearAllAuth, getUser, saveUser, getActiveProfile, saveActiveProfile } from '../utils/storage';

const AuthContext = createContext(null);

/**
 * AuthProvider stores token, user info, and active profile for the session.
 * It also exposes helpers for login/logout and role checks.
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [profiles, setProfiles] = useState([]);
  const [activeProfile, setActiveProfile] = useState(getActiveProfile());
  const [loading, setLoading] = useState(!!getToken());

  useEffect(() => {
    async function bootstrap() {
      if (!token) { setLoading(false); return; }
      try {
        const payload = jwtDecode(token);
        if (payload?.exp && payload.exp * 1000 < Date.now()) {
          // token expired
          doLogout();
          return;
        }
        const me = await getMe();
        setUser(me?.user || me);
        saveUser(me?.user || me);
        const profs = await listProfiles().catch(() => []);
        setProfiles(profs || []);
        // ensure active profile is set
        if (!activeProfile && profs?.length) {
          setActiveProfile(profs[0]);
          saveActiveProfile(profs[0]);
        }
      } catch (e) {
        // Failed to restore session; clear
        doLogout();
      } finally {
        setLoading(false);
      }
    }
    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const doLogin = (newToken, newUser) => {
    setToken(newToken);
    saveToken(newToken);
    setUser(newUser || null);
    saveUser(newUser || null);
  };

  const doLogout = () => {
    setToken('');
    setUser(null);
    setProfiles([]);
    setActiveProfile(null);
    clearAllAuth();
  };

  const value = useMemo(() => ({
    token, user, profiles, activeProfile, setActiveProfile: (p) => { setActiveProfile(p); saveActiveProfile(p); },
    loading, login: doLogin, logout: doLogout,
    // PUBLIC_INTERFACE
    hasRole: (role) => {
      /** Returns true if the current user has the specified role. */
      if (!role) return true;
      const roles = user?.roles || [];
      return roles.includes(role);
    }
  }), [token, user, profiles, activeProfile, loading]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access the authentication context. */
  return useContext(AuthContext);
}
