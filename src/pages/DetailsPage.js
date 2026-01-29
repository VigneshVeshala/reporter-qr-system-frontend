import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

export default function DetailsPage() {
  const [employees, setEmployees] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterRole, setFilterRole] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8080/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error loading employees", err);
    }
  };

  const filteredEmployees = employees.filter(
    (e) =>
      e.empName.toLowerCase().includes(filterName.toLowerCase()) &&
      e.role.toLowerCase().includes(filterRole.toLowerCase())
  );

  return (
    <div>
      <Header />

      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <div style={{ width: "900px" }}>
          <h3 style={{ textAlign: "center" }}>Reporter Details</h3>

          {/* Filters */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            <input
              placeholder="Filter Name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              style={{ padding: "6px" }}
            />
            <input
              placeholder="Filter Role"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              style={{ padding: "6px" }}
            />
            <button
              onClick={() => {
                setFilterName("");
                setFilterRole("");
              }}
            >
              Reset
            </button>
          </div>

          {/* Table */}
          {filteredEmployees.length === 0 ? (
            <p style={{ textAlign: "center", color: "gray" }}>
              No Reporter found
            </p>
          ) : (
            <table border="1" width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>QR Code</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((e) => (
                  <tr key={e.id}>
                    <td>{e.empName}</td>
                    <td>{e.role}</td>
                    <td>
                      <img
                        src={`data:image/png;base64,${e.qr}`}
                        height="60"
                        alt="QR"
                      />
                    </td>
                    <td>
                      {e.image && (
                        <img
                          src={`data:image/png;base64,${e.image}`}
                          height="60"
                          alt="Employee"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
