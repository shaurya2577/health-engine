import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="flex flex-col min-h-screen overflow-auto bg-site-bg">
      <App />
    </div>
  </React.StrictMode>
);
