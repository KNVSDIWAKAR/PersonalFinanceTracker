import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ handleAuthentication }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(""); // "Male" or "Female"
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Create the data object to be sent to the backend
    const data = {
      firstName,
      lastName,
      username,
      email,
      password,
      phone,
      age,
      gender,
    };

    try {
      // Send the signup request
      const res = await axios.post("http://localhost:814/user/signup", data);

      // Handle success response
      if (res.data.status === 200) {
        handleAuthentication(true); // Mark user as authenticated
        navigate("/dashboard"); // Redirect to dashboard
        localStorage.setItem("username", username); // Store username
      } else {
        alert(res.data.error || "SignUp failed, please try again.");
      }
    } catch (error) {
      // Handle errors gracefully
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        alert(error.response.data.error || "An error occurred during signup.");
      } else {
        console.error("Error Message:", error.message);
        alert("Unable to reach the server. Please try again later.");
      }
    }
  };

  return (
    <div className="flex min-h-full w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          {/* First Name Field */}
          <div>
            <label
              style={{ color: "#d3d3d3" }}
              htmlFor="firstName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First Name
            </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ padding: "10px" }}
              id="firstName"
              name="firstName"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset sm:text-sm"
            />
          </div>

          {/* Last Name Field */}
          <div>
            <label
              style={{ color: "#d3d3d3" }}
              htmlFor="lastName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ padding: "10px" }}
              id="lastName"
              name="lastName"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset sm:text-sm"
            />
          </div>

          {/* Other Fields (Username, Email, Phone, Password, etc.) */}
          <div>
            <label
              style={{ color: "#d3d3d3" }}
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: "10px" }}
              id="username"
              name="username"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset sm:text-sm"
            />
          </div>

          <div>
            <label
              style={{ color: "#d3d3d3" }}
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "10px" }}
              id="email"
              name="email"
              type="email"
              required
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset sm:text-sm"
            />
          </div>

          <div>
            <label
              style={{ color: "#d3d3d3" }}
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: "10px" }}
              id="password"
              name="password"
              type="password"
              required
              minLength="6"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset sm:text-sm"
            />
          </div>

          <div>
            <label
              style={{ color: "#d3d3d3" }}
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Mobile Number
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ padding: "10px" }}
              id="phone"
              name="phone"
              type="tel"
              pattern="[0-9]{10}"
              required
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset sm:text-sm"
            />
          </div>

          <div>
            <label
              style={{ color: "#d3d3d3" }}
              htmlFor="age"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Age
            </label>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{ padding: "10px" }}
              id="age"
              name="age"
              type="number"
              required
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset sm:text-sm"
            />
          </div>

          <div>
            <label
              style={{ color: "#d3d3d3" }}
              htmlFor="gender"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={{ padding: "10px" }}
              id="gender"
              name="gender"
              required
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset sm:text-sm"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <input
              value="SignUp"
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            />
          </div>
        </form>

        {/* Redirect to Login */}
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
