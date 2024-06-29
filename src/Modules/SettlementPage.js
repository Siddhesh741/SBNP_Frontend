import React, { useState, useEffect } from "react";
import "./SettlementPage.css"; // Import your CSS file
import html2pdf from "html2pdf.js";

const SettlementPage = ({ loggedInAdmin }) => {
  const [rahulValue, setRahulValue] = useState("");
  const [taranginiiValue, setTaranginiiValue] = useState("");
  const [total, setTotal] = useState(0);
  const [halfTotal, setHalfTotal] = useState(0);
  // const [extraPayment, setExtraPayment] = useState(0);
  const [message, setMessage] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [comment, setComment] = useState("");
  const [paidByAdmin, setPaidByAdmin] = useState("");

  useEffect(() => {
    const rahul = parseFloat(rahulValue) || 0;
    const taranginii = parseFloat(taranginiiValue) || 0;
    const newTotal = rahul + taranginii;
    setTotal(newTotal);
    setHalfTotal(newTotal / 2);
    const newExtraPayment = Math.abs(newTotal / 2 - rahul);
    // setExtraPayment(newExtraPayment);

    if (rahul > taranginii) {
      setMessage(`TARANGINII needs to pay RAHUL ${newExtraPayment} rupees.`);
    } else if (taranginii > rahul) {
      setMessage(`RAHUL needs to pay TARANGINII ${newExtraPayment} rupees.`);
    } else {
      setMessage("No extra payment required.");
    }

    // Automatically populate the "Paid by Admin Name" field based on the selected payment option
    if (paymentOption === "cash") {
      // If the logged-in admin is Rahul Samgir, set the paidByAdmin state to "Rahul Samgir", otherwise set it to "Taranginii"
      setPaidByAdmin(
        loggedInAdmin === "Rahul Samgir" ? "Rahul Samgir" : "Taranginii"
      );
    } else {
      // If the payment option is not cash, default the paidByAdmin state to an empty string
      setPaidByAdmin("");
    }
  }, [rahulValue, taranginiiValue, paymentOption, loggedInAdmin]);

  const handlePaymentOptionChange = (option) => {
    setPaymentOption(option);
    // Reset Report Module, Comment, and Paid by Admin fields when payment option changes
    setTransactionId("");
    setComment("");
    setPaidByAdmin("");
  };

  const handlePrint = () => {
    // Get current date and time in Indian format
    const currentDate = new Date().toLocaleDateString("en-IN");
    const currentTime = new Date().toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    // Define the content to be included in the PDF
    const content = `
      <center>
      <h1 style="margin-bottom: 20px;">Settlement Page</h1>
      <table style="width: 100%; text-align: left; border-collapse: collapse;">
        <tr style="background-color: grey;">
          <th style="padding: 10px; border-bottom: 1px solid #ddd;">Rahul Investment</th>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${rahulValue}</td>
        </tr>
        <tr style="background-color: lightpink;">
          <th style="padding: 10px; border-bottom: 1px solid #ddd;">Taranginii Investment</th>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${taranginiiValue}</td>
        </tr>
        <tr style="background-color: grey;">
          <th style="padding: 10px; border-bottom: 1px solid #ddd;">Total</th>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${total}</td>
        </tr>
        <tr style="background-color: lightpink;">
          <th style="padding: 10px; border-bottom: 1px solid #ddd;">Half of Total</th>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${halfTotal}</td>
        </tr>
        <tr style="background-color: grey;">
          <th style="padding: 10px; border-bottom: 1px solid #ddd;">Message</th>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${message}</td>
        </tr>
        <tr style="background-color: lightpink;">
          <th style="padding: 10px; border-bottom: 1px solid #ddd;">Payment Option</th>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${paymentOption}</td>
        </tr>
        <tr style="background-color: grey;">
          <th style="padding: 10px; border-bottom: 1px solid #ddd;">Report Module</th>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${transactionId}</td>
        </tr>
        <tr style="background-color: lightpink;">
          <th style="padding: 10px; border-bottom: 1px solid #ddd;">Comment</th>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${comment}</td>
        </tr>
        <tr style="background-color: grey;">
          <th style="padding: 10px; border-bottom: 1px solid #ddd;">Paid by Admin</th>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${paidByAdmin}</td>
        </tr>
      </table>
      <br />
      <div style="margin-bottom: 20px;">
        <strong>Date:</strong> ${currentDate}
        <br />
        <strong>Time:</strong> ${currentTime}
      </div>
      </center>
    `;

    // Create the PDF with the specified content and settings
    html2pdf()
      .from(content)
      .set({
        margin: [10, 10, 10, 10], // Set margins for the PDF
        filename: "settlement_page.pdf", // Specify the file name for the PDF
        html2canvas: { scale: 4 }, // Increase the scale for better quality
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }, // Use A4 size in portrait orientation
      })
      .save(); // Save the PDF file
  };

  return (
    <div className="container">
      <h1 className="heading">SETTLEMENT PAGE</h1>

      <div className="input-container">
        <label htmlFor="rahul">Rahul Investment:</label>
        <input
          id="rahul"
           placeholder="Enter Amount"
          type="number"
          value={rahulValue}
          onChange={(e) => setRahulValue(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label htmlFor="taranginii">Taranginii Investment:</label>
        <input
          id="taranginii"
          type="number"
           placeholder="Enter Amount"
          value={taranginiiValue}
          onChange={(e) => setTaranginiiValue(e.target.value)}
        />
      </div>

      <div className="result-container">
        <p>Total: {total}</p>
        <p>Half of Total: {halfTotal}</p>
        <p className="message-text">{message}</p> {/* Apply the new CSS class */}
      </div>

      <div className="payment-buttons-container">
        <button
          onClick={() => handlePaymentOptionChange("cash")}
          className={`payment-button ${paymentOption === "cash" ? "selected" : ""}`}
        >
          Cash
        </button>
        <button
          onClick={() => handlePaymentOptionChange("credit")}
          className={`payment-button ${paymentOption === "credit" ? "selected" : ""}`}
        >
          Credit
        </button>
        <button
          onClick={() => handlePaymentOptionChange("online")}
          className={`payment-button ${paymentOption === "online" ? "selected" : ""}`}
        >
          Online
        </button>
      </div>

      {paymentOption === "online" && (
        <div className="input-container">
          <label htmlFor="transactionId">Report Module:</label>
          <input
            id="transactionId"
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />
        </div>
      )}

      <div className="input-container">
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label htmlFor="paidByAdmin">Paid by Admin:</label>
        <input
          id="paidByAdmin"
          type="text"
          value={paidByAdmin}
          onChange={(e) => setPaidByAdmin(e.target.value)}
          readOnly // Make the input read-only
        />
      </div>

      <button onClick={handlePrint} className="print-button">Print</button>
    </div>
  );
};

export default SettlementPage;
