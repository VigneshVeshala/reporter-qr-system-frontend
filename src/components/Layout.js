import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import ChatBot from "./ChatBot";

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="app-container">

        {/* Sidebar */}
        <div className="sidebar">

          <div className="logo-section">
            <img src={logo} alt="Logo" className="sidebar-logo" />
            <h4>Reporter QR</h4>
          </div>

          <Link to="/" className={isActive("/") ? "nav-link active" : "nav-link"}>
            🏠 Dashboard
          </Link>

          <Link to="/add" className={isActive("/add") ? "nav-link active" : "nav-link"}>
            ➕ Add Reporter
          </Link>

          <Link to="/details" className={isActive("/details") ? "nav-link active" : "nav-link"}>
            📋 Details
          </Link>

          <Link to="/scan" className={isActive("/scan") ? "nav-link active" : "nav-link"}>
            📷 Scan QR
          </Link>
          <Link 
             to="/epaper" 
            className={isActive("/epaper") ? "nav-link active" : "nav-link"}
>
            📰 E Paper
          </Link>

          <button
            className="mode-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>

        </div>

        {/* Main Content */}
        <div className="main-content">
          {children}
        </div>
        <ChatBot/>

      </div>
    </div>
  );
}