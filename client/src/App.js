import Home from "./pages/Home";
import NewResource from "./pages/NewResource";
import Analytics from "./pages/Analytics";
import Todo from "./pages/Todo";
import Network from "./pages/Network";
import InvestorDashboard from "./pages/InvestorDashboard";
import CompanyGallery from "./pages/CompanyGallery";
import JobBoard from "./pages/JobBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/newResource" element={<NewResource />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/network" element={<Network />} />
        <Route path="/investors" element={<InvestorDashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/companies" element={<CompanyGallery />} />
        <Route path="/jobs" element={<JobBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
