import React, { useState } from "react";
import axios from "axios";

export default function EpaperPage() {

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setMessage("❌ Please select a PDF file");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setMessage("");
  };

  const handleUpload = async () => {

    if (!file) {
      setMessage("❌ Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      await axios.post(
        "http://localhost:8080/employees/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setMessage("✅ PDF Uploaded Successfully");
      setFile(null);

      document.getElementById("pdfInput").value = "";

    } catch (error) {

      console.error(error);
      setMessage("❌ Upload Failed");

    }
  };

  return (

    <div className="epaper-container">

      <div className="epaper-card">

        <h2 className="epaper-title">📰 Upload E-Paper</h2>

        <label className="file-upload">

          <input
            id="pdfInput"
            type="file"
            accept="application/pdf"
            onChange={handleChange}
          />

          {file ? file.name : "Choose PDF File"}

        </label>

        <button
          className="upload-btn"
          onClick={handleUpload}
        >
          Upload PDF
        </button>

        {message && (
          <p className="form-message">
            {message}
          </p>
        )}

      </div>

    </div>

  );
}