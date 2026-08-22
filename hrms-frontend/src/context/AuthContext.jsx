import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      setAuthUser(res.data);
    } catch (error) {
      setAuthUser(null);
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await axiosInstance.post("/auth/login", { email, password });
    setAuthUser(res.data);
    return res.data;
  };

  const signup = async (email, password, role) => {
    const res = await axiosInstance.post("/auth/signup", { email, password, role });
    setAuthUser(res.data);
    return res.data;
  };

  const logout = async () => {
    await axiosInstance.post("/auth/logout");
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ authUser, checkingAuth, login, signup, logout, isHR: authUser?.role === "HR" }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
