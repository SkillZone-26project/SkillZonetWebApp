import { Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Home from "./Components/Home/Home";
import Features from "./Components/Features/Features";
import JoinAs from "./Components/JoinAs/JoinAs";
import Support from "./Components/Support/Support";
import SuccessfulPage from "./Components/SuccessfulPage/SuccessfulPage";

// Auth
import SignIn from "./Components/Auth/SignIn";
import LoginForm from "./Components/Auth/LoginForm";
import ArtisanLogin from "./Components/Auth/ArtisanLogin";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ResetPassword from "./Components/Auth/ResetPassword";
import OTPVerification from "./Components/Auth/OTPVerification";
import SelectYourRole from "./Components/Auth/SelectYourRole";
import SelectLogin from "./Components/Auth/SelectLogin";

// User Auth
import UserLoginForm from "./Components/UserAuth/UserLogInForm";
import UserSignIn from "./Components/UserAuth/UserSignIn";
import UserForgotPassword from "./Components/UserAuth/UserForgotPassword";
import UserResetPassword from "./Components/UserAuth/UserResetPassword";
import UserOtpVerification from "./Components/UserAuth/UserOtpVerification";

// Dashboard Layout
import DashboardLayout from "./Layouts/DashboardLayout";

// Artisan Dashboard Pages
import Dashboard from "./Components/Pages/dashboard/Dashboard";
import Settings from "./Components/Pages/dashboard/ArtisanSettings/Settings";
import JobRequests from "./Components/Pages/dashboard/JobRequests";
import ActiveJobs from "./Components/Pages/dashboard/ActiveJobs";
import Messages from "./Components/Pages/dashboard/Messages";
import Wallet from "./Components/Pages/dashboard/Wallet";
import Reviews from "./Components/Pages/dashboard/Reviews";
import Profile from "./Components/Pages/dashboard/Profile";

// User Dashboard Layout
import UserDashboardLayout from "./UserLayout/UserDashboardLayout";

// User Dashboard Pages
import UserDashboard from "./Components/UserPages/Userdashboard/UserDashboard";
import UserFindArtisans from "./Components/UserPages/Userdashboard/UserFindArtisans";
import UserMyBookings from "./Components/UserPages/Userdashboard/UserMyBookings";
import UserMessages from "./Components/UserPages/Userdashboard/UserMessages";
import UserWallet from "./Components/UserPages/Userdashboard/UserWallet";
import UserSavedArtisans from "./Components/UserPages/Userdashboard/UserSavedArtisans";
import UserProfile from "./Components/UserPages/Userdashboard/UserProfile";
import UserSettings from "./Components/UserPages/Userdashboard/UserSettings";
import ArtisanProfile from "./Components/UserPages/Userdashboard/ArtisanProfile";

// Artisan Onboarding
import ArtisanOnboarding from "./Components/ARTISAN-ONBOARDING/ArtisanOnboarding";
import PersonalInformation from "./Components/ARTISAN-ONBOARDING/PersonalInformation";
import ProfessionalDetails from "./Components/ARTISAN-ONBOARDING/ProfessionalDetails";
import LocationSearch from "./Components/ARTISAN-ONBOARDING/LocationSearch";
import Location from "./Components/ARTISAN-ONBOARDING/Location";
import DocumentVerification from "./Components/ARTISAN-ONBOARDING/DocumentVerification";
import BankDetails from "./Components/ARTISAN-ONBOARDING/BankDetails";

// Contracts
import ArtisanContract from "./Components/ArtisanContract/ArtisanContract";
import ClientContract from "./Components/ClientContract/ClientContract";
import ContractDispute from "./Components/ContractDispute/ContractDispute";

// User Onboarding
import UserOnboarding from "./Components/USER-ONBOARDING/UserOnboarding";
import UserPersonalInformation from "./Components/USER-ONBOARDING/UserPersonalInformation";

// Booking
import BookService from "./Components/BookServices/BookService";

// Hero Pages
import AvailableArtisansHero from "./Components/Hero/AvailableArtisansHero";
import SelectToProceed from "./Components/Hero/SelectToProceed";

// Help Pages
import GettingStarted from "./Components/help/GettingStarted";
import Billing from "./Components/help/Billing";
import Tracking from "./Components/help/Tracking";

// Help Articles
import CreateAccount from "./Components/HelpArticles/CreateAccount";
import BookingAndTrackingArticle from "./Components/HelpArticles/BookingAndTrackingArticle";
import PaymentMethodArticle from "./Components/HelpArticles/PaymentMethodArticle";

// Payout
import Payout from "./Components/Payout/Payout";

function App() {
  return (
    <Routes>
      {/* =========================
          PUBLIC ROUTES
      ========================== */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/joinAs" element={<JoinAs />} />
      <Route path="/support" element={<Support />} />
      <Route path="/successfulPage" element={<SuccessfulPage />} />

      {/* =========================
          BOOKING
      ========================== */}
      <Route path="/book-service" element={<BookService />} />
      <Route path="/bookService/:id" element={<BookService />} />

      {/* =========================
          CONTRACTS
      ========================== */}
      <Route path="/artisan-contract" element={<ArtisanContract />} />
      <Route path="/client-contract" element={<ClientContract />} />
      <Route path="/contract-dispute" element={<ContractDispute />} />

      {/* =========================
          PAYOUT
      ========================== */}
      <Route path="/payout" element={<Payout />} />

      {/* =========================
          HELP PAGES
      ========================== */}
      <Route path="/help/getting-started" element={<GettingStarted />} />
      <Route path="/help/billing" element={<Billing />} />
      <Route path="/help/tracking" element={<Tracking />} />

      {/* =========================
          HELP ARTICLES
      ========================== */}
      <Route
        path="/article/create-account"
        element={<CreateAccount />}
      />

      <Route
        path="/article/booking-tracking"
        element={<BookingAndTrackingArticle />}
      />

      <Route
        path="/article/payment-method"
        element={<PaymentMethodArticle />}
      />

      {/* =========================
          ARTISAN AUTH
      ========================== */}
      <Route element={<SignIn />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/otpVerification" element={<OTPVerification />} />
      </Route>

      <Route path="/artisanLogin" element={<ArtisanLogin />} />

      {/* =========================
          USER AUTH
      ========================== */}
      <Route element={<UserSignIn />}>
        <Route path="/user-login" element={<UserLoginForm />} />
        <Route
          path="/user-forgot-password"
          element={<UserForgotPassword />}
        />
        <Route
          path="/user-reset-password"
          element={<UserResetPassword />}
        />
      </Route>

      {/* Kept for compatibility with existing links */}
      <Route path="/userLoginForm" element={<UserLoginForm />} />
      <Route path="/userSignIn" element={<UserSignIn />} />

      <Route
        path="/user-otpVerification"
        element={<UserOtpVerification />}
      />

      {/* =========================
          ROLE / LOGIN SELECTION
      ========================== */}
      <Route path="/selectYourRole" element={<SelectYourRole />} />
      <Route path="/selectLogin" element={<SelectLogin />} />

      {/* =========================
          ARTISAN DASHBOARD
      ========================== */}
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

      {/* =========================
          USER DASHBOARD
      ========================== */}
      <Route path="/user" element={<UserDashboardLayout />}>
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="find-artisans" element={<UserFindArtisans />} />
        <Route path="bookings" element={<UserMyBookings />} />
        <Route path="messages" element={<UserMessages />} />
        <Route path="wallet" element={<UserWallet />} />
        <Route path="saved-artisans" element={<UserSavedArtisans />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="settings" element={<UserSettings />} />
      </Route>

      {/* =========================
          OTHER USER PAGES
      ========================== */}
      <Route
        path="/artisan-profile/:id"
        element={<ArtisanProfile />}
      />

      {/* =========================
          ARTISAN ONBOARDING
      ========================== */}
      <Route
        path="/artisan-onboarding"
        element={<ArtisanOnboarding />}
      >
        <Route
          index
          element={<Navigate to="personal-info" replace />}
        />

        <Route
          path="personal-info"
          element={<PersonalInformation />}
        />

        <Route
          path="professional-details"
          element={<ProfessionalDetails />}
        />

        <Route
          path="locationSearch"
          element={<LocationSearch />}
        />

        <Route path="location" element={<Location />} />

        <Route
          path="document-verification"
          element={<DocumentVerification />}
        />

        <Route
          path="bank-details"
          element={<BankDetails />}
        />
      </Route>

      {/* =========================
          USER ONBOARDING
      ========================== */}
      <Route
        path="/user-onboarding"
        element={<UserOnboarding />}
      >
        <Route
          index
          element={<Navigate to="user-personal-info" replace />}
        />

        <Route
          path="user-personal-info"
          element={<UserPersonalInformation />}
        />
      </Route>

      {/* =========================
          HERO / ARTISAN PAGES
      ========================== */}
      <Route
        path="/artisans"
        element={<AvailableArtisansHero />}
      />

      <Route
        path="/selectToProceed"
        element={<SelectToProceed />}
      />
    </Routes>
  );
}

export default App;