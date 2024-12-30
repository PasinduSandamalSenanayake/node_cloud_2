import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Assume we have some CSS for styling

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch(
        "https://webapi-cw-014-183873252446.asia-south1.run.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, role: "admin" }),
        }
      );

      if (response.ok) {
        const responseText = await response.text(); // Read response as plain text
        console.log("Raw Response:", responseText);

        // Extract token if responseText is in the format: token: eyJh...
        const token = responseText.split(": ")[1]; // Extracts 'eyJh...' after 'token: '
        if (token) {
          localStorage.setItem("token", token.trim());
          // Redirect to dashboard
          navigate("/adminDashboard");
        } else {
          setError("Failed to retrieve token. Please try again.");
        }
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        setError(errorData.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("An error occurred. Please check your network connection.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
