import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // For navigating and getting the token from the URL
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import "./ResetPassword.css"; // Add your CSS styling

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = searchParams.get("token"); // Get the token from the URL

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/reset-password`, {
        token,
        newPassword,
      });
      setMessage(response.data.message || "Password reset successfully.");
      setError("");

      // Redirect to the login page after a few seconds
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="background">
      {/* Animated background shapes */}
      <div className="shape circle"></div>
      <div className="shape square"></div>
      <div className="shape triangle"></div>
      <div className="shape star"></div>

      {/* Reset Password Container */}
      <div className="container reset-password">
        <h1 className="title">Reset Your Password</h1>
        <p className="subtitle">Enter your new password below.</p>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <form className="form" onSubmit={handleResetPassword}>
          <div className="input-container">
            <input
              type="password"
              className="input"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              className="input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">Reset Password</button>
        </form>
        <p className="back-to-login" onClick={() => navigate("/login")}>
          ← Back to Login
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
