import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import NoSubscription from "./NoSubscription";
import App from "./App"; // Het dashboard voor ingelogde gebruikers met een actieve subscriptie
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);

  useEffect(() => {
    // Controleer of de gebruiker ingelogd is
    const token = localStorage.getItem("authToken"); // Check of de gebruiker een token heeft
    const subscription = localStorage.getItem("hasActiveSubscription"); // Controleer op een actieve subscriptie

    setIsAuthenticated(!!token); // Zet true als een token bestaat
    setHasActiveSubscription(subscription === "true"); // Zet true als de subscriptie actief is
  }, []);

  return (
    <Router>
      <Routes>
        {/* Route voor Login */}
        <Route path="/login" element={<Login />} />

        {/* Route voor Registratie */}
        <Route path="/register" element={<Registration />} />

        {/* Beschermde route voor Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {hasActiveSubscription ? <App /> : <NoSubscription />}
            </ProtectedRoute>
          }
        />

        {/* Route voor Geen Subscriptie */}
        <Route path="/no-subscription" element={<NoSubscription />} />

        {/* Als geen route overeenkomt, naar Login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default Routing;
