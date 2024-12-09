import React, { useState, useEffect } from "react";
import maleProfilePic from "../Asserts/maleAvatar.png"; // Your male profile picture
import femaleProfilePic from "../Asserts/femaleAvatar.png"; // Your female profile picture
import SideBar from "./SideBar"; // Assuming you have a Sidebar component
import "../dashboard/Styles/Profile.css"; // Import your CSS styles for the profile

const Profile = ({ handleAuthentication }) => {
  const username = localStorage.getItem("username");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    age: 0,
    gender: "",
    balance: 0,
    income: 0,
    savings: 0,
    expenses: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://personal-finance-tracker-backend-five.vercel.app/user/userData/${username}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    if (username) fetchUserData();
  }, [username]);

  return (
    <div className="profile-container">
      <SideBar handleAuthentication={handleAuthentication} />
      <div
        style={{
          marginTop: "170px",
          width: "400px",
          margin: "50px auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          fontFamily: "Arial, sans-serif",
        }}
        className="profile-details-container"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
            position: "relative",
          }}
        >
          {/* Background Div */}
          <div
            style={{
              position: "absolute",
              width: "150px",
              height: "150px",
              background: "#3C3C3D",
              backdropFilter: "blur(10px)",
              borderRadius: "50%",
              zIndex: 1,
            }}
          ></div>

          {/* Profile Picture */}
          <img
            src={userData.gender === "Male" ? maleProfilePic : femaleProfilePic}
            alt="Profile"
            style={{
              borderRadius: "50%",
              width: "150px",
              height: "150px",
              position: "relative",
              zIndex: 2,
            }}
          />
        </div>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#d3d3d3",
          }}
        >
          {userData.username}
        </h2>

        <div style={{ lineHeight: "2", fontSize: "16px", color: "#d3d3d3" }}>
          {/* User Data Display */}
          {[
            { label: "First Name", value: userData.firstName },
            { label: "Last Name", value: userData.lastName },
            { label: "Email", value: userData.email },
            { label: "Phone", value: userData.phone },
            { label: "Age", value: userData.age },
            { label: "Gender", value: userData.gender },
            { label: "Balance", value: userData.balance },
            { label: "Income", value: userData.income },
            { label: "Savings", value: userData.savings },
            { label: "Expenses", value: userData.expenses },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <strong style={{ flex: "1", textAlign: "left" }}>
                {item.label}:
              </strong>
              <span style={{ flex: "2", textAlign: "right" }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
