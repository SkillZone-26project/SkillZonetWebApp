import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./Components/Home/Home";
import Features from "./Components/Features/Features";
<<<<<<< HEAD
import SignIn from "./Components/Auth/SignIn";
=======
>>>>>>> origin/emmanuel-branch
import JoinAs from "./Components/JoinAs/JoinAs";

// Auth
import SignIn from "./Components/Auth/SignIn";
import LoginForm from "./Components/Auth/LoginForm";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ResetPassword from "./Components/Auth/ResetPassword";
import OTPVerification from "./Components/Auth/OTPVerification";

// Artisan Dashboard
import DashboardLayout from "./Layouts/DashboardLayout";
import Dashboard from "./Components/Pages/dashboard/Dashboard";
import Settings from "./Components/Pages/dashboard/Settings";
import JobRequests from "./Components/Pages/dashboard/JobRequests";
import ActiveJobs from "./Components/Pages/dashboard/ActiveJobs";
import Messages from "./Components/Pages/dashboard/Messages";
import Wallet from "./Components/Pages/dashboard/Wallet/Wallet";
import Reviews from "./Components/Pages/dashboard/Reviews";
import Profile from "./Components/Pages/dashboard/Profile";

// User Dashboard
import UserDashboardLayout from "./UserLayout/UserDashboardLayout";
<<<<<<< HEAD
import OTPVerification from "./Components/Auth/OTPVerification";
import SelectYourRole from "./Components/Auth/SelectYourRole";
=======
>>>>>>> origin/emmanuel-branch

// User Dashboard Pages
import UserDashboard from "./Components/UserPages/Userdashboard/UserDashboard";
import UserFindArtisans from "./Components/UserPages/Userdashboard/UserFindArtisans";
import UserMyBookings from "./Components/UserPages/Userdashboard/UserBookings/UserMyBookings";
import UserMessages from "./Components/UserPages/Userdashboard/UserMessages";
import UserSavedArtisans from "./Components/UserPages/Userdashboard/UserSavedArtisans";
import UserProfile from "./Components/UserPages/Userdashboard/UserProfile";
import UserSettings from "./Components/UserPages/Userdashboard/UserSettings/UserSettings";
import ArtisanProfile from "./Components/UserPages/Userdashboard/ArtisanProfile";

// Artisan Onboarding
import ArtisanOnboarding from "./Components/ARTISAN-ONBOARDING/ArtisanOnboarding";
import PersonalInformation from "./Components/ARTISAN-ONBOARDING/PersonalInformation";
import ProfessionalDetails from "./Components/ARTISAN-ONBOARDING/ProfessionalDetails";
import Location from "./Components/ARTISAN-ONBOARDING/Location";
import DocumentVerification from "./Components/ARTISAN-ONBOARDING/DocumentVerification";
import BankDetails from "./Components/ARTISAN-ONBOARDING/BankDetails";

// User Onboarding
import UserOnboarding from "./Components/USER-ONBOARDING/UserOnboarding";
import UserPersonalInformation from "./Components/USER-ONBOARDING/UserPersonalInformation";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/home" replace />} />
<<<<<<< HEAD
      <Route path="features" element={<Features />} />
      {/* <Route path="signIn" element={<SignIn />} /> */}
      <Route path="joinAs" element={<JoinAs />} />

      {/* Auth Routes (Emmanuel) */}
     <Route path="/login" element={<SignIn />}>
  <Route index element={<LoginForm />} />
  <Route path="forgot-password" element={<ForgotPassword />} />
  <Route path="reset-password" element={<ResetPassword />} />
</Route>
=======
      <Route path="/home" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/joinAs" element={<JoinAs />} />

      {/* Auth */}
      <Route element={<SignIn />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/otpVerification" element={<OTPVerification />} />
      </Route>
>>>>>>> origin/emmanuel-branch

      {/* Artisan Dashboard */}
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

      {/* User Dashboard */}
      <Route path="/user" element={<UserDashboardLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="find-artisans" element={<UserFindArtisans />} />
        <Route path="bookings" element={<UserMyBookings />} />
        <Route path="messages" element={<UserMessages />} />
        <Route path="saved-artisans" element={<UserSavedArtisans />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="settings" element={<UserSettings />} />
      </Route>

      {/* Extra Routes */}
      <Route path="/artisan-profile/:id" element={<ArtisanProfile />} />
<<<<<<< HEAD
      <Route path="/otpVerification" element={<OTPVerification />} />
      <Route path="/selectYourRole" element={<SelectYourRole />} />
=======
>>>>>>> origin/emmanuel-branch

      {/* Artisan Onboarding */}
      <Route path="/artisan-onboarding" element={<ArtisanOnboarding />}>
        <Route index element={<Navigate to="personal-info" replace />} />
        <Route path="personal-info" element={<PersonalInformation />} />
        <Route path="professional-details" element={<ProfessionalDetails />} />
        <Route path="location" element={<Location />} />
        <Route path="document-verification" element={<DocumentVerification />} />
        <Route path="bank-details" element={<BankDetails />} />
      </Route>

      {/* User Onboarding */}
      <Route path="/user-onboarding" element={<UserOnboarding />}>
        <Route index element={<Navigate to="user-personal-info" replace />} />
        <Route path="user-personal-info" element={<UserPersonalInformation />} />
      </Route>

    </Routes>
  );
}

export default App;