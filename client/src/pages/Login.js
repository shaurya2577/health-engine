import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setPasswordVerified }) {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if the password is correct
    try {
      const response = await fetch("/verifylogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      localStorage.setItem("password", password);
      if (data.status == true) {
        setMsg("");
        navigate("/newResource");
      } else {
        setMsg("Incorrect password.");
        setPassword("");
      }
    } catch (error) {
      console.error("Error:", error);
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
            type="text"
            id="password"
            className="w-full"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="text-center text-sm italic text-red-400">{msg}</div>
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-gray-300 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded inline-block mt-8"
              type="submit"
            >
              continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
