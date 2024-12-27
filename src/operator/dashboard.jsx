import React, { useState } from "react";
import "./dashboard.css";

const AdminDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("bus");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [viewItemDetails, setViewItemDetails] = useState(null); // State to handle item details view

  // State to manage Bus, Operator, Route, and Trip data
  const [busData, setBusData] = useState({
    busType: "",
    busNumber: "",
    seatCount: "",
  });

  const [operatorData, setOperatorData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    mobile: "",
    nic: "",
  });

  const [routeData, setRouteData] = useState({
    startPlace: "",
    endPlace: "",
    stopPlaces: "",
    routeNumber: "",
    price1: "",
    price2: "",
    price3: "",
  });

  const [tripData, setTripData] = useState({
    tripName: "",
    tripDate: "",
    startTime: "",
    endTime: "",
    routeNumber: "",
    busNumber: "",
    availableSeats: "",
  });

  const items = {
    bus: ["Bus 1", "Bus 2", "Bus 3"],
    operator: ["Operator 1", "Operator 2", "Operator 3"],
    trip: ["Trip 1", "Trip 2", "Trip 3"],
    routes: ["Route 1", "Route 2", "Route 3"],
  };

  const handleAddItem = () => {
    setIsModalOpen(true); // Open the modal based on selected category
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedCategory === "operator") {
      setOperatorData({ ...operatorData, [name]: value });
    } else if (selectedCategory === "bus") {
      setBusData({ ...busData, [name]: value });
    } else if (selectedCategory === "routes") {
      setRouteData({ ...routeData, [name]: value });
    } else if (selectedCategory === "trip") {
      setTripData({ ...tripData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory === "bus") {
      console.log("Bus Data Submitted:", busData);
    } else if (selectedCategory === "operator") {
      console.log("Operator Data Submitted:", operatorData);
    } else if (selectedCategory === "routes") {
      console.log("Route Data Submitted:", routeData);
    } else if (selectedCategory === "trip") {
      console.log("Trip Data Submitted:", tripData);
    }
    setIsModalOpen(false); // Close the modal after form submission
  };

  const handleViewItem = (item) => {
    // Display details of the selected item
    setViewItemDetails(item);
  };

  const renderViewDetails = () => {
    if (!viewItemDetails) return null;

    // You can customize this depending on what you want to show about each item
    return (
      <div className="view-details">
        <h3>Details of {viewItemDetails}</h3>
        <p>
          This is where detailed information about {viewItemDetails} will go.
        </p>
        <button onClick={() => setViewItemDetails(null)}>Close View</button>
      </div>
    );
  };

  return (
    <div className="operator-dashboard">
      {/* Left Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Operator Dashboard</h2>
        <button
          className={selectedCategory === "bus" ? "active" : ""}
          onClick={() => setSelectedCategory("bus")}
        >
          Bus
        </button>
        <button
          className={selectedCategory === "operator" ? "active" : ""}
          onClick={() => setSelectedCategory("operator")}
        >
          Operator
        </button>
        <button
          className={selectedCategory === "trip" ? "active" : ""}
          onClick={() => setSelectedCategory("trip")}
        >
          Trip
        </button>
        <button
          className={selectedCategory === "routes" ? "active" : ""}
          onClick={() => setSelectedCategory("routes")}
        >
          Routes
        </button>
      </div>

      {/* Right Content */}
      <div className="content">
        <div className="header-with-button">
          <h1>
            {selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)}{" "}
            Management
          </h1>
          {/* Only show Add button for Trip */}
          {selectedCategory === "trip" && (
            <button className="add-button" onClick={handleAddItem}>
              Add Trip
            </button>
          )}
        </div>

        <ul>
          {items[selectedCategory].map((item, index) => (
            <li key={index} className="item-row">
              {item}
              <button
                className="view-button"
                onClick={() => handleViewItem(item)}
              >
                View
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Render View Item Details */}
      {renderViewDetails()}

      {/* Modal for Adding Trip */}
      {isModalOpen && selectedCategory === "trip" && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Trip</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Trip Name:
                <input
                  type="text"
                  name="tripName"
                  value={tripData.tripName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Trip Date:
                <input
                  type="date"
                  name="tripDate"
                  value={tripData.tripDate}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Start Time:
                <input
                  type="time"
                  name="startTime"
                  value={tripData.startTime}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                End Time:
                <input
                  type="time"
                  name="endTime"
                  value={tripData.endTime}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Route Number:
                <select
                  name="routeNumber"
                  value={tripData.routeNumber}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Route Number</option>
                  {items.routes.map((route, index) => (
                    <option key={index} value={route}>
                      {route}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Bus Number:
                <select
                  name="busNumber"
                  value={tripData.busNumber}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Bus Number</option>
                  {items.bus.map((bus, index) => (
                    <option key={index} value={bus}>
                      {bus}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Available Seats:
                <input
                  type="number"
                  name="availableSeats"
                  value={tripData.availableSeats}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <div>
                <button type="submit" className="submit-button">
                  Submit
                </button>
                <button
                  type="button"
                  className="close-button"
                  onClick={handleModalClose}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
