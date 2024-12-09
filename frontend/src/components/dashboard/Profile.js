import React, { useState, useEffect } from "react";
import maleProfilePic from "../Asserts/maleAvatar.png";
import femaleProfilePic from "../Asserts/femaleAvatar.png";
import SideBar from "./SideBar";
import "../dashboard/Styles/Profile.css";

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
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:814/user/userData/${username}`
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
    fetchUserData();
  }, [username]);

  return (
    <div className="profilecontainer">
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
        className="profile-container"
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
              background: "#3C3C3D ",
              backdropFilter: "blur(10px)",
              borderRadius: "50%",
              zIndex: 1,
            }}
          ></div>

          {/* Image */}
          <img
            src={userData.gender === "Male" ? femaleProfilePic : maleProfilePic}
            alt="Profile"
            style={{
              borderRadius: "50%",
              width: "150px",
              height: "150px",
              position: "relative", // Ensure it layers above the background div
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
          {[
            { label: "Firstname", value: userData.firstName },
            { label: "Lastname", value: userData.lastName },
            { label: "Email", value: userData.email },
            { label: "Phone", value: userData.phone },
            { label: "Age", value: userData.age },
            { label: "Gender", value: userData.gender },
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
