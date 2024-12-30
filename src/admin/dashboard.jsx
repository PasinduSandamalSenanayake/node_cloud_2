import React, { useState, useEffect } from "react";
import "./dashboard.css";

const AdminDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("bus");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // States to manage data
  const [busData, setBusData] = useState([]);
  const [operatorData, setOperatorData] = useState([]);
  const [tripData, setTripData] = useState([]);
  const [routeData, setRouteData] = useState([]); // State for route data
  const [selectedTripDetails, setSelectedTripDetails] = useState(null); // To display trip details
  const [busFormData, setBusFormData] = useState({
    busType: "",
    busNumber: "",
    seatCount: "",
  });

  // Fetch data when the category is selected
  useEffect(() => {
    if (selectedCategory === "bus") {
      fetch("https://webapi-cw-014-183873252446.asia-south1.run.app/buses/")
        .then((response) => response.json())
        .then((responseData) => {
          if (Array.isArray(responseData.data)) {
            setBusData(responseData.data); // Access the correct `data` key
          } else {
            console.error("Unexpected API response format:", responseData);
            setBusData([]); // Fallback to an empty array
          }
        })
        .catch((error) => {
          console.error("Error fetching bus data:", error);
          setBusData([]); // Fallback to an empty array on error
        });
    } else if (selectedCategory === "operator") {
      fetch(
        "https://webapi-cw-014-183873252446.asia-south1.run.app/auth/users/operators/"
      )
        .then((response) => response.json())
        .then((responseData) => {
          if (Array.isArray(responseData)) {
            setOperatorData(responseData); // API directly returns an array
          } else {
            console.error("Unexpected API response format:", responseData);
            setOperatorData([]); // Fallback to an empty array
          }
        })
        .catch((error) => {
          console.error("Error fetching operator data:", error);
          setOperatorData([]); // Fallback to an empty array on error
        });
    } else if (selectedCategory === "trip") {
      fetch("https://webapi-cw-014-183873252446.asia-south1.run.app/trips/")
        .then((response) => response.json())
        .then((responseData) => {
          if (Array.isArray(responseData.data)) {
            setTripData(responseData.data); // Access the correct `data` key
          } else {
            console.error("Unexpected API response format:", responseData);
            setTripData([]); // Fallback to an empty array
          }
        })
        .catch((error) => {
          console.error("Error fetching trip data:", error);
          setTripData([]); // Fallback to an empty array on error
        });
    } else if (selectedCategory === "routes") {
      fetch("https://webapi-cw-014-183873252446.asia-south1.run.app/routes/")
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData && Array.isArray(responseData.routes)) {
            setRouteData(responseData.routes); // Access the `routes` key
          } else {
            console.error("Unexpected API response format:", responseData);
            setRouteData([]); // Fallback to an empty array
          }
        })
        .catch((error) => {
          console.error("Error fetching route data:", error);
          setRouteData([]); // Fallback to an empty array on error
        });
    }
  }, [selectedCategory]);

  const handleAddItem = () => {
    setBusFormData({ busType: "", busNumber: "", seatCount: "" }); // Reset form for a new entry
    setIsModalOpen(true); // Open modal for adding a new bus
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
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

      {/* Content */}
      <div className="content">
        <div className="header-with-button">
          <h1>
            {selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.slice(1)}{" "}
            Management
          </h1>
        </div>

        <ul>
          {selectedCategory === "bus" &&
          Array.isArray(busData) &&
          busData.length > 0 ? (
            busData.map((bus, index) => (
              <li key={index} className="item-row">
                <span>
                  {bus.busNumber} - {bus.busType} - {bus.seatCount || "Unknown"}{" "}
                  seats
                </span>
                <div>
                  <button className="update-button">Update</button>
                  <button className="delete-button">Delete</button>
                </div>
              </li>
            ))
          ) : selectedCategory === "operator" &&
            Array.isArray(operatorData) &&
            operatorData.length > 0 ? (
            operatorData.map((operator, index) => (
              <li key={index} className="item-row">
                <span>
                  {operator.firstName} {operator.lastName}
                </span>
              </li>
            ))
          ) : selectedCategory === "trip" &&
            Array.isArray(tripData) &&
            tripData.length > 0 ? (
            tripData.map((trip, index) => (
              <li key={index} className="item-row">
                <span>
                  {trip.startTime} - {trip.endTime} on {trip.date}
                </span>
              </li>
            ))
          ) : selectedCategory === "routes" &&
            Array.isArray(routeData) &&
            routeData.length > 0 ? (
            routeData.map((route, index) => (
              <li key={index} className="item-row">
                <span>
                  {route.startPlace} - {route.endPlace}
                </span>
              </li>
            ))
          ) : (
            <p>No data available or loading..</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
