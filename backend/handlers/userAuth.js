/* eslint-disable @typescript-eslint/no-unused-vars */
require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) => /^\d{10}$/.test(phone);

async function signupFunction(req, res) {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password: plainTextPassword,
      phone,
      age,
      gender,
    } = req.body;

    // Validate input
    if (!validateEmail(email)) {
      return res.status(400).json({ status: "error", error: "Invalid Email" });
    }
    if (!validatePhone(phone)) {
      return res
        .status(400)
        .json({ status: "error", error: "Invalid Phone Number" });
    }
    if (!plainTextPassword || plainTextPassword.length < 6) {
      return res.status(400).json({
        status: "error",
        error: "Password must be at least 6 characters",
      });
    }

    // Check for duplicate username or phone
    const [usernameExists, phoneExists] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ phone }),
    ]);

    if (usernameExists) {
      return res
        .status(400)
        .json({ status: "error", error: "Username already taken" });
    }
    if (phoneExists) {
      return res
        .status(400)
        .json({ status: "error", error: "Phone number already taken" });
    }

    // Hash password and create user
    const password = await bcrypt.hash(plainTextPassword, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
      phone,
      age,
      gender,
    });

    return res.status(201).json({
      status: 200,
      message: "User created successfully!",
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
}

async function loginFunction(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).lean();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ status: "error", error: "Invalid Username/Password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "10min" }
    );

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ status: 200, message: "Logged in successfully" });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
}

async function logoutFunction(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ status: "ok", message: "Logged out successfully" });
  } catch (err) {
    console.error("Error during logout:", err);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
}

async function getDataFunction(req, res) {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username }).lean();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const financeData = {
      balance: user.balance,
      income: user.income,
      savings: user.savings,
      expenses: user.expenses,
    };

    res.status(200).json({ success: true, data: financeData });
  } catch (err) {
    console.error("Error fetching financial data:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function getUserDataFunction(req, res) {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select("-password").lean();
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  signupFunction,
  loginFunction,
  logoutFunction,
  getDataFunction,
  getUserDataFunction,
};
