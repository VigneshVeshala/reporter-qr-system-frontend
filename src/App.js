import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddPage from "./pages/AddPage";
import ScanPage from "./pages/ScanPage";
import DetailsPage from "./pages/DetailsPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
