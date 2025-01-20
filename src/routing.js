import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import NoSubscription from "./NoSubscription";
import App from "./App"; // Dashboard for users with active subscription
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword"; // Import your component
import Dashboard from "./Dashboard";


const Routing = () => {
  const [hasActiveSubscription, setHasActiveSubscription] = useState(null); // Dynamically set this from login
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set this after login

  return (
    <Router>
      <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/reset-password" element={<ResetPassword />} />
         <Route path="/forget" element={<ForgotPassword />} />
         {/* Route for Login - Ensure this is explicitly defined */}
        
         <Route
          path="/login"
          element={<Login setHasActiveSubscription={setHasActiveSubscription} setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Route for Login */}
        <Route path="/" element={<Login setHasActiveSubscription={setHasActiveSubscription} setIsAuthenticated={setIsAuthenticated} />} />

        {/* Route for Registration */}
        <Route path="/register" element={<Registration />} />

        {/* Default Route - If not authenticated, go to login */}
        <Route
          path="/aplicatie"
          element={hasActiveSubscription === true ? <App /> : <Navigate to="/no-subscription" />}
        />

        {/* Route for No Subscription */}
        <Route path="/no-subscription" element={<NoSubscription />} />

        {/* If no route matches, go to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default Routing;
