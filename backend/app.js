const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Initialize the app
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  })
);
app.use(express.json());
app.use(cookieParser());

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
  console.log(err);

  if (typeof err === "string") {
    return res.status(400).send({
      message: err,
    });
  }

  return res.status(400).send({
    message: err.message,
  });
});

module.exports = app;
