import { createContext, useContext, useEffect, useMemo, useState } from "react";
import pb from "../lib/pb";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(pb.authStore.model);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = pb.authStore.onChange(() => setUser(pb.authStore.model), true);

    (async () => {
      try {
        if (pb.authStore.isValid) await pb.collection("users").authRefresh();
      } catch {
        pb.authStore.clear();
      } finally {
        setLoading(false);
      }
    })();

    return () => unsub();
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    loading,
    async login(email, password) {
      const res = await pb.collection("users").authWithPassword(email, password);
      setUser(res?.record || pb.authStore.model);
      return res;
    },
    async register(email, password, passwordConfirm) {
      return pb.collection("users").create({ email, password, passwordConfirm });
      // If your PB requires: { emailVisibility: true, ... }
    },
    logout() {
      pb.authStore.clear();
      setUser(null);
    }
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
