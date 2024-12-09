import React, { useState } from "react";
import SideBar from "./SideBar";
import "../dashboard/Styles/Statistics.css";
import IncomePieChart from "./Charts/IncomePieChart .js";
import ExpensePieChart from "./Charts/ExpensePieChart.js";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Line, Pie } from "react-chartjs-2";

// Register necessary Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const Statistics = ({ handleAuthentication }) => {
  const [isIncome, setIsIncome] = useState(true);

  const handleSliderChange = (event) => {
    setIsIncome(event.target.value === "income");
  };

  return (
    <div className="OuterContainer">
      <SideBar handleAuthentication={handleAuthentication} />
      <div className="InnerContainer">
        <div className="statisticsTop">
          <div className="slider-container">
            <input
              type="radio"
              id="income"
              name="category"
              value="income"
              checked={isIncome}
              onChange={handleSliderChange}
            />
            <label htmlFor="income">Income</label>
            <input
              type="radio"
              id="expense"
              name="category"
              value="expense"
              checked={!isIncome}
              onChange={handleSliderChange}
            />
            <label htmlFor="expense">Expenses</label>
          </div>
        </div>

        {/* Display based on selected option */}
        <div className="statisticsBottom">
          {isIncome ? (
            <>
              {/* <div className="income-graph-container">
                <h3>Income Graph</h3>
                <IncomeGraph />
              </div> */}
              <div className="income-pie-chart-container">
                <h3>Income Distribution</h3>
                <IncomePieChart />
              </div>
            </>
          ) : (
            <>
              {/* <div className="expense-graph-container">
                <h3>Expense Graph</h3>
                <ExpenseGraph />
              </div> */}
              <div className="expense-pie-chart-container">
                <h3>Expense Distribution</h3>
                <ExpensePieChart />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
