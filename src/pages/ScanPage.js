import React, { useState, useEffect } from "react";
import axios from "axios";
import QrScanner from "react-qr-scanner";

function ScanPage() {
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

    const text = qr?.text || qr?.data || qr;
    const parts = text.split("|");

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
    else setScanned({ notFound: true });
  };

  const handleError = (err) => {
    console.log("Scan error:", err);
  };

  return (
    <div>
      <h1 className="page-title">Scan Reporter QR</h1>

      {isScanning && (
        <div className="scanner-box">
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        </div>
      )}

      {scanned && !scanned.invalid && !scanned.notFound && (
        <div className="result-card">
          <h3>Reporter Found</h3>
          <p><strong>ID:</strong> {scanned.id}</p>
          <p><strong>Name:</strong> {scanned.empName}</p>
          <p><strong>Role:</strong> {scanned.role}</p>

          {scanned.image && (
            <img
              src={`data:image/png;base64,${scanned.image}`}
              height="120"
              alt=""
              className="rounded-img"
            />
          )}
        </div>
      )}

      {scanned?.invalid && (
        <p className="error-text">Invalid QR scanned!</p>
      )}

      {scanned?.notFound && (
        <p className="error-text">Reporter not found!</p>
      )}

      {(scanned || !isScanning) && (
        <button
          className="primary-btn"
          onClick={() => {
            setScanned(null);
            setIsScanning(true);
          }}
        >
          Scan Again
        </button>
      )}
    </div>
  );
}

export default ScanPage;