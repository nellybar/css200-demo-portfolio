import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx"; // your main portfolio

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
