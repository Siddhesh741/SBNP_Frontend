import React, { useState } from "react";
import "./Contact.css"; // Import your CSS file for styling
import img from "../assets/img/9.jpg";
import Footer from "../Common-compo/Footer";
import TermsModal from "./TermsModal";
import config from "../config";

const Contact = () => {
  const initialFormData = {
    clientName: "",
    phoneNumber: "",
    photographerName: "",
    photographerPhoneNo: "",
    selectDate: "",
    cityName: "",
    selectedOption: "",
    advanceAmount: "",
    pendingAmount: "",
    cashcollectedby: "",
    paymentMode: "",
    knowaboutlocation: "",
    agreeTerms: "",
    visitorsCount: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({
    clientName: "",
    phoneNumber: "",
    photographerName: "",
    photographerPhoneNo: "",
    selectDate: "",
    cityName: "",
    selectedOption: "",
    advanceAmount: "",
    pendingAmount: "",
    cashcollectedby: "",
    paymentMode: "",
    knowaboutlocation: "",
    agreeTerms: "",
    visitorsCount: "",
  });

  const [responseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State variable for error message
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //Client Name -
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate that the clientName does not contain numbers
    if (name === "clientName" && /\d/.test(value)) {
      setErrors({
        ...errors,
        clientName: "Client Name should not contain numbers.",
      });
    } else {
      setErrors({ ...errors, clientName: "" });
      setFormData({ ...formData, [name]: value });
    }
  };

  //Client phonenumber
  const handleNumberChange = (e) => {
    const value = e.target.value;

    // Always update the input value
    setFormData({ ...formData, phoneNumber: value });

    // Validate the input
    if (/^\d{0,10}$/.test(value)) {
      if (value.length === 10) {
        setErrors({ ...errors, phoneNumber: "" });
      } else {
        setErrors({
          ...errors,
          phoneNumber: "Phone number must be exactly 10 digits.",
        });
      }
    } else {
      setErrors({
        ...errors,
        phoneNumber:
          "Phone number should only contain digits and be up to 10 characters.",
      });
    }
  };

  //Photographer Name
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;

    // Validate that the clientName does not contain numbers
    if (name === "photographerName" && /\d/.test(value)) {
      setErrors({
        ...errors,
        photographerName: "Photographer Name should not contain numbers.",
      });
    } else {
      setErrors({ ...errors, photographerName: "" });
      setFormData({ ...formData, [name]: value });
    }
  };

  //Photographer phonenumber
  const handleNumberChange2 = (e) => {
    const value = e.target.value;

    // Always update the input value
    setFormData({ ...formData, photographerPhoneNo: value });

    // Validate the input
    if (/^\d{0,10}$/.test(value)) {
      if (value.length === 10) {
        setErrors({ ...errors, photographerPhoneNo: "" });
      } else {
        setErrors({
          ...errors,
          photographerPhoneNo: "Phone number must be exactly 10 digits.",
        });
      }
    } else {
      setErrors({
        ...errors,
        photographerPhoneNo:
          "Phone number should only contain digits and be up to 10 characters.",
      });
    }
  };

  //Date
  const handleDateChange = (e) => {
    const selectDate = new Date(e.target.value);
    const currentDate = new Date();

    // Set time to 00:00:00 for both dates to ensure the comparison only considers date part
    selectDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (selectDate >= currentDate) {
      const day = String(selectDate.getDate()).padStart(2, "0");
      const month = String(selectDate.getMonth() + 1).padStart(2, "0");
      const year = selectDate.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;

      setFormData({ ...formData, selectDate: formattedDate });
      setErrors({ ...errors, selectDate: "" }); // Clear any previous errors
    } else {
      setErrors({
        ...errors,
        selectDate: "Please select a date from today or onwards.",
      });
    }
  };

  //KnowAbout Location
  const handleDropdownChange = (e) => {
    const value = e.target.value;
    console.log("Selected value:", value);

    if (value !== "") {
      setErrors({ ...errors, knowaboutlocation: "" });
      setFormData({ ...formData, knowaboutlocation: value });
    } else {
      setErrors({
        ...errors,
        knowaboutlocation: "Please select ",
      });
    }
  };

  //City or village
  const handleCityChange = (e) => {
    const { name, value } = e.target;

    // Validate that the clientName does not contain numbers
    if (name === "cityName" && /\d/.test(value)) {
      setErrors({
        ...errors,
        cityName: "City Name should not contain numbers.",
      });
    } else {
      setErrors({ ...errors, cityName: "" });
      setFormData({ ...formData, [name]: value });
    }
  };

  // Define selectedPackagePrice outside of the functions

  //Select package
  const handlepackage = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setErrors({ ...errors, selectedOption: "Please select a package." });
    } else {
      setFormData({ ...formData, selectedOption: value });
    }
  };

  //Advance amount
  const handleAdvanceAmount = (e) => {
    const value = e.target.value;
    const selectedPackagePrice = {
      riversideSets: 2500,
      nightSets: 2500,
      comboRiverNight: 4000,
      // Add more options as needed
    };

    if (formData.selectedOption === "") {
      setErrors({ packageError: "Please select a package first." });
    } else if (value === "") {
      // If the advance amount is cleared, reset the pending amount
      setFormData({ ...formData, advanceAmount: "", pendingAmount: "" });
    } else if (/^\d*$/.test(value) && value.length <= 10) {
      const packagePrice = selectedPackagePrice[formData.selectedOption];
      if (parseInt(value) > packagePrice) {
        setErrors({
          advanceError:
            " Advance amount cannot be greater than the package price.",
        });
        // Optionally, you can clear the field or handle it differently here
      } else {
        const pending = packagePrice - value;
        setFormData({
          ...formData,
          advanceAmount: value,
          pendingAmount: pending >= 0 ? pending : 0,
        });
        setErrors({});
      }
    } else {
      setErrors({
        characterError:
          "Character not allowed. Advance Amount should have to pay 50% of package.",
      });
    }
  };

  //Pending Amount
  const handlePendingAmount = (e) => {
    const value = e.target.value;

    if (formData.selectedOption === "") {
      setErrors({ packageError: "Please select a package first." });
      // Optionally, you can clear the field or handle it differently here
    } else if (/^\d*$/.test(value) && value.length <= 10) {
      setFormData({ ...formData, pendingAmount: value });
      setErrors({});
    } else {
      setErrors({ characterError: "Character not allowed." });
    }
  };

  //Check box agree terms and condition
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    console.log("Checkbox checked:", checked);

    setErrors({ ...errors, agreeTerms: "" });
    setFormData({ ...formData, agreeTerms: checked });
  };

  //Visitor Count
  const handleNumberChange3 = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value) && value.length <= 10) {
      setErrors({ ...errors, visitorsCount: "" });
      setFormData({ ...formData, visitorsCount: value });
    } else {
      setErrors({
        ...errors,
        visitorsCount: "Visitors Count should not contain Character.",
      });
    }
  };

  //payment mode

  const [showCashCollectedByField, setShowCashCollectedByField] =
    React.useState(false);

  const handlePaymentModeChange = (e) => {
    const value = e.target.value;

    //   console.log('Selected Payment Mode:', value);
    // console.log('Previous Data:', formData);

    setFormData((prevData) => ({
      ...prevData,
      paymentMode: value,
      cashcollectedby: value === "cash" ? prevData.cashcollectedby : "",
    }));

    if (value === "cash") {
      setShowCashCollectedByField(true);
    } else {
      setShowCashCollectedByField(false);
      setErrors((prevErrors) => ({
        ...prevErrors,
        cashcollectedby: "",
      }));
    }
  };

  const handleDropdownChange12 = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, cashcollectedby: "" }));
      setFormData((prevData) => ({ ...prevData, cashcollectedby: value }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cashcollectedby: "Please select",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "clientName",
      "phoneNumber",
      "photographerName",
      "photographerPhoneNo",
      "selectDate",
      "cityName",
      "selectedOption",
      "advanceAmount",
      "pendingAmount",
      "visitorsCount",
      "paymentMode",
      "cashcollectedby",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setErrorMessage("Please fill all data in required fields.");
      return;
    }

    //const url = "http://localhost:8080/api/clients/createClient";
    const url = `${config.apiUrl}/clients/createClient`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to submit data");
      }
      const responseData = await response.json();
      if (responseData && responseData.bookingId) {
        // Show popup with success message
        const confirmation = window.confirm(
          `✅ Congratulations!!  Successfully submitted your form. Your Booking ID is SBNP - ${responseData.bookingId}`
        );
        if (confirmation) {
          setIsSubmitted(true);
          setFormData(initialFormData);
          setErrorMessage("");
          console.log("Congratulations! Form submitted!");
        }
      } else {
        throw new Error("Booking ID not found in response");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("Failed to submit data. Please try again.");
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setErrors({}); // Clear any error messages
    setErrorMessage(""); // Clear any success or error messages
    console.log("Form canceled!");
  };
  return (
    <div>
      <div className="contact-container">
        <div className="form-container">
          <h2 className="form-title1">Book your photoshoot slot now</h2>
          {/* Errormessagereturn */}
          <div className="message">{errorMessage}</div>

          <div className="form-group mb-4">
            <label htmlFor="clientName" className="field-label">
              Customer Name
              <span className="text-red-500" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <input
              type="text"
              name="clientName"
              id="clientName"
              placeholder="Enter your name"
              value={formData.clientName}
              onChange={handleInputChange}
              required
              style={{ height: "22px", width: "calc(98% - 5px)" }}
            />
            {errors.clientName && (
              <span className="text-red-500">{errors.clientName}</span>
            )}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="phoneNumber" className="field-label">
              Customer Contact Number
              <span className="text-red-500" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleNumberChange}
              required
              style={{ height: "22px", width: "calc(98% - 5px)" }}
            />
            {errors.phoneNumber && (
              <span className="text-red-500">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="photographerName" className="field-label">
              Photographer Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="photographerName"
              id="photographerName"
              placeholder="Enter photographer name"
              value={formData.photographerName}
              onChange={handleInputChange1}
              required
              style={{ height: "22px", width: "calc(98% - 5px)" }}
            />
            {errors.photographerName && (
              <span className="text-red-500">{errors.photographerName}</span>
            )}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="photographerPhoneNo" className="field-label">
              Photographer Contact Number
              <span className="text-red-500" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <input
              type="text"
              name="photographerPhoneNo"
              id="photographerPhoneNo"
              placeholder="Enter Photographer phone number"
              value={formData.photographerPhoneNo}
              onChange={handleNumberChange2}
              required
              style={{ height: "22px", width: "calc(98% - 5px)" }}
            />
            {errors.photographerPhoneNo && (
              <span className="text-red-500">{errors.photographerPhoneNo}</span>
            )}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="datePicker" className="field-label">
              Photo shoot Date
              <span className="text-red-500" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <input
              // className="py-1 px-1 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all"
              type="date"
              id="datePicker"
              name="selectDate"
              onChange={handleDateChange}
              min={new Date().toISOString().split("T")[0]} // Set min attribute to today
              required
              style={{ height: "22px", width: "calc(98% - 5px)" }}
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="knowaboutlocation" className="field-label">
              How did you know about us?
            </label>

            <select
              name="knowaboutlocation"
              id="knowaboutlocation"
              value={formData.knowaboutlocation}
              onChange={handleDropdownChange}
              style={{ height: "30px", width: "calc(100% - 5px)" }}
            >
              <option value="" disabled selected>
                Please Select
              </option>
              <option value="Instagram">Instagram</option>
              <option value="Photographer">Photographer</option>
              <option value="Whatsapp">Whatsapp</option>
              <option value="Relatives or friends">
                 Relatives or Friends
              </option>
              <option value="Other">Other</option>
            </select>
            {errors.knowaboutlocation && (
              <span className="text-red-500">{errors.knowaboutlocation}</span>
            )}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="cityName" className="field-label">
              Customer City or village{" "}
              <span className="text-red-500" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <input
              type="text"
              name="cityName"
              id="cityName"
              placeholder="Enter city name"
              value={formData.cityName}
              onChange={handleCityChange}
              style={{ height: "22px", width: "calc(98% - 5px)" }}
            />
            {errors.cityName && (
              <span className="text-red-500">{errors.cityName}</span>
            )}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="selectOption" className="field-label">
              Please select photo shoot Package{" "}
              <span className="text-red-500" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <select
              id="selectOption"
              name="selectOption"
              onChange={handlepackage}
              value={formData.selectOption}
              required
              style={{ height: "35px", width: "100%" }} // Set initial width to 100%
            >
              <option value="" disabled selected>
                Please Select
              </option>
              <option value="riversideSets">Riverside Sets - 2500 RS </option>
              <option value="nightSets">Night Sets - 2500 RS</option>
              <option value="comboRiverNight">
                Combo Package(Riverside Sets + Night Sets) - 4000 RS
              </option>
            </select>
            {errors.package && (
              <span className="text-red-500">{errors.selectOption}</span>
            )}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="advanceAmount" className="field-label">
              Advance Amount
              <span className="text-red-500" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <input
              type="text"
              name="advanceAmount"
              id="advanceAmount"
              placeholder="Enter advance Amount"
              value={formData.advanceAmount}
              onChange={handleAdvanceAmount}
              required
              style={{ height: "22px", width: "calc(98% - 5px)" }}
            />
            {errors.advanceAmount && (
              <span className="text-red-500">{errors.advanceAmount}</span>
            )}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="pendingAmount" className="field-label">
              Pending Amount
              <span className="text-red-500" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <input
              type="text"
              name="pendingAmount"
              id="pendingAmount"
              placeholder="Enter pending Amount"
              value={formData.pendingAmount}
              onChange={handlePendingAmount}
              style={{ height: "22px", width: "calc(98% - 5px)" }}
              readOnly
              required
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="visitorsCount" className="field-label">
              Total People Arrived{" "}
              <span className="text-red-500" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <input
              type="text"
              name="visitorsCount"
              id="visitorsCount"
              placeholder="Enter Visitors Count"
              value={formData.visitorsCount}
              onChange={handleNumberChange3}
              style={{ height: "22px", width: "calc(98% - 5px)" }}
            />
            {errors.visitorsCount && (
              <span className="text-red-500">{errors.visitorsCount}</span>
            )}
          </div>
          <div>
            <div
              className="form-group mb-4"
              style={{ display: "flex", alignItems: "center" }}
            >
              <label
                htmlFor="paymentMode"
                style={{ marginRight: "15px" }}
                className="field-label"
              >
                Payment Mode:{" "}
                <span className="text-red-500" style={{ fontSize: "1.2em" }}>
                  *
                </span>
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "auto",
                }}
              >
                <input
                  type="radio"
                  id="online"
                  name="paymentMode"
                  value="online"
                  checked={formData.paymentMode === "online"}
                  onChange={handlePaymentModeChange}
                  style={{
                    marginRight: "10px",
                    transform: "scale(2)",
                    color:
                      formData.paymentMode === "online" ? "blue" : "initial",
                  }}
                />
                <label
                  htmlFor="online"
                  style={{ marginRight: "35px" }}
                  className="field-label"
                >
                  Online
                </label>

                <input
                  type="radio"
                  id="cash"
                  name="paymentMode"
                  value="cash"
                  checked={formData.paymentMode === "cash"}
                  onChange={handlePaymentModeChange}
                  style={{
                    marginRight: "10px",
                    transform: "scale(2)",
                    color: formData.paymentMode === "cash" ? "blue" : "initial",
                  }}
                />
                <label
                  htmlFor="cash"
                  style={{ marginRight: "15px" }}
                  className="field-label"
                >
                  Cash
                </label>
              </div>
            </div>

            {showCashCollectedByField && (
              <div className="form-group mb-4">
                <label htmlFor="cashcollectedby" className="field-label">
                  Cash Collected by{" "}
                  <span className="text-red-500" style={{ fontSize: "1.2em" }}>
                    *
                  </span>
                </label>
                <select
                  name="cashcollectedby"
                  id="cashcollectedby"
                  value={formData.cashcollectedby}
                  onChange={handleDropdownChange12}
                  style={{ height: "30px", width: "calc(98% - 5px)" }}
                >
                  <option value="" disabled>
                    Please Select{" "}
                    <span
                      className="text-red-500"
                      style={{ fontSize: "1.2em" }}
                    >
                      *
                    </span>
                  </option>
                  <option value="Rahul">Rahul</option>
                  <option value="Yashodhan">Yashodhan</option>
                  <option value="Yogesh">Yogesh</option>
                  <option value="Umesh">Umesh</option>
                  <option value="Yogita">Yogita</option>
                  <option value="Ashwini">Ashwini</option>
                </select>
                {errors.cashcollectedby && (
                  <span className="text-red-500">{errors.cashcollectedby}</span>
                )}
              </div>
            )}
          </div>

          <div>
            <div className="form-group mb-4">
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleCheckboxChange}
                  style={{ marginRight: "10px", height: "22px", width: "45px" }}
                />
                <span style={{ fontSize: "16px" }} className="field-label">
                  I agree to the terms and conditions.{" "}
                  <button
                    onClick={() => setShowModal(true)}
                    className="link-button1"
                  >
                    Click to View Terms and Conditions
                  </button>
                </span>
              </label>
            </div>

            {showModal && (
              <TermsModal
                onClose={() => setShowModal(false)}
                onAccept={() => setFormData({ ...formData, agreeTerms: true })}
              />
            )}
          </div>

          {errorMessage && (
            <div
              className={`${
                errorMessage.includes("Successfully") ? "success" : "error"
              }-message`}
            >
              {errorMessage}
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <button
              type="submit"
              onClick={handleSubmit}
              style={{
                backgroundColor: "blue",
                color: "white",
                borderRadius: "10px",
                padding: "10px 20px",
                border: "none",
              }}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                backgroundColor: "blue",
                color: "white",
                borderRadius: "10px",
                padding: "10px 20px",
                border: "none",
              }}
            >
              Clear
            </button>
          </div>
          {isSubmitted && responseData && (
            <div
              className="success-message"
              style={{
                backgroundColor: "lightgreen",
                color: "black",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              ✅ Successfully submitted your data. Your Booking ID is{" "}
              {responseData.bookingId}
            </div>
          )}
        </div>

        <div className="image-container2">
          <img className=" rounded-lg " src={img} alt="" />
          <br></br>
          <p className="text-container1">
            We'd love to hear from you 💗! Whether you have questions, feedback,
            or need assistance with your shoot, please don't hesitate to reach
            out. Our team is here to assist you every step of the way.From
            selecting the perfect location to ensuring every detail is just
            right, we're dedicated to making your pre-wedding experience
            unforgettable. Feel free to contact us for personalized
            recommendations,scheduling inquiries, or any special requests you
            may have. Your satisfaction is our priority & we're committed to
            exceeding your expectations. Let's create magical memories
            together!"
          </p>
          <p
            style={{
              fontSize: "1.2rem",
              marginTop: "2rem",
              fontFamily: "initial",
            }}
          >
            Email us at:-{" "}
            <a href="mailto:ysamgir@gmail.com">ysamgir@gmail.com</a>
          </p>
        </div>
      </div>
      <br></br>
      <Footer />
    </div>
  );
};

export default Contact;
