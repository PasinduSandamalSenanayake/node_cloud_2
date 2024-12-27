import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import imageBus from "../images/bus.jpg";

const Home = () => {
  const navigate = useNavigate();

  // State for managing form inputs
  const [destinationFrom, setDestinationFrom] = useState("");
  const [destinationTo, setDestinationTo] = useState("");
  const [date, setDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const destinations = ["Colombo", "Kandy", "Galle", "Jaffna", "Matara"];
  const trips = [
    {
      from: "Colombo",
      to: "Kandy",
      date: "2024-12-24",
      time: "10:00 AM",
      bus: "Bus 1",
      seatsAvailable: 20,
    },
    {
      from: "Kandy",
      to: "Galle",
      date: "2024-12-25",
      time: "11:00 AM",
      bus: "Bus 2",
      seatsAvailable: 15,
    },
    {
      from: "Colombo",
      to: "Jaffna",
      date: "2024-12-26",
      time: "9:00 AM",
      bus: "Bus 3",
      seatsAvailable: 25,
    },
    // Add more trip data as necessary
  ];

  const handleSearch = () => {
    const filteredTrips = trips.filter(
      (trip) =>
        (destinationFrom ? trip.from === destinationFrom : true) &&
        (destinationTo ? trip.to === destinationTo : true) &&
        (date ? trip.date === date : true)
    );
    setSearchResults(filteredTrips);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">BUSBooking.com</div>
        <div className="navbar-buttons">
          <button
            className="navbar-button"
            onClick={() => navigate("/adminLogin")}
          >
            Admin
          </button>

          <button
            className="navbar-button"
            onClick={() => navigate("/operatorLogin")}
          >
            Operator
          </button>

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

      {/* Search Filters */}
      <div className="search-filters">
        <h2>Find Your Bus</h2>
        <div className="filter-row">
          <div className="filter-item">
            <label>Destination From:</label>
            <select
              value={destinationFrom}
              onChange={(e) => setDestinationFrom(e.target.value)}
            >
              <option value="">Select Destination</option>
              {destinations.map((dest, index) => (
                <option key={index} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <label>Destination To:</label>
            <select
              value={destinationTo}
              onChange={(e) => setDestinationTo(e.target.value)}
            >
              <option value="">Select Destination</option>
              {destinations.map((dest, index) => (
                <option key={index} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="filter-item">
            <button onClick={handleSearch} className="search-button">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Available Trips</h2>
          <ul>
            {searchResults.map((trip, index) => (
              <li key={index} className="search-result-item">
                <p>
                  <strong>
                    {trip.from} to {trip.to}
                  </strong>
                  <br />
                  Date: {trip.date}
                  <br />
                  Time: {trip.time}
                  <br />
                  Bus: {trip.bus}
                  <br />
                  Available Seats: {trip.seatsAvailable}
                </p>
                {/* Add the Book button */}
                <button
                  className="book-button"
                  onClick={() => navigate("/commuterLogin")}
                >
                  Book
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
