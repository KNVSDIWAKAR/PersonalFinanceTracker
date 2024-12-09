// IncomeGraph.js
import React from "react";
import { Line } from "react-chartjs-2";

const IncomeGraph = () => {
  const incomeData = [3000, 4500, 5500, 7000, 6500, 8000, 8500, 9000];
  const incomeLabels = [
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
    labels: incomeLabels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
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

export default IncomeGraph;
