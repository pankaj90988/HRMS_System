import React, { createContext, useState, useContext, useEffect } from 'react';
import { BASE_URL } from '../../api/apiconfig';

// 1. Establish the foundational global authentication context registry
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Global user session profile state mapping layer
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Optional: Check local session logs on initialization to maintain active login states
  useEffect(() => {
    const storedUser = localStorage.getItem('hrms_user_session');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setAuthLoading(false);
  }, []);

  // Fulfills Requirement 3.1.2: Asynchronous HTTP Fetch Sign In Engine Routine
  const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // If the backend drops a non-200 operational compliance status error frame
      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials validation parameter lookup.');
      }

      // Successful query payload execution: profile mapping sync
      // Expecting backend dataset structure: { email, role, name, token }
      setUser(data);
      localStorage.setItem('hrms_user_session', JSON.stringify(data));
      return data;

    } catch (error) {
      console.error('Fetch Auth Processing Error:', error);
      // Propagates exact string metrics to trigger your toastify failure elements
      throw error.message || 'Network connectivity fault. Unable to establish sync pipeline.';
    }
  };
  // Fulfills Requirement 3.1.1: Asynchronous HTTP Fetch Sign Up Engine Routine
  const register = async (employeeId, email, password, role) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeId, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration structural configuration parameters validation failed.');
      }

      // Fulfills email verification simulation trace: return response mapping parameters safely
      return data;

    } catch (error) {
      console.error('Fetch Registration Processing Error:', error);
      throw error.message || 'Network infrastructure exception dropped during profile dispatch.';
    }
  };

  // Terminate active authorization parameter records
  const logout = () => {
    setUser(null);
    localStorage.removeItem('hrms_user_session');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, authLoading }}>
      {!authLoading && children}
    </AuthContext.Provider>
  );
};

// Reusable micro-hook to easily import operational authentication context rules inside any page
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Crucial Error: useAuth must be executed within an active AuthProvider layout wrapper.');
  }
  return context;
};
