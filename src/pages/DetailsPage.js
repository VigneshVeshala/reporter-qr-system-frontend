import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DetailsPage() {
  const [employees, setEmployees] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterRole, setFilterRole] = useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await axios.get(
        "https://reporter-qr-system-backend-production.up.railway.app/employees"
      );
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
      <h1 className="page-title">Reporter Details</h1>

      <div className="filter-container">
        <input
          placeholder="Filter by Name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />

        <input
          placeholder="Filter by Role"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        />

        <button
          className="secondary-btn"
          onClick={() => {
            setFilterName("");
            setFilterRole("");
          }}
        >
          Reset
        </button>
      </div>

      <div className="table-wrapper">
        <table className="custom-table">
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
                      className="rounded-img"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredEmployees.length === 0 && (
          <p className="no-data">No Reporter Found</p>
        )}
      </div>
    </div>
  );
}