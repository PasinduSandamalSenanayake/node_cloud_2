import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import imageBus from "../images/bus.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">BUSBooking.com</div>
        <div className="navbar-buttons">
          <button className="navbar-button" onClick={() => navigate("/login")}>
            Admin
          </button>
          <button className="navbar-button">Operator</button>
          <button className="navbar-button">Commuter</button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="home-content">
        <div className="home-image">
          <img src={imageBus} alt="Bus Booking" className="image" />
        </div>
        <div className="home-text">
          <h1>About Bus Booking System</h1>
          <p>
            Welcome to our Bus Booking System, your one-stop solution for
            managing bus schedules, operators, and commuters efficiently. Our
            platform simplifies the booking process, ensuring a seamless
            experience for everyone involved.
          </p>
        </div>
      </div>

      {/* Additional Content */}
      <div className="home-content reverse-layout">
        <div className="home-text">
          <h1>How to Book a Bus</h1>
          <p>
            Booking a bus has never been easier. Simply log in to your account,
            select your destination, choose your preferred time and seat, and
            confirm your booking. Enjoy a hassle-free journey with our
            streamlined booking process.
          </p>
        </div>
        <div className="home-image">
          <img src={imageBus} alt="How to Book" className="image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
