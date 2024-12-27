import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Assume we have some CSS for styling

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace this with real authentication logic if needed
    navigate("/commuterReservation"); // Redirect to dashboard
  };

  return (
    <div className="login-container" onSubmit={handleLogin}>
      <form className="login-form">
        <h2>Commuter Login</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="button"
          className="register-link"
          onClick={() => navigate("/commuterRegister")}
        >
          Register
        </button>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
