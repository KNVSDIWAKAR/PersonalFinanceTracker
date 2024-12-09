import React, { useState } from "react";
import "../dashboard/Styles/Transfer.css";
import SideBar from "./SideBar";

const Transfer = ({ handleAuthentication }) => {
  const [receiverName, setReceiverName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [transferDate, setTransferDate] = useState("");
  const [note, setNote] = useState("");
  const [mode, setMode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = localStorage.getItem("username");

    const newTransaction = {
      username,
      receiverName,
      paymentMethod,
      amount,
      date: transferDate || new Date().toLocaleDateString(),
      note,
      mode,
    };

    try {
      const response = await fetch(`http://localhost:814/txn/createTxn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Insufficient Funds");
      } else {
        alert("Transaction saved successfully!");
        setReceiverName("");
        setPaymentMethod("");
        setAmount("");
        setTransferDate("");
        setNote("");
        setMode("");
      }
    } catch (err) {}
  };

  return (
    <div className="transfercontainer">
      <SideBar handleAuthentication={handleAuthentication} />
      <div className="transfer-container">
        <form onSubmit={handleSubmit} className="transfer-form">
          <div className="form-group">
            <label htmlFor="receiverName">Receiver's Name</label>
            <input
              type="text"
              id="receiverName" // Changed from accountName to receiverName
              value={receiverName} // Changed to receiverName
              onChange={(e) => setReceiverName(e.target.value)} // Changed to setReceiverName
              placeholder="Enter Receiver's Name"
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
            <label htmlFor="mode">Transfer Option</label>
            <select
              id="mode"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              required
            >
              <option value="">Select Transfer Option</option>
              <option value="household">House-Hold</option>
              <option value="subscription">Subscription</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="gift">Gift</option>
              <option value="education">Education</option>
              <option value="ecommerce">E-commerce Payment</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button type="submit" className="btn-transfer">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transfer;
