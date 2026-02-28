export default function HomePage() {
  return (
    <div>
      <h1 className="page-title">Dashboard</h1>

      <div className="card-container">

        <div className="dashboard-card blue">
          <div className="icon">👨‍💼</div>
          <h3>Reporters</h3>
          <p>Manage reporter records</p>
        </div>

        <div className="dashboard-card purple">
          <div className="icon">📷</div>
          <h3>QR Scanner</h3>
          <p>Scan reporter QR codes</p>
        </div>

        <div className="dashboard-card orange">
          <div className="icon">📋</div>
          <h3>Records</h3>
          <p>View all reporter details</p>
        </div>

      </div>
    </div>
  );
}