import React, { useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"; // Import edit and delete icons from react-icons
import "./BookingTable.css"; // Import your CSS file for styling
import axios from "axios";
import ConfirmationDialog from "./ConfirmationDialog";
import AdminContact from "./AdminContact";

const BookingTable = ({ loggedInAdmin }) => {
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10; // Number of clients to show per page
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [searchDate, setSearchDate] = useState("");
  const [searchPhotographerPhoneNo, setSearchPhotographerPhoneNo] = useState("");
  const [searchPhotographerName, setSearchPhotographerName] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [error, setError] = useState("");
  const [showAdminContact, setShowAdminContact] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editedClient, setEditedClient] = useState(null); // Track the edited client

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
        client.photographerPhoneNo.toString().includes(searchPhotographerPhoneNo) &&
        client.photographerName.toLowerCase().includes(searchPhotographerName.toLowerCase())
    );
    setFilteredClients(filtered);
    if (filtered.length === 0) {
      setError("😔No results found.");
    } else {
      setError("");
    }
  }, [searchDate, searchPhotographerPhoneNo, searchPhotographerName, clients]);

  const handleFormSubmit = (newClient) => {
    console.log("New client added:", newClient);
    setClients((prevClients) => [newClient, ...prevClients]);
    setShowForm(false); // Hide the form after submission
  };

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

  const handleCreateClient = async (clientData) => {
    try {
      const dataWithAdminName = { ...clientData, createdBy: loggedInAdmin };
      await axios.post("http://localhost:8080/api/clients", dataWithAdminName);
      fetchClients();
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  const handleDelete = async (id) => {
    setSelectedClientId(id);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/clients/${selectedClientId}`);
      setClients(clients.filter((client) => client.id !== selectedClientId));
      setDeleteSuccess(true);
      setShowConfirmation(false);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const editClient = (client) => {
    setEditedClient(client); // Set the client to be edited
    setShowForm(true); // Show the form for editing
  };

  const saveEditedClient = async (editedClientData) => {
    try {
      const dataWithAdminName = { ...editedClientData, editedBy: loggedInAdmin };
      await axios.put(`http://localhost:8080/api/clients/${editedClient.id}`, dataWithAdminName);
      fetchClients(); // Refresh the client list
      setShowForm(false); // Hide the form after saving
      setEditedClient(null); // Reset edited client state
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredClients.length / clientsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    let formattedDate = "";

    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = dateObj.getFullYear();
      formattedDate = `${day}/${month}/${year}`;
    }

    setSearchDate(formattedDate);
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, "<span class='highlight'>$1</span>");
  };

  const handlePhotographerPhoneNoChange = (event) => {
    setSearchPhotographerPhoneNo(event.target.value);
  };

  const handlePhotographerNameChange = (event) => {
    setSearchPhotographerName(event.target.value);
  };

  const handleClearButtonClick = () => {
    setSearchDate("");
    setSearchPhotographerPhoneNo("");
    setSearchPhotographerName("");
  };

  const closeAdminContact = () => {
    setShowAdminContact(false);
  };

  return (
    <div className="booking-table-container">
      <div className="add-button-container">
        <button className="add-button" onClick={() => setShowForm(true)}>
          Add Client+
        </button>
      </div>
      {showForm && (
        <div className="admin-contact-form-container">
          <AdminContact
            onSubmit={editedClient ? saveEditedClient : handleFormSubmit}
            onClose={() => setShowForm(false)}
            editMode={true}
            editedClient={editedClient} // Pass edited client data to AdminContact
          />
        </div>
      )}
      <div className="search-box">
        <button className="clear-button" onClick={handleClearButtonClick}>
          Clear All Filters
        </button>
        <input
          type="Date"
          placeholder="Select date (dd/mm/yyyy)"
          value={searchDate}
          onChange={handleDateChange}
        />
        <input
          type="text"
          placeholder="Search by photographer name"
          value={searchPhotographerName}
          onChange={handlePhotographerNameChange}
        />
        <input
          type="text"
          placeholder="Search by photographer contact number"
          value={searchPhotographerPhoneNo}
          onChange={handlePhotographerPhoneNoChange}
        />
      </div>
      <div className="booking-table">
        <table>
          <thead>
            <tr>
              <th>Delete</th>
              <th>Edit</th>
              <th>ID</th>
              <th>Photoshoot Date</th>
              <th>Created By</th>
              <th>Edited By</th>
              <th>Customer Name</th>
              <th>Customer Contact No.</th>
              <th>Customer Email</th>
              <th>Photographer Name</th>
              <th>Photographer Contact No.</th>
              <th>Photographer Email</th>
              <th>Customer City or village</th>
              <th>How did you know about us?</th>
              <th>Photoshoot Package</th>
              <th>Advance Amount</th>
              <th>Pending Amount</th>
              <th>Payment Mode</th>
              <th>Cash Collected by</th>
              <th>Total People Arrived</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.map((client) => (
              <tr key={client.id}>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(client.id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => editClient(client)}
                  >
                    <AiOutlineEdit />
                  </button>
                </td>
                <td>{client.id}</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: highlightText(client.selectDate, searchDate),
                  }}
                ></td>
                <td>{client.createdBy}</td>
                <td>{client.editedBy}</td>
                <td>{client.clientName}</td>
                <td>{client.phoneNumber}</td>
                <td>{client.clientEmail}</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: highlightText(client.photographerName, searchPhotographerName),
                  }}
                ></td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: highlightText(
                      client.photographerPhoneNo.toString(),
                      searchPhotographerPhoneNo
                    ),
                  }}
                ></td>
                <td>{client.photographerEmail}</td>
                <td>{client.cityName}</td>
                <td>{client.knowaboutlocation}</td>
                <td>{client.selectedOption}</td>
                <td>{client.advanceAmount}</td>
                <td>{client.pendingAmount}</td>
                <td>{client.paymentMode}</td>
                <td>{client.cashcollectedby}</td>
                <td>{client.visitorsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      {deleteSuccess && (
        <p className="success-message">✅ Client deleted successfully!</p>
      )}
      {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to delete this client?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default BookingTable;
