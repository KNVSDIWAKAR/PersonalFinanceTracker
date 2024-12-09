import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../dashboard/Styles/IncomeExpenses.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function IncomeExpenses() {
  const [timeframe, setTimeframe] = useState("7 Days");
  const [creditAmounts, setCreditAmounts] = useState([]);
  const [debitAmounts, setDebitAmounts] = useState([]);

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

        const creditArray = data
          .filter((txn) => txn.type === "credit")
          .map((txn) => txn.amount);
        setCreditAmounts(creditArray);

        // Get first 7 debit amounts
        const debitArray = data
          .filter((txn) => txn.type === "debit")
          .map((txn) => txn.amount);
        setDebitAmounts(debitArray);
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      }
    };

    fetchTransactions();
  }, [username]);

  const weeklyData = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Income",
        data: creditAmounts.slice(0, 7),
        borderColor: "#b18ce4", // Purple color for Income
        backgroundColor: "rgba(177, 140, 228, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Expense",
        data: debitAmounts.slice(0, 7),
        borderColor: "#94e7ce", // Green color for Expense
        backgroundColor: "rgba(148, 231, 206, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const yearlyData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Income",
        data: creditAmounts.slice(0, 12),
        borderColor: "#b18ce4", // Purple color for Income
        backgroundColor: "rgba(177, 140, 228, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Expense",
        data: debitAmounts.slice(0, 12),
        borderColor: "#94e7ce",
        backgroundColor: "rgba(148, 231, 206, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const data = timeframe === "7 Days" ? weeklyData : yearlyData;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += `$${context.parsed.y.toLocaleString()}`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "₹" + value / 1000 + "K";
          },
        },
      },
    },
  };

  const chartWrapperStyle = {
    borderRadius: "5px",
    backgroundColor: "#282829",
    boxSizing: "border-box",
  };

  return (
    <div className="income-expense-graph">
      <div className="header">
        <div className="dropdowns">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="dropdown"
          >
            <option value="7 Days">7 Days</option>
            <option value="1 Year">1 Year</option>
          </select>
        </div>
      </div>
      <div style={chartWrapperStyle}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default IncomeExpenses;
