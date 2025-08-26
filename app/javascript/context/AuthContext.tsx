import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import { useLocation } from "react-router-dom";

type AuthContextType = {
  user: { id: number; email: string } | null;
  loading: boolean;
  setUser: (user: { id: number; email: string } | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {
    throw new Error("setUser must be used within AuthContextProvider");
  },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    async function fetchAuth() {
      try {
        const status = await apiFetch("/api/auth/status");
        if (status?.logged_in) {
          const userData = await apiFetch("/api/auth/me");
          if (isMounted) setUser(userData);
        } else {
          if (isMounted) setUser(null);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchAuth();
    return () => {
      isMounted = false;
    };
  }, [location.key]);

  return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>;
}

export function useAuthStatus() {
  return !!useContext(AuthContext).user;
}

export function useCurrentUser() {
  const { user, setUser, loading } = useContext(AuthContext);
  return { user, setUser, loading };
}
