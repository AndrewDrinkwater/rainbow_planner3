import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EnquiriesPage from "./pages/EnquiriesPage";
import MembersPage from "./pages/MembersPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      {/* push content down so it's not hidden under fixed nav */}
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enquiries" element={<EnquiriesPage />} />
          <Route path="/members" element={<MembersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
