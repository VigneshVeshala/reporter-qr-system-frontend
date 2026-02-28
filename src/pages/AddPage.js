import React, { useState } from "react";
import axios from "axios";

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
      await axios.post(
        "https://reporter-qr-system-backend-production.up.railway.app/employees/add",
        formData
      );

      setMessage("✅ Reporter added successfully!");
      setEmpName("");
      setRole("");
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding reporter.");
    }
  };

  return (
    <div>
      <h1 className="page-title">Add Reporter</h1>

      <div className="form-card">
        <form onSubmit={addEmployee}>
          <div className="form-group">
            <label>Reporter Name</label>
            <input
              type="text"
              value={empName}
              onChange={(e) => setEmpName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button className="primary-btn" type="submit">
            Add Reporter
          </button>

          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}