import React, { createContext, useContext, useEffect, useState } from "react";
import { apiGet, apiPost } from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await apiGet("/api_me.php");
        if (data.logged_in) setUser(data.user);
      } catch (e) {
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  const register = async (payload) => {
    const data = await apiPost("/api_register.php", payload);
    setUser(data.user);
    return data.user;
  };

  const login = async (mobile, password) => {
    const data = await apiPost("/api_login.php", { mobile, password });
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await apiPost("/api_logout.php", {});
    } catch (e) {}
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, checking, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
