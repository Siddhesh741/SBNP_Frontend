// Admin.js

import React, { useState, useEffect } from "react";
import Footer from "../Common-compo/Footer";
import "./Admin.css"; // Import CSS for styling (create this file)
import BookingTable from "./BookingTable";
import ExpensesPage from "./ExpensesPage"; // Import the ExpensesPage component
import FoodPage from "./FoodPage"; // Import the FoodPage component
import SettlementPage from "./SettlementPage";
import InventoryPage from "./InventoryPage";
import CalendarPage from "./CalendarPage";
import ReportPage from "./ReportPage";
import { FaSignOutAlt } from "react-icons/fa";
import UserRegistrationPage from "./UserRegistrationPage"; // Import the UserRegistrationPage component

function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInAdmin, setLoggedInAdmin] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [users, setUsers] = useState([]);

  /* const validCredentials = [
    { username: "", password: "", name: "Admin" },
    
  ]; */


  useEffect(() => {
    // Fetch users from backend
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        setLoggedIn(true);
        setLoggedInAdmin(user.fullName);
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleLogout = () => {
    // Implement logout logic here
    setLoggedIn(false);
    setLoggedInAdmin("");
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <div className="welcome-container">
            <div className="welcome-message">
              <h2>
                Welcome, <span className="admin-name">{loggedInAdmin}</span>!
                <button className="logout-button" onClick={handleLogout}>
                  {" "}
                  <FaSignOutAlt style={{ marginRight: "5px" }} />
                </button>
              </h2>
            </div>

            {/* Global category selection buttons */}
            <div className="category-buttons">
              <button
                onClick={() => handleCategorySelect("BookingTable")}
                className={`category-button ${
                  selectedCategory === "BookingTable" ? "active" : ""
                }`}
              >
                Customer Booking
              </button>
              <button
                onClick={() => handleCategorySelect("UserRegistration")}
                className={`category-button ${
                  selectedCategory === "UserRegistration" ? "active" : ""
                }`}
              >
                User Registration
              </button>
              <button
                onClick={() => handleCategorySelect("Expenses")}
                className={`category-button ${
                  selectedCategory === "Expenses" ? "active" : ""
                }`}
              >
                Expenses
              </button>
              <button
                onClick={() => handleCategorySelect("Settlement")}
                className={`category-button ${
                  selectedCategory === "Settlement" ? "active" : ""
                }`}
              >
                Settlement
              </button>
              <button
                onClick={() => handleCategorySelect("Food")}
                className={`category-button ${
                  selectedCategory === "Food" ? "active" : ""
                }`}
              >
                Food
              </button>
              <button
                onClick={() => handleCategorySelect("Inventory")}
                className={`category-button ${
                  selectedCategory === "Inventory" ? "active" : ""
                }`}
              >
                Inventory
              </button>
              <button
                onClick={() => handleCategorySelect("Calendar")}
                className={`category-button ${
                  selectedCategory === "Calendar" ? "active" : ""
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => handleCategorySelect("Report")}
                className={`category-button ${
                  selectedCategory === "Report" ? "active" : ""
                }`}
              >
                Report
              </button>
            </div>
            <div className="hide-on-mobile"  style={{ height: "400px" }}></div>
          </div>
          {selectedCategory === "BookingTable" && <BookingTable />}
          {selectedCategory === "UserRegistration" && <UserRegistrationPage />}
          {selectedCategory === "Expenses" && <ExpensesPage />}
          {selectedCategory === "Settlement" && <SettlementPage />}
          {selectedCategory === "Food" && <FoodPage />}
          {selectedCategory === "Inventory" && <InventoryPage />}
          {selectedCategory === "Calendar" && <CalendarPage />}
          {selectedCategory === "Report" && <ReportPage />}
          {/* Add more conditions for other categories */}
        </div>
      ) : (
        <div className="admin-login-wrapper">
          {" "}
          {/* Wrapper for centering */}
          <div className="admin-login-container">
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {error && <div className="error-mess">{error}</div>}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="error-mess">{error}</div>}
            <button onClick={handleLogin}>Login</button>
          </div>
          {/* <img src={admin} alt="Admin" className="admin"/> */}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Admin;
