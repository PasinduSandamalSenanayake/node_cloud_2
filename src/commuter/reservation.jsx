import React, { useState } from "react";
import "./reservation.css"; // Separate CSS for this page

const ReservationPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatCount, setSeatCount] = useState(0);
  const [price, setPrice] = useState(0);

  // Configuration
  const totalSeats = 54; // Total number of seats
  const seatPrice = 500; // Price per seat

  const handleSeatClick = (seatNumber) => {
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

  return (
    <div className="reservation-page">
      <h1>Bus Reservation System</h1>

      <div className="trip-details">
        <div>
          <label>Destination From:</label>
          <span>Colombo</span>
        </div>
        <div>
          <label>Destination To:</label>
          <span>Kandy</span>
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

      <div className="seat-selection">
        {Array.from({ length: totalSeats }, (_, i) => (
          <div
            key={i + 1}
            className={`seat ${
              selectedSeats.includes(i + 1) ? "selected" : ""
            }`}
            onClick={() => handleSeatClick(i + 1)}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <button className="confirm-button">Confirm Reservation</button>
    </div>
  );
};

export default ReservationPage;
