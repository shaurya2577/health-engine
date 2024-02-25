import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PasswordEntry({ setPasswordVerified }) {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if the password is correct
    if (password === process.env.REACT_APP_LOGIN_PASSWORD) { // Replace "your_password_here" with your actual password
        setPasswordVerified(true);
        navigate('/newResource')
    } else {
      alert("Incorrect password. Please try again.");
      setPassword("");
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