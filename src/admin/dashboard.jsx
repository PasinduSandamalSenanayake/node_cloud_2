import React, { useState } from "react";
import "./dashboard.css";

const AdminDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("bus");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  // State to manage Bus, Operator, and Route data
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
    }
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

      {/* Modal for Adding Operator */}
      {isModalOpen && selectedCategory === "operator" && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Operator</h2>
            <form onSubmit={handleSubmit}>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={operatorData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={operatorData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  value={operatorData.age}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={operatorData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={operatorData.password}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Mobile:
                <input
                  type="text"
                  name="mobile"
                  value={operatorData.mobile}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                NIC:
                <input
                  type="text"
                  name="nic"
                  value={operatorData.nic}
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

      {/* Modal for Adding Route */}
      {isModalOpen && selectedCategory === "routes" && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Route</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Start Place:
                <input
                  type="text"
                  name="startPlace"
                  value={routeData.startPlace}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                End Place:
                <input
                  type="text"
                  name="endPlace"
                  value={routeData.endPlace}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Stop Places (optional):
                <input
                  type="text"
                  name="stopPlaces"
                  value={routeData.stopPlaces}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Route Number:
                <input
                  type="text"
                  name="routeNumber"
                  value={routeData.routeNumber}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Price 1:
                <input
                  type="number"
                  name="price1"
                  value={routeData.price1}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Price 2 (optional):
                <input
                  type="number"
                  name="price2"
                  value={routeData.price2}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Price 3 (optional):
                <input
                  type="number"
                  name="price3"
                  value={routeData.price3}
                  onChange={handleInputChange}
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
