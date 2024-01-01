import Home from "./pages/Home";
import NewResource from "./pages/NewResource";

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
        <Route path="/new" element={<NewResource />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
