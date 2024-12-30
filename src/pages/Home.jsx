import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imageBus from "../images/bus.jpg";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  // State for managing form inputs
  const [destinationFrom, setDestinationFrom] = useState("");
  const [destinationTo, setDestinationTo] = useState("");
  const [date, setDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const destinations = ["Colombo", "Kandy", "Galle", "Jaffna", "Matara"];

  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://webapi-cw-014-183873252446.asia-south1.run.app/trips`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("API Response:", data); // Log the response here

      if (!data || !Array.isArray(data.data)) {
        throw new Error("API response does not contain a valid array of trips");
      }

      const filteredTrips = data.data.filter(
        (trip) =>
          (destinationFrom ? trip.startPlace === destinationFrom : true) &&
          (destinationTo ? trip.endPlace === destinationTo : true) &&
          (date ? trip.date === date : true)
      );

      setSearchResults(filteredTrips);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
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

      {/* Loading and Error Messages */}
      {loading && <p>Loading trips..</p>}
      {error && <p className="error">{error}</p>}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Available Trips</h2>
          <ul>
            {searchResults.map((trip, index) => (
              <li key={index} className="search-result-item">
                <p>
                  <strong>
                    {trip.startPlace} to {trip.endPlace}
                  </strong>
                  <br />
                  Date: {new Date(trip.date).toLocaleDateString()}
                  <br />
                  Time: {trip.startTime} - {trip.endTime}
                  <br />
                  Bus: {trip.busNumber}
                  <br />
                  {/* <ul>
                    {trip.availableSeatArray.map((seat, index) => {
                      const seatNumber = Object.keys(seat)[0]; // Get the seat number
                      const seatStatus = seat[seatNumber]; // Get the seat status
                      return (
                        <li key={index}>
                          Seat {seatNumber}: {seatStatus}
                        </li>
                      );
                    })}
                  </ul> */}
                </p>
                {/* Add the Book button */}
                <button
                  className="book-button"
                  onClick={() =>
                    navigate("/commuterReservation", {
                      state: {
                        tripId: trip._id,
                        startPlace: trip.startPlace,
                        endPlace: trip.endPlace,
                        availableSeatArray: trip.availableSeatArray,
                        price1: trip.price1,
                        routeId: trip.routeId,
                        busId: trip.busId,
                      },
                    })
                  }
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
