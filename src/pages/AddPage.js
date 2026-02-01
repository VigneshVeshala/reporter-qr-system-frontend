import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";

export default function AddPage() {
  const [empName, setEmpName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const addEmployee = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("empName", empName);
    formData.append("role", role);
    if (image) formData.append("image", image);

    try {
      await axios.post("https://reporter-qr-system-backend-production.up.railway.app/employees/add", formData);
      setMessage("✅ Employee added successfully");
      setEmpName("");
      setRole("");
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding employee");
    }
  };

  return (
    <div>
      <Header />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <form
          onSubmit={addEmployee}
          style={{
            width: "350px",
            padding: "25px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            background: "#fff",
          }}
        >
          <h3 style={{ textAlign: "center" }}>Add Reporter</h3>

          <input
            placeholder="Reporter Name"
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
            }}
          />

          <input
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
            }}
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ marginBottom: "15px" }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            Add Reporter
          </button>

          {message && (
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
