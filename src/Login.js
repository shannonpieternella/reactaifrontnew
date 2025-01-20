import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "./apiConfig"; // Ensure this is the correct base URL for your API
import "./Login.css";

const Login = ({ setHasActiveSubscription, setIsAuthenticated }) => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate(); // To navigate programmatically after successful login

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Sending a POST request to the login endpoint with the form data (email, password)
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email, // Send the email from the form state
        password: password, // Send the password from the form state
      });

      console.log("Login response data:", response.data); // Log the response for debugging

      // Destructure the response to extract the authToken and subscription status
      const { authToken, hasActiveSubscription } = response.data;

      // Store the authToken and subscription status in localStorage (or handle as needed)
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("hasActiveSubscription", hasActiveSubscription.toString());

      // Set the subscription status in the Routing component
      setHasActiveSubscription(hasActiveSubscription);
      setIsAuthenticated(true); // User is authenticated

      // Navigate based on subscription status
      if (hasActiveSubscription) {
        navigate("/aplicatie"); // Redirect to the app if active subscription
      } else {
        navigate("/no-subscription"); // Redirect to the no-subscription page
      }
    } catch (error) {
      // Handle any errors during the login process
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
              onChange={(e) => setEmail(e.target.value)} // Update email state dynamically
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state dynamically
              required
            />
          </div>
          <div className="options">
            <label className="remember-me">
              <input type="checkbox" /> Remember Me
            </label>
            <a href="/forget" className="link">Forgot Password?</a>
          </div>
          <button type="submit" className="button">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="link">
          <p>Don’t have an account?</p>
          <a href="/register" className="link">Sign Up Now</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
