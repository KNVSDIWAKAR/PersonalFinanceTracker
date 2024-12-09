import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineSavings } from "react-icons/md";
import {
  FaHome,
  FaChartLine,
  FaWallet,
  FaExchangeAlt,
  FaEnvelope,
  FaCreditCard,
  FaUser,
  FaReceipt,
  FaIdCard,
  FaInc,
} from "react-icons/fa";
import ProfilePicture from "../Asserts/maleAvatar.png";
import "../dashboard/Styles/SideBar.css";

function SideBar({ handleAuthentication }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    handleAuthentication(false);
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="profile-section">
        <div className="profile-img-container">
          <img src={ProfilePicture} alt="User" className="profile-img" />
        </div>
        <p className="welcome-text">Welcome Back</p>
        <h3 className="username">{username}</h3>
      </div>

      <hr className="divider" />

      <ul className="menu">
        <li>
          <Link to="/dashboard">
            <FaHome className="icon" /> Dashboard
          </Link>
        </li>

        <li>
          <Link to="/transfer">
            <FaExchangeAlt className="icon" /> Expense
          </Link>
        </li>
        <li>
          <Link to="/income">
            <MdOutlineSavings className="icon" />
            Income
          </Link>
        </li>
        <li>
          <Link to="/addcard">
            <FaCreditCard className="icon" /> Add Cards
          </Link>
        </li>
        <li>
          <Link to="/transactions">
            <FaReceipt className="icon" /> Transactions
          </Link>
        </li>
        <li>
          <Link to="/cards">
            <FaIdCard className="icon" /> Cards
          </Link>
        </li>
        <li>
          <Link to="/statistics">
            <FaChartLine className="icon" /> Statistics
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FaUser className="icon" /> Profile
          </Link>
        </li>
      </ul>

      <button className="logout" onClick={handleLogout}>
        <Link to="/">Logout</Link>
      </button>
    </aside>
  );
}

export default SideBar;
