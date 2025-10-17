import { useAuth } from './AuthContext';

async function VerifyPassword() {
  const token = localStorage.getItem("authToken");
  
  if (!token) {
    return false;
  }

  try {
    const response = await fetch("http://localhost:3002/verify-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.ok) {
      console.log("Token is valid");
      return true;
    } else {
      console.log("Token is invalid");
      localStorage.removeItem("authToken");
      return false;
    }
  } catch (error) {
    console.error("Token verification error:", error);
    localStorage.removeItem("authToken");
    return false;
  }
}

export default VerifyPassword;
