const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required!"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required!"],
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [8, "Password must be at least 8 characters!"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required!"],
      unique: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits!"],
    },
    age: {
      type: Number,
      required: [true, "Age is required!"],
      min: [1, "Age must be a positive number!"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required!"],
      enum: ["Male", "Female", "Other"],
    },
    balance: {
      type: Number,
      default: 0,
      min: [0, "Balance cannot be negative!"],
    },
    income: {
      type: Number,
      default: 0,
      min: [0, "Income cannot be negative!"],
    },
    savings: {
      type: Number,
      default: 0,
      min: [0, "Savings cannot be negative!"],
    },
    expenses: {
      type: Number,
      default: 0,
      min: [0, "Expenses cannot be negative!"],
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

module.exports = mongoose.model("User", userSchema);
