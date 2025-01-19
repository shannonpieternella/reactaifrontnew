import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
      setMessage(response.data.message || "Password reset link sent to your email.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="background">
      <div className="shape circle"></div>
      <div className="shape square"></div>
      <div className="shape triangle"></div>
      <div className="shape star"></div>

      <div className="container forgot-password">
        <h1 className="title">Forgot Password?</h1>
        <p className="subtitle">Enter your email address to receive a reset link.</p>
        <form className="form" onSubmit={handleResetPassword}>
          <div className="input-container">
            <input
              type="email"
              className="input"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">Send Reset Link</button>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
