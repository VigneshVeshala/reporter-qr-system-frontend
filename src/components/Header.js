import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "10px",
        borderBottom: "1px solid #ddd",
        marginBottom: "20px"
      }}
    >
      {/* Logo = Home */}
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "180px",
            cursor: "pointer"
          }}
        />
      </Link>

      {/* Navigation */}
      <div style={{ marginTop: "10px" }}>
        <Link to="/add">
          <button style={{ margin: "5px" }}>➕ Add Reporter</button>
        </Link>

        <Link to="/details">
          <button style={{ margin: "5px" }}>📋Reporter Details</button>
        </Link>

        <Link to="/scan">
          <button style={{ margin: "5px" }}>📷 Scan QR</button>
        </Link>
      </div>
    </div>
  );
}
