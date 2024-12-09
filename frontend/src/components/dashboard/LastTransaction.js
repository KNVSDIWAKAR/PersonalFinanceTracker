import React, { useState, useEffect } from "react";
import "../dashboard/Styles/LastTransaction.css";

const LastTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `http://localhost:814/txn/recentTransactions/${username}`
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
    <div className="transaction-list-container">
      <h1
        style={{
          textAlign: "center",
          color: "grey",
        }}
      >
        Transactions
      </h1>
      <div className="transaction-list">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-left">
              <div className="transaction-name">
                {transaction.receiverName || transaction.senderName}
              </div>
              <div className="transaction-type">
                {transaction.paymentMethod.toUpperCase()}
              </div>
            </div>
            <div className="transaction-right">
              <div className="transaction-amount">
                <span
                  className={
                    transaction.type === "debit" ? "negative" : "positive"
                  }
                >
                  {transaction.type === "debit" ? "-" : "+"}₹
                  {Math.abs(transaction.amount)}
                </span>
              </div>
              <div className="transaction-date-time">{transaction.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastTransaction;
