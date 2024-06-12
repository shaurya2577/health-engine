// AuthContext.js
import React, { createContext, useContext, useState } from "react";

// import { useGoogleLogin } from '@react-oauth/google';

// function AuthContext() {
//   const login = useGoogleLogin({onSuccess: tokenResponse => console.log(tokenResponse)});
//   return ( <MyCustomButton className="w-12 h-12 bg-blue-300" onClick={() => login()}>Sign in with Google 🚀</MyCustomButton>);
// };

// export default AuthContext;


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
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
