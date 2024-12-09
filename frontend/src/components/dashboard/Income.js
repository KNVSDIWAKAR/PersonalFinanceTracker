import React, { useState } from "react";
import "../dashboard/Styles/Transfer.css";
import SideBar from "./SideBar";

const Income = ({ handleAuthentication }) => {
  const [senderName, setSenderName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [transferDate, setTransferDate] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    setError("");
    setSuccessMessage("");

    const username = localStorage.getItem("username");

    const incomeData = {
      username,
      senderName,
      paymentMethod,
      amount,
      date: transferDate || new Date().toISOString().split("T")[0],
      note,
      category,
      status: "Completed",
    };

    try {
      const response = await fetch("http://localhost:814/income/createIncome", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incomeData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Income transaction saved successfully!");
        setSenderName("");
        setPaymentMethod("");
        setAmount("");
        setTransferDate("");
        setNote("");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("Unable to connect to the server. Please try again later.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <div className="transfercontainer">
      <SideBar handleAuthentication={handleAuthentication} />
      <div className="transfer-container">
        <form onSubmit={handleSubmit} className="transfer-form">
          <div className="form-group">
            <label htmlFor="senderName">Sender's Name</label>
            <input
              type="text"
              id="senderName"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Enter Sender's Name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method</label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="bankTransfer">Bank Transfer</option>
              <option value="upi">UPI</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="transferDate">Date</label>
            <input
              type="date"
              id="transferDate"
              value={transferDate}
              onChange={(e) => setTransferDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="note">Note</label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter Note"
              rows="3"
              style={{
                backgroundColor: "#1e1e1f",
                color: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
              }}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Transfer Option</label>
            <select
              id="cateogry"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="salary">Salary</option>
              <option value="bonus">Bonus</option>
              <option value="allowance">Allowance</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit" className="btn-transfer">
            Save
          </button>
        </form>

        {/* Modal for success message */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>{successMessage}</h2>
              <button className="btn-transfer" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Income;
