import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import "./ExpensesPage.css";

function ExpensesPage() {
  const [formData, setFormData] = useState({
    category: "",
    otherCategory: "",
    itemName: "",
    price: "",
    paymentMethod: "",
    comment: "",
    reportModule: "", // Changed from transactionId to reportModule
    paidBy: "",
    date: "",
    createdBy: "",
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [searchFilters, setSearchFilters] = useState({
    category: "",
    date: "",
    paidBy: "",
    itemName: "",
  });
  const [filteredTotalPrice, setFilteredTotalPrice] = useState(0);

  useEffect(() => {
    const savedData = JSON.parse(sessionStorage.getItem("submittedData")) || [];
    setSubmittedData(savedData);
  }, []);

  useEffect(() => {
    const totalPrice = calculateFilteredTotalPrice(applyFilters(submittedData));
    setFilteredTotalPrice(totalPrice);
  }, [submittedData, searchFilters]);

  useEffect(() => {
    // Set the default value of paidBy based on logged in user
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const defaultPaidBy =
      loggedInUser === "Rahul Samgir" ? "Rahul Samgir" : "Taranginii";
    setFormData((prevFormData) => ({
      ...prevFormData,
      paidBy: defaultPaidBy,
    }));
  }, []);

  const adminUsers = [
    "Rahul Samgir",
    "Umesh Samgir",
    "Yogesh Samgir",
    "Yashodhan Wadkar",
    "Prachi Wadkar",
    "Yogita Samgir",
    "Ashwini Samgir",
  ];

  const handleCategorySelect = (category) => {
    setFormData({ ...formData, category });
    setCurrentStep(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = () => {
    const currentDate = new Date();
    const formattedDate = formatDate(formData.date);
    const newData = {
      ...formData,
      date: formattedDate,
      createdBy: sessionStorage.getItem("loggedInUser"),
    };

    if (editIndex !== null) {
      const updatedData = [...submittedData];
      updatedData[editIndex] = newData;
      setSubmittedData(updatedData);
    } else {
      setSubmittedData([newData, ...submittedData]);
    }

    sessionStorage.setItem(
      "submittedData",
      JSON.stringify([newData, ...submittedData])
    );

    setFormData({
      category: "",
      otherCategory: "",
      itemName: "",
      price: "",
      paymentMethod: "",
      comment: "",
      reportModule: "", // Reset reportModule field
      paidBy: "",
      date: "",
      createdBy: "",
    });
    setEditIndex(null);
    setCurrentStep(0);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
  };

  const confirmDelete = () => {
    const newData = submittedData.filter((_, i) => i !== deleteIndex);
    setSubmittedData(newData);
    sessionStorage.setItem("submittedData", JSON.stringify(newData));
    setDeleteIndex(null);
  };

  const handleEdit = (index, rowData) => {
    setEditIndex(index);
    setFormData(rowData);
    setCurrentStep(1);
  };

  const calculateFilteredTotalPrice = (filteredData) => {
    return filteredData.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );
  };

  const handlePaymentMethodChange = (e) => {
    const { value } = e.target;
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const defaultPaidBy = adminUsers.includes(loggedInUser)
      ? loggedInUser
      : "Taranginii";
    if (value === "cash") {
      setFormData({ ...formData, paymentMethod: value, paidBy: defaultPaidBy });
    } else {
      setFormData({ ...formData, paymentMethod: value, paidBy: "" });
    }
  };

  const handleSearch = () => {
    const filteredData = applyFilters(submittedData);
    const totalPrice = calculateFilteredTotalPrice(filteredData);
    setFilteredTotalPrice(totalPrice);
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const dd = String(dateObj.getDate()).padStart(2, "0");
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const yy = String(dateObj.getFullYear()).slice(-2);
    return `${dd}-${mm}-${yy}`;
  };

  const applyFilters = (data) => {
    return data.filter((item) => {
      const isDateMatch =
        !searchFilters.date || item.date.includes(searchFilters.date);
      const isPaidByMatch =
        !searchFilters.paidBy || item.paidBy.includes(searchFilters.paidBy);
      const isCategoryMatch =
        !searchFilters.category || searchFilters.category === item.category;
      const isItemNameMatch =
        !searchFilters.itemName ||
        item.itemName
          .toLowerCase()
          .includes(searchFilters.itemName.toLowerCase());
      return isDateMatch && isPaidByMatch && isCategoryMatch && isItemNameMatch;
    });
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Expenses Page</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by category"
          value={searchFilters.category}
          onChange={(e) =>
            setSearchFilters({ ...searchFilters, category: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Search by Item Name"
          value={searchFilters.itemName}
          onChange={(e) =>
            setSearchFilters({ ...searchFilters, itemName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Search by date"
          value={searchFilters.date}
          onChange={(e) =>
            setSearchFilters({ ...searchFilters, date: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Search by PaidBy"
          value={searchFilters.paidBy}
          onChange={(e) =>
            setSearchFilters({ ...searchFilters, paidBy: e.target.value })
          }
        />
        {/* <button onClick={handleSearch}>Search</button> */}
      </div>

      {currentStep === 0 && (
        <div className="category-selection">
          <button onClick={() => handleCategorySelect("Expenses")}>Add+</button>
        </div>
      )}
      <br></br>

      {currentStep === 1 && (
        <div className="form-container">
          <div className="input-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Fuel">Fuel</option>
              <option value="Waterfall">Waterfall</option>
              <option value="Lights">Lights</option>
              <option value="Salary">Salary</option>
              <option value="Electricity bill">Electricity bill</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {formData.category === "Other" && (
            <div className="input-group">
              <label htmlFor="otherCategory">Other Category</label>
              <input
                type="text"
                id="otherCategory"
                name="otherCategory"
                value={formData.otherCategory}
                onChange={handleInputChange}
                placeholder="Enter Other Category"
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="itemName">Item Name</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              placeholder="Enter Item Name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter Price"
            />
          </div>
          <div className="input-group">
            <label htmlFor="paymentMethod">Payment Method</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <option value="">Select Payment Method</option>
              <option value="online">Online</option>
              <option value="cash">Cash</option>
            </select>
          </div>
          {formData.paymentMethod === "online" && (
            <div className="input-group">
              <label htmlFor="reportModule">Report Module</label>{" "}
              {/* Changed from Transaction ID */}
              <input
                type="text"
                id="reportModule"
                name="reportModule"
                value={formData.reportModule}
                onChange={handleInputChange}
                placeholder="Enter Report Module"
              />
            </div>
          )}
          {formData.paymentMethod === "cash" && (
            <div className="input-group">
              <label htmlFor="paidBy">Paid By</label>
              <input
                type="text"
                id="paidBy"
                name="paidBy"
                value={formData.paidBy}
                readOnly
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              max={new Date().toISOString().split("T")[0]} // Allow only today's date or previous dates
            />
          </div>
          <div className="input-group">
            <label htmlFor="comment">Comment</label>
            <input
              type="text"
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              placeholder="Enter Comment"
            />
          </div>
          <div className="button-container">
            <button className="submit-button" onClick={handleFormSubmit}>
              {editIndex !== null ? "Save" : "Submit"}
            </button>
            <button className="back-button" onClick={() => setCurrentStep(0)}>
              Back
            </button>
          </div>
        </div>
      )}

      {deleteIndex !== null && (
        <div style={{ textAlign: "center" }}>
          <p>
            <strong>Are you sure you want to delete this entry?</strong>
          </p>
          <div style={{ margin: "20px 0" }}>
            <FaTrash
              style={{
                marginRight: "20px",
                fontSize: "26px",
                cursor: "pointer",
              }}
              onClick={confirmDelete}
            />
            <FaTimes
              className="cancel-icon"
              onClick={() => setCurrentStep(0)}
              style={{ fontSize: "28px", marginLeft: "30px" }}
            />{" "}
            {/* Cancel Icon */}
          </div>
        </div>
      )}
      <br />

      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <strong>Total Price for Filtered Data: {filteredTotalPrice}</strong>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Category</th>
              <th>Expenses Date</th>
              <th>Paid By</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Report Module</th> {/* Changed from Transaction ID */}
              <th>Item Name</th>
              <th>Comment</th>
              <th>Created By</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {applyFilters(submittedData)
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.category}</td>
                  <td>{data.date}</td>
                  <td>{data.paidBy}</td>
                  <td>{data.price}</td>
                  <td>{data.paymentMethod}</td>
                  <td>{data.reportModule}</td>{" "}
                  {/* Changed from Transaction ID */}
                  <td>{data.itemName}</td>
                  <td>{data.comment}</td>
                  <td>{data.createdBy}</td>
                  <td>
                    <FaEdit
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEdit(index, data)}
                    />
                  </td>
                  <td>
                    <FaTrash
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(index)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpensesPage;
