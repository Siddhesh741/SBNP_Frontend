import React, { useState } from "react";
import config from "../config";
import "./Bookingid.css"; // Import CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchForm = ({ onSearch, onClear, errorMessage }) => {
  const [bookingId, setBookingId] = useState("");

  const handleSearch = (e) => {        
    e.preventDefault();
    onSearch(bookingId);
  };

  const handleClear = () => {
    setBookingId("");
    onClear();
  };

  const handleChange = (e) => {
    setBookingId(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="form-container">
        <input
          type="text"
          placeholder="Enter BookingID"
          value={bookingId}
          onChange={handleChange}
          className="input-field"
        />
        <button type="submit" className="search-button">
          Search
        </button>
        <button type="button" onClick={handleClear} className="clear-button">
          Back
        </button>
      </form>
      {errorMessage && <div className="error-message1">{errorMessage}</div>}
    </div>
  );
};

const BookingDetails = ({ bookingData }) => {                //Booking Fields
  const fieldNames = {
    phoneNumber: "Customer Contact No",
    clientName: "Customer Name",
    photographerName: "Photographer Name",
    photographerPhoneNo: "Photographer Contact No",
    selectDate: "Photoshoot Date",
    cityName: "Customer City or Village",
    selectedOption: "PhotoShoot Package",
    advanceAmount: "Advance Amount",
    pendingAmount: "Pending Amount",
    cashcollectedby: "Cash Collected By ",
    paymentMode: "Payment Mode",
    knowaboutlocation: "How did you know about us?",
    agreeTerms: "Agree Terms & Conditions",
    visitorsCount: "Total People Arrived",
    bookingId: "Booking ID",
  };

  return (
    <div>
      <h2>Your Booking Details</h2>
      <table className="booking-details-table">
        <tbody>
          {Object.entries(bookingData).map(([key, value]) => (
            // Exclude the 'id' field from being displayed
            key !== "id" && (
              <tr key={key}>
                <td>{fieldNames[key] || key}</td>
                <td>{value}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Bookingid = ({ onClose }) => {
  // Pass onClose function as a prop
  const [bookingData, setBookingData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (bookingId) => {
    try {
      const response = await fetch(
        `${config.apiUrl}/clients/bybookingId/${bookingId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data && Object.keys(data).length === 0) {
        setErrorMessage(
          "Booking ID not found. Please enter a correct booking ID."
        );
        setBookingData(null);
      } else {
        setBookingData(data);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage(
        "Booking ID not found. Please enter a correct booking ID."
      );
      setBookingData(null);
    }
  };

  const handleClear = () => {
    setBookingData(null);
    setErrorMessage("");
  };

  return (
    <div className="booking-container">
      <div className="header-icons-container">
      <button className="icon-button"onClick={onClose}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button className="icon-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        
      </div>
      <div style={{ textAlign: "center", fontSize: "12px", width: "100%" }}>
        <h1>Enter Booking ID</h1>
        <SearchForm
          onSearch={handleSearch}
          onClear={handleClear}
          errorMessage={errorMessage}
        />
        {bookingData && <BookingDetails bookingData={bookingData} />}
      </div>
    </div>
  );
};

export default Bookingid;
