import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import "../dashboard/Styles/Transactions.css";

const Transactions = ({ handleAuthentication }) => {
  const [transactions, setTransactions] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `https://personal-finance-tracker-backend-five.vercel.app/txn/allTransactions/${username}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      }
    };

    fetchTransactions();
  }, [username]);

  return (
    <div className="transactionscontainer">
      <SideBar handleAuthentication={handleAuthentication} />
      <div className="transactions-container">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#3C3C3D ",
                color: "#98844C",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "10px" }}>Date</th>
              <th style={{ padding: "10px" }}>Name</th>
              <th style={{ padding: "10px" }}>Type</th>
              <th style={{ padding: "10px" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.sNo} style={{ textAlign: "left" }}>
                <td style={{ padding: "10px", color: "white" }}>
                  {transaction.date}
                </td>
                <td style={{ padding: "10px", color: "white" }}>
                  {transaction.senderName || transaction.receiverName}
                </td>
                <td style={{ padding: "10px", color: "white" }}>
                  {transaction.type.toUpperCase()}
                </td>
                <td style={{ padding: "10px", color: "white" }}>
                  ₹{transaction.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
