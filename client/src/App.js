import Home from "./pages/Home";
import About from "./pages/About";
import NewResource from "./pages/NewResource";
import Login from "./pages/Login"; // Import the PasswordEntry component
import Analytics from "./pages/Analytics";
import Todo from "./pages/Todo";
import Network from "./pages/Network";
import VerifyPassword from "./VerifyPassword";
import { useEffect, useState } from "react";
import InvestorDashboard from "./pages/InvestorDashboard";
import CompanyGallery from "./pages/CompanyGallery";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/newResource" element={<NewResource />}></Route>
        {/* <Route path="/login" element={<Login />}></Route> */}
        <Route path="/todo" element={<Todo />}></Route>
        <Route path="/network" element={<Network />}></Route>
        <Route path="/investors" element={<InvestorDashboard />}></Route>
        <Route path="/analytics" element={<Analytics />}></Route>
        <Route path="/companies" element={<CompanyGallery />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
