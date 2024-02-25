import Home from "./pages/Home";
import NewResource from "./pages/NewResource";
import PasswordEntry from "./pages/Login"; // Import the PasswordEntry component
import Todo from "./pages/Todo";
import { useEffect, useState } from "react";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [passwordVerified, setPasswordVerified] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route
          path="/newResource"
          element={
            passwordVerified ? (
              <NewResource />
            ) : (
              <PasswordEntry setPasswordVerified={setPasswordVerified} />
            )
          }
        />       
        <Route path="/todo" element={<Todo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
