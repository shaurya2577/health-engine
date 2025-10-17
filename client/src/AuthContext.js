// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      // Verify token is still valid
      verifyToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (tokenToVerify) => {
    try {
      const response = await fetch("http://localhost:3002/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenToVerify}`
        }
      });

      if (response.ok) {
        setToken(tokenToVerify);
        setIsSignedIn(true);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('authToken');
        setToken(null);
        setIsSignedIn(false);
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      localStorage.removeItem('authToken');
      setToken(null);
      setIsSignedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (password) => {
    try {
      const response = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      
      if (data.status && data.token) {
        localStorage.setItem('authToken', data.token);
        setToken(data.token);
        setIsSignedIn(true);
        return { success: true };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Network error" };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setIsSignedIn(false);
  };

  const getAuthHeaders = () => {
    return token ? { "Authorization": `Bearer ${token}` } : {};
  };

  return (
    <AuthContext.Provider value={{ 
      isSignedIn, 
      setIsSignedIn, 
      token,
      loading,
      login, 
      logout,
      getAuthHeaders,
      verifyToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
