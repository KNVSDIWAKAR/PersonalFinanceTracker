import React from "react";
import { Line } from "react-chartjs-2";

const ExpenseGraph = () => {
  const expenseData = [2000, 3000, 2500, 4000, 3500, 4500, 5000, 6000];
  const expenseLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
  ];

  const data = {
    labels: expenseLabels,
    datasets: [
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ExpenseGraph;
