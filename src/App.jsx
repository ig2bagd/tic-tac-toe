import { Routes, Route, Link } from "react-router";
import DashboardLayout from "./layouts/DashboardLayout.jsx";

function Home()
{
  return <h2>Home Page</h2>;
}

function About()
{
  return <h2>About Page</h2>;
}

function Overview()
{
  return <h2>Dashboard Overview</h2>;
}

function Analytics()
{
  return <h2>Analytics Page</h2>;
}

function Settings()
{
  return <h2>Settings Page</h2>;
}

export default function App()
{
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Parent Layout Route */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Index route renders at /dashboard */}
          <Route index element={<Overview />} />

          {/* Child routes render relative to /dashboard */}
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}