import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import "./Registration.css";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, { email, password });
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after success
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.error || error.message);
      setError(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="background">
      <div className="shape circle"></div>
      <div className="shape square"></div>
      <div className="shape triangle"></div>
      <div className="shape star"></div>

      <div className="container registration">
        <h1 className="title">Create Your Account</h1>
        <div className="separator"></div>
        <p className="subtitle">Join us today and start exploring!</p>
        <form className="form" onSubmit={handleRegister}>
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
          <div className="input-container">
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <label className="terms box">
            <input type="checkbox" required /> I agree to the{" "}
            <a href="#" className="link">Terms and Conditions</a>
          </label>
          <button type="submit" className="button hover-scale">Sign Up</button>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="link">
          <p>Already have an account?</p>
          <Link to="/login" className="link">Login Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
