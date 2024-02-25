import Home from "./pages/Home";
import NewResource from "./pages/NewResource";
import Todo from "./pages/Todo";
import { useEffect } from "react";

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
        <Route path="/todo" element={<Todo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
