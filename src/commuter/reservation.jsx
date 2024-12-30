import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./reservation.css"; // Separate CSS for this page

const ReservationPage = () => {
  const location = useLocation();
  const tripId = location.state?.tripId;
  const startPlace = location.state?.startPlace;
  const endPlace = location.state?.endPlace;
  const availableSeatArray = location.state?.availableSeatArray || [];
  const price1 = location.state?.price1;
  const routeId = location.state?.routeId;
  const busId = location.state?.busId;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatCount, setSeatCount] = useState(0);
  const [price, setPrice] = useState(0);

  // Configuration
  const totalSeats = 54; // Total number of seats
  const seatPrice = price1; // Price per seat

  const handleSeatClick = (seatNumber) => {
    // Prevent selection of unavailable seats
    if (!availableSeatArray[seatNumber - 1]) return;

    if (selectedSeats.includes(seatNumber)) {
      // Remove the seat if already selected
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      // Add the seat if not selected
      setSelectedSeats([...selectedSeats, seatNumber]);
    }

    // Update seat count and price
    setSeatCount(
      selectedSeats.length + (selectedSeats.includes(seatNumber) ? -1 : 1)
    );
    setPrice(
      seatCount * seatPrice +
        (selectedSeats.includes(seatNumber) ? -seatPrice : seatPrice)
    );
  };

  const handleConfirmReservation = async () => {
    const reservationData = {
      destinationTo: endPlace,
      destinationFrom: startPlace,
      seatCount: selectedSeats.length,
      selectSeats: selectedSeats,
      routeId: routeId,
      busId: busId,
      tripId: tripId,
    };

    try {
      const response = await fetch(
        "https://webapi-cw-014-183873252446.asia-south1.run.app/reservations/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("Reservation confirmed successfully!");
      } else {
        alert("Failed to confirm the reservation.");
      }
    } catch (error) {
      console.error("Error confirming reservation:", error);
      alert("An error occurred while confirming the reservation.");
    }
  };

  return (
    <div className="reservation-page">
      <h1>Bus Reservation System</h1>

      <div className="trip-details">
        <div>
          <label>Trip ID:</label>
          <span>{tripId}</span>
        </div>
        <div>
          <label>Destination From:</label>
          <span>{startPlace}</span>
        </div>
        <div>
          <label>Destination To:</label>
          <span>{endPlace}</span>
        </div>
        <div>
          <label>Seat Count:</label>
          <span>{seatCount}</span>
        </div>
        <div>
          <label>Selected Seats:</label>
          <span>[{selectedSeats.join(", ")}]</span>
        </div>
        <div>
          <label>Total Price:</label>
          <span>Rs. {price}</span>
        </div>
      </div>

      <div className="seat-array-display">
        <h2>Seat Availability</h2>
        <ul>
          {availableSeatArray.map((seat, index) => {
            const seatNumber = Object.keys(seat)[0]; // Get the seat number
            const seatStatus = seat[seatNumber]; // Get the seat status
            return (
              <li key={index}>
                Seat {seatNumber}: {seatStatus}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="seat-selection">
        {Array.from({ length: totalSeats }, (_, i) => (
          <div
            key={i + 1}
            className={`seat ${
              !availableSeatArray[i]
                ? "available"
                : selectedSeats.includes(i + 1)
                ? "booked"
                : ""
            }`}
            onClick={() => handleSeatClick(i + 1)}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <button className="confirm-button" onClick={handleConfirmReservation}>
        Confirm Reservation
      </button>
    </div>
  );
};

export default ReservationPage;
