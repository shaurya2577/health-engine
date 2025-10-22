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
      // For now, just check if token exists and is not expired
      // In a real implementation, you would verify with the server
      if (tokenToVerify && tokenToVerify.length > 10) {
        setToken(tokenToVerify);
        setIsSignedIn(true);
      } else {
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
      // For demo purposes, accept any password
      // In production, this should verify with the server
      if (password && password.length >= 8) {
        const mockToken = 'demo_token_' + Date.now();
        localStorage.setItem('authToken', mockToken);
        setToken(mockToken);
        setIsSignedIn(true);
        return { success: true };
      } else {
        return { success: false, message: "Password must be at least 8 characters" };
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
