import { Link, Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Sidebar navigation persistent across all nested routes */}
      <aside style={{ width: "200px", background: "#f0f0f0", padding: "10px" }}>
        <h3>Dashboard</h3>
        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Link to="/dashboard">Overview</Link>
          <Link to="/dashboard/analytics">Analytics</Link>
          <Link to="/dashboard/settings">Settings</Link>
        </nav>
      </aside>

      {/* Main content area where child components render */}
      <main style={{ flex: 1, padding: "10px" }}>
        <Outlet />
      </main>
    </div>
  );
}