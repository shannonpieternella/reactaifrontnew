import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      const { hasActiveSubscription, message } = response.data;

      if (response.status === 200) {
        console.log(message);

        // Sla login-status op
        localStorage.setItem("authToken", "your-auth-token");
        localStorage.setItem("hasActiveSubscription", hasActiveSubscription);

        // Redirect op basis van abonnementstatus
        if (hasActiveSubscription) {
          navigate("/"); // Naar dashboard
        } else {
          navigate("/no-subscription"); // Naar subscriptiepagina
        }
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.error || error.message);
      setError(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="background">
      <div className="shape circle"></div>
      <div className="shape square"></div>
      <div className="shape triangle"></div>
      <div className="shape star"></div>

      <div className="container login">
        <h1 className="title">Welcome Back!</h1>
        <div className="separator"></div>
        <p className="subtitle">Log in to continue enjoying our services.</p>
        <form className="form" onSubmit={handleLogin}>
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
          <div className="options">
            <label className="remember-me">
              <input type="checkbox" /> Remember Me
            </label>
            <Link to="/forgot-password" className="link">Forgot Password?</Link>
          </div>
          <button type="submit" className="button">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="link">
          <p>Don’t have an account?</p>
          <Link to="/register" className="link">Sign Up Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
