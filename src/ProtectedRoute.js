import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  // Als niet ingelogd, doorverwijzen naar Login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
