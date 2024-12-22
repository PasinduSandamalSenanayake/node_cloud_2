import React, { useState } from "react";
import "./dashboard.css";

const AdminDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("bus");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [busData, setBusData] = useState({
    busType: "",
    busNumber: "",
    seatCount: "",
  });

  const items = {
    bus: ["Bus 1", "Bus 2", "Bus 3"],
    operator: ["Operator 1", "Operator 2", "Operator 3"],
    trip: ["Trip 1", "Trip 2", "Trip 3"],
    routes: ["Route 1", "Route 2", "Route 3"],
  };

  const handleAddItem = () => {
    setIsModalOpen(true); // Open the modal when "Add Bus" is clicked
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusData({ ...busData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bus Data Submitted:", busData);
    setIsModalOpen(false); // Close the modal after form submission
  };

  return (
    <div className="admin-dashboard">
      {/* Left Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Admin Dashboard</h2>
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
          {/* Add button based on selected category */}
          {selectedCategory === "bus" && (
            <button className="add-button" onClick={handleAddItem}>
              Add Bus
            </button>
          )}
          {selectedCategory === "operator" && (
            <button className="add-button" onClick={handleAddItem}>
              Add Operator
            </button>
          )}
          {selectedCategory === "routes" && (
            <button className="add-button" onClick={handleAddItem}>
              Add Route
            </button>
          )}
        </div>

        <ul>
          {items[selectedCategory].map((item, index) => (
            <li key={index} className="item-row">
              {item}
              <div>
                <button className="update-button">Update</button>
                <button className="delete-button">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Adding Bus */}
      {isModalOpen && selectedCategory === "bus" && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Bus</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Bus Type:
                <input
                  type="text"
                  name="busType"
                  value={busData.busType}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Bus Number:
                <input
                  type="text"
                  name="busNumber"
                  value={busData.busNumber}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Seat Count:
                <input
                  type="number"
                  name="seatCount"
                  value={busData.seatCount}
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
