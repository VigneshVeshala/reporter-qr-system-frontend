import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AddPage from "./pages/AddPage";
import DetailsPage from "./pages/DetailsPage";
import ScanPage from "./pages/ScanPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/scan" element={<ScanPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;