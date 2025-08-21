import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../services/api";

type AuthContextType = {
  user: { id: number; email: string } | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export function useAuthStatus() {
  return !!useContext(AuthContext).user;
}

export function useCurrentUser() {
  const { user, loading } = useContext(AuthContext);
  return { user, loading };
}
