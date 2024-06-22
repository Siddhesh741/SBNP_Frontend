import React, { useState, useEffect } from "react";
import { /* AiOutlineEdit, */ AiOutlineDelete } from "react-icons/ai"; // Import edit and delete icons from react-icons
import "./BookingTable.css"; // Import your CSS file for styling
import axios from "axios";
import ConfirmationDialog from "./ConfirmationDialog";
import AdminContact from "./AdminContact";

const BookingTable = () => {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;
  const [showConfirmation, setShowConfirmation] = useState(false); // State to manage the visibility of the confirmation dialog
  const [selectedClientId, setSelectedClientId] = useState(null); // State to store the id of the client to be deleted
  const [deleteSuccess, setDeleteSuccess] = useState(false); // State to track deletion success
  const [searchDate, setSearchDate] = useState("");
  const [searchPhotographer, setSearchPhotographer] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [error, setError] = useState("");
  const [showAdminContact, setShowAdminContact] = useState(false);
  const [adminName /* , setAdminName */] = useState("");
  const [showForm, setShowForm] = useState(false); // State for showing the modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchClients();
        console.log(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = clients.filter(
      (client) =>
        client.selectDate.includes(searchDate) &&
        client.photographerPhoneNo.toString().includes(searchPhotographer)
    );
    //Searchbar Filter
    setFilteredClients(filtered);
    if (filtered.length === 0) {
      setError("😔No results found.");
    } else {
      setError("");
    }
  }, [searchDate, searchPhotographer, clients]);

  // Function to update clients state after successful submission
  const handleFormSubmit = (newClient) => {
    console.log("New client added:", newClient);
    setClients((prevClients) => [newClient, ...prevClients]);
    setShowForm(false); // Hide the form after submission
  };

  //Fetch all dabase to UI
  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/clients");
      if (!response.ok) {
        throw new Error("Failed to fetch client data");
      }
      const data = await response.json();
      setClients(data.reverse());
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  //Create new createdby cloumn fetch handle data
  const handleCreateClient = async (clientData) => {
    try {
      // Add admin name to client data
      const dataWithAdminName = { ...clientData, createdBy: adminName };
      await axios.post("http://localhost:8080/api/clients", dataWithAdminName);
      // Refresh client list after adding new client
      fetchClients();
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  //Delete Hole Row of client
  const handleDelete = async (id) => {
    setSelectedClientId(id); // Set the id of the client to be deleted
    setShowConfirmation(true); // Show the confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/clients/${selectedClientId}`
      );
      // Filter out the deleted client from the state
      setClients(clients.filter((client) => client.id !== selectedClientId));
      // Show success message
      setDeleteSuccess(true);
      setShowConfirmation(false); // Hide the confirmation dialog after successful deletion
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };
  const cancelDelete = () => {
    //cancel delete
    setShowConfirmation(false); // Hide the confirmation dialog if cancel button is clicked
  };

  // Logic for pagination
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Calculate total number of pages
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredClients.length / clientsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handleClearButtonClick = () => {
    setSearchDate(""); // Reset the search date state value
  };

  //Searchbar with date field
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    let formattedDate = "";

    // If selectedDate is not empty
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Month is zero-based
      const year = dateObj.getFullYear();

      formattedDate = `${day}/${month}/${year}`;
    }

    // Update the searchDate state with the formatted date
    setSearchDate(formattedDate);
  };

  //search with photographer
  const handlePhotographerChange = (event) => {
    setSearchPhotographer(event.target.value);
  };
  // const toggleAdminContact = () => {
  //   setShowAdminContact(!showAdminContact);
  // };
  const closeAdminContact = () => {
    setShowAdminContact(false);
  };

  return (
    <div className="booking-table-container">
      {/* Add button */}
      <div className="add-button-container">
        <button className="add-button" onClick={() => setShowForm(true)}>
          Add Client+
        </button>
      </div>
      {/* Registration form container */}
      {showAdminContact && (
        <div className="registration-container">
          <AdminContact onCreateClient={handleCreateClient} />
          <button className="close-button11" onClick={closeAdminContact}>
            Close
          </button>
        </div>
      )}
      {/* Conditionally render the form after submit automatically refesh table*/}
      {showForm && (
        <div className="admin-contact-form-container">
          <AdminContact onSubmit={handleFormSubmit} />
        </div>
      )}
      <div className="search-box">
        {/*  <input
          type="text"
          placeholder="Search by date"
          value={searchDate}
          onChange={handleDateChange}
        /> */}
        <input //search with date
          type="Date"
          placeholder="Select date (dd/mm/yyyy)"
          value={searchDate}
          onChange={handleDateChange}
        />
        <button className="clear-button" onClick={handleClearButtonClick}>
          Clear Date
        </button>

        <input //search with photographer no
          type="text"
          placeholder="Search by photographer contact number"
          value={searchPhotographer}
          onChange={handlePhotographerChange}
        />
      </div>
      <div className="booking-table">
        <table>
          <thead>
            <tr>
              {/* <th>Edit</th> */}
              <th>Delete</th>
              <th>ID</th>
              <th>Photoshoot Date</th>
              <th>Created By</th>
              <th>Customer Name</th>
              <th>Customer Contact No</th>
              <th>Photographer Name</th>
              <th>Photographer Contact No</th>
              <th>Customer City or village</th>
              <th>How did you know about us?</th>
              <th>photoshoot Package</th>
              <th>Advance Amount</th>
              <th>Pending Amount</th>
              <th>Payment Mode</th>
              <th>Cash Collected by</th>
              <th>Total People Arrived </th>
              {/* <th>Agree terms conditions.</th> */}
            </tr>
          </thead>
          <tbody>
            {currentClients.map((client) => {
              console.log(client);
              return (
                <tr key={client.id}>
                  {/* <td>
                  <button className="edit-button">
                    <AiOutlineEdit /> 
                  </button>
                </td> */}
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(client.id)}
                    >
                      <AiOutlineDelete /> {/* Delete icon */}
                    </button>
                  </td>
                  <td>{client.id}</td>
                  <td>{client.selectDate}</td>
                  <td>{client.createdBy}</td>
                  <td>{client.clientName}</td>
                  <td>{client.phoneNumber}</td>
                  <td>{client.photographerName}</td>
                  <td>{client.photographerPhoneNo}</td>
                  <td>{client.cityName}</td>
                  <td>{client.knowaboutlocation}</td>
                  <td>{client.selectedOption}</td>
                  <td>{client.advanceAmount}</td>
                  <td>{client.pendingAmount}</td>
                  <td>{client.paymentMode}</td>
                  <td>{client.cashcollectedby}</td>
                  <td>{client.visitorsCount}</td>
                  {/* <td>{client.agreeTerms}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageNumbers.length > 2 && currentPage > 1 && (
          <button key={1} onClick={() => paginate(1)}>
            1
          </button>
        )}
        {currentPage > 3 && <span>...</span>}
        {pageNumbers.map(
          (number) =>
            number >= currentPage - 1 &&
            number <= currentPage + 1 && (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={currentPage === number ? "active" : ""}
              >
                {number}
              </button>
            )
        )}
        {currentPage < pageNumbers.length - 2 && <span>...</span>}
        {pageNumbers.length > 1 && currentPage !== pageNumbers.length && (
          <button
            key={pageNumbers.length}
            onClick={() => paginate(pageNumbers.length)}
          >
            {pageNumbers.length}
          </button>
        )}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastClient >= filteredClients.length}
        >
          Next
        </button>
      </div>

      {/* Success message of delete*/}
      {deleteSuccess && (
        <p className="success-message">✅ Client deleted successfully!</p>
      )}
      {/* Confirmation Dialog */}
      {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to delete this client?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      {/* Error message */}
      {error && <p className="error-message12">{error}</p>}
    </div>
  );
};

export default BookingTable;
