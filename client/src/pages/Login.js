import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Login({ setPasswordVerified }) {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMsg("");
    
    try {
      const result = await login(password);
      
      if (result.success) {
        setMsg("");
        setPasswordVerified(true);
        navigate("/newResource");
      } else {
        setMsg(result.message || "Login failed");
        setPassword("");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMsg("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-2xl ml-10 mt-10 w-96 ">
        <div className="italics mb-8 text-base text-center">
          Enter a password to edit resource cards
        </div>
        <form>
          <input
            required
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            disabled={loading}
          />
          <div className="text-center text-sm italic text-red-400 mt-2">{msg}</div>
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-gray-300 hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-800 font-semibold py-2 px-4 rounded inline-block mt-8"
              type="submit"
            >
              {loading ? "Signing in..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
