import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import ArtisanOnboarding from "./Components/ARTISAN-ONBOARDING/ArtisanOnboarding";
import PersonalInformation from "./Components/ARTISAN-ONBOARDING/PersonalInformation";
import ProfessionalDetails from "./Components/ARTISAN-ONBOARDING/ProfessionalDetails";
import Location from "./Components/ARTISAN-ONBOARDING/Location";
import DocumentVerification from "./Components/ARTISAN-ONBOARDING/DocumentVerification";
import BankDetails from "./Components/ARTISAN-ONBOARDING/BankDetails";

import UserPersonalInformation from "./Components/USER-ONBOARDING/UserPersonalInformation";
// import UserLocation from "./Components/USER-ONBOARDING/UserLocation";
// import UserServicePreference from "./Components/USER-ONBOARDING/UserServicePreference";
import UserOnboarding from "./Components/USER-ONBOARDING/UserOnboarding";

import SignIn from "./Components/Auth/SignIn";
import LoginForm from "./Components/Auth/LoginForm";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ResetPassword from "./Components/Auth/ResetPassword";


function App() {
  return (
    <Routes>
  <Route path="/home" element={<Home />} />
  <Route path="/" element={<Navigate to="/home" replace />} />

  <Route element={<SignIn />}>
  <Route path="login" element={<LoginForm />} />
  <Route path="forgot-password" element={<ForgotPassword />} />
  <Route path="reset-password" element={<ResetPassword />} />
</Route>


  {/* Artisan Onboarding Flow */}
  <Route path="/artisan-onboarding" element={<ArtisanOnboarding />}>
    <Route index element={<Navigate to="personal-info" replace />} />
    <Route path="personal-info" element={<PersonalInformation />} />
    <Route path="professional-details" element={<ProfessionalDetails />} />
    <Route path="location" element={<Location />} />
    <Route path="document-verification" element={<DocumentVerification />} />
    <Route path="bank-details" element={<BankDetails />} />
  </Route>

  {/* User Onboarding Flow */}
  <Route path="/user-onboarding" element={<UserOnboarding />}>
    <Route index element={<Navigate to="user-personal-info" replace />} />
    <Route path="user-personal-info" element={<UserPersonalInformation />} />
    {/* <Route path="user-location" element={<UserLocation />} />
    <Route path="user-service-preference" element={<UserServicePreference />} /> */}
  </Route>
</Routes>


  );
}

export default App;
