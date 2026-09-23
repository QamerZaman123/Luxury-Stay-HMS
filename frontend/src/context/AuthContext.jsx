import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { authApi } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshUser = useCallback(async () => {
    try {
      const data = await authApi.getMe();
      if (data && data.success && data.user) {
        setUser(data.user);
        setProfile(data.profile || null);
        setError(null);
        return data.user;
      } else {
        setUser(null);
        setProfile(null);
        return null;
      }
    } catch (err) {
      // 401 is normal when guest/visitor is unauthenticated
      setUser(null);
      setProfile(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await authApi.login({ email, password });
      if (res && res.success) {
        // Fetch complete profile with role
        await refreshUser();
        return { success: true, user: res.user };
      }
      throw new Error(res?.message || "Login failed");
    } catch (err) {
      const msg = err.message || "Invalid email or password.";
      setError(msg);
      throw err;
    }
  };

  const register = async (formData) => {
    setError(null);
    try {
      const res = await authApi.register(formData);
      if (res && res.success) {
        await refreshUser();
        return { success: true, user: res.user };
      }
      throw new Error(res?.message || "Registration failed");
    } catch (err) {
      const msg = err.message || "Registration failed.";
      setError(msg);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.warn("Logout error:", err.message);
    } finally {
      setUser(null);
      setProfile(null);
      setError(null);
    }
  };

  const roleName = user?.role?.name || (typeof user?.role === "string" ? user.role : null);
  const isAuthenticated = !!user;
  const isAdmin = roleName === "admin";
  const isManager = roleName === "manager";
  const isStaff = ["admin", "manager", "receptionist", "housekeeping", "maintenance"].includes(roleName);
  const isGuest = roleName === "guest";

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      error,
      role: roleName,
      isAuthenticated,
      isAdmin,
      isManager,
      isStaff,
      isGuest,
      login,
      register,
      logout,
      refreshUser,
      clearError: () => setError(null),
    }),
    [user, profile, loading, error, roleName, isAuthenticated, isAdmin, isManager, isStaff, isGuest, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
