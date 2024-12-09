import React, { useState } from "react";
import "../dashboard/Styles/Dashboard.css";
import Overview from "./Overview";
import MyCards from "./MyCards";
import IncomeExpenses from "./IncomeExpenses";
import LastTransaction from "./LastTransaction";
import SideBar from "./SideBar";
//Diwakar
function Dashboard({ handleAuthentication }) {
  return (
    <div className="dashboard-container">
      <SideBar handleAuthentication={handleAuthentication} />
      <div className="main-content">
        <Overview />
        <MyCards />
        <IncomeExpenses />
      </div>
      <LastTransaction />
    </div>
  );
}

export default Dashboard;
