import React, { useState, useEffect } from "react";
import axios from "axios";
import QrScanner from "react-qr-scanner";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function ScanPage() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [isScanning, setIsScanning] = useState(true);
  const [scanned, setScanned] = useState(null);

  useEffect(() => {
    axios
      .get("https://reporter-qr-system-backend-production.up.railway.app/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Load error:", err));
  }, []);

  const handleScan = (qr) => {
    if (!qr) return;

    let text = "";

    if (typeof qr === "string") text = qr;
    else if (qr?.text) text = qr.text;
    else if (qr?.data) text = qr.data;
    else return;

    const parts = text.split("|").map((x) => x.trim());

    if (parts.length !== 3) {
      setIsScanning(false);
      setScanned({ invalid: true });
      return;
    }

    const [id] = parts;

    const found = employees.find(
      (e) => String(e.id) === String(id)
    );

    setIsScanning(false);

    if (found) setScanned(found);
    else setScanned({ notFound: true, id });
  };

  const handleError = (err) => {
    console.log("SCAN ERROR:", err);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Header />

      <h2 style={{ textAlign: "center", marginTop: "10px" }}>
        Scan Reporter QR
      </h2>

      {isScanning && (
        <div style={{ width: "300px", margin: "20px auto" }}>
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        </div>
      )}

      {scanned && !scanned.invalid && !scanned.notFound && (
        <div
          style={{
            border: "2px solid green",
            padding: "15px",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <h3>Reporter Found</h3>
          <p><b>ID:</b> {scanned.id}</p>
          <p><b>Name:</b> {scanned.empName}</p>
          <p><b>Role:</b> {scanned.role}</p>

          {scanned.image && (
            <img
              src={`data:image/png;base64,${scanned.image}`}
              height="120"
              alt=""
              aria-hidden="true"
              style={{ borderRadius: "8px", marginTop: "10px" }}
            />
          )}
        </div>
      )}

      {scanned?.notFound && (
        <p
          style={{
            color: "red",
            fontWeight: "bold",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Reporter not found
        </p>
      )}

      {scanned?.invalid && (
        <p
          style={{
            color: "red",
            fontWeight: "bold",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Invalid QR scanned!
        </p>
      )}

      {(scanned || !isScanning) && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => {
              setScanned(null);
              setIsScanning(true);
            }}
          >
            Scan Again
          </button>
        </div>
      )}

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={() => navigate("/")} style={{ padding: "8px 16px" }}>
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
}

export default ScanPage;
