const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// Initialize the app
const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://personal-finance-tracker-frontend-azure.vercel.app",
      "https://personal-finance-tracker-frontend-azure.vercel.app/user/login",
      "http://localhost:3000", // local development frontend (if applicable)
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials (cookies)
  })
);

app.use(express.json()); // Parse incoming JSON data
app.use(cookieParser()); // Parse cookies from the requests

// Routes
const uRoutes = require("./routes/userRoute.js");
const transactionRoutes = require("./routes/transactionRoutes.js");
const incomeRoutes = require("./routes/incomeRoutes.js");
const cardRoutes = require("./routes/cardRoutes.js");

// Base Route
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// API Routes
app.use("/user", uRoutes);
app.use("/txn", transactionRoutes);
app.use("/income", incomeRoutes);
app.use("/card", cardRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error
  if (typeof err === "string") {
    return res.status(400).send({ message: err });
  }
  return res.status(400).send({ message: err.message });
});

// Catch-all for undefined routes (404)
app.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

module.exports = app;
