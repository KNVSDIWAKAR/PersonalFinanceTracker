import React from "react";
import "../dashboard/Styles/Header.css";

function Header() {
  return (
    <header className="header">
      <h2>Dashboard</h2>
      <div className="header-right">
        <input type="text" placeholder="Search" />
        <div className="icons">
          <i className="bell-icon"></i>
          <i className="settings-icon"></i>
        </div>
      </div>
    </header>
  );
}

export default Header;
