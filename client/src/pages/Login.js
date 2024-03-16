import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PasswordEntry({ setPasswordVerified }) {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if the password is correct
    try {
      const response = await fetch("http://localhost:3002/verifylogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      console.log(response.body)

      if (response.ok) {
        const data = await response.json();
        if (data.status == true) {
          setPasswordVerified(true);
          navigate('/newResource');
        } else {
          alert("Incorrect password. Please try again.");
          setPassword("");
          return (
            <h1>Error: Wrong Password</h1>
          );
          
        }
      } else {
        console.error("Failed to verify password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="text-2xl ml-10 mt-10 flex flex-col h-screen">
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Password:</label>{" "}
        <input
          required
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PasswordEntry;