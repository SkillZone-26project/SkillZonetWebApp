import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import DashboardLayout from "./Layouts/DashboardLayout";

import Dashboard from "./Components/Pages/dashboard/Dashboard";
import Settings from "./Components/Pages/dashboard/Settings";

// Other dashboard pages
import JobRequests from "./Components/Pages/dashboard/JobRequests";
import ActiveJobs from "./Components/Pages/dashboard/ActiveJobs";
import Messages from "./Components/Pages/dashboard/Messages";
import Wallet from "./Components/Pages/dashboard/Wallet";
import Reviews from "./Components/Pages/dashboard/Reviews";
import Profile from "./Components/Pages/dashboard/Profile";

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="jobrequests" element={<JobRequests />} />
        <Route path="activejobs" element={<ActiveJobs />} />
        <Route path="messages" element={<Messages />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
