const express = require("express");
const router = express.Router();

const signup = require("../handlers/userAuth");
const login = require("../handlers/userAuth");
const logout = require("../handlers/userAuth");
const data = require("../handlers/userAuth");

// Add CORS headers dynamically for each route
router.post(
  "/signup",
  (req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://personal-finance-tracker-frontend-azure.vercel.app"
    ); // Allow specific origin
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  },
  signup.signupFunction
);

router.post(
  "/login",
  (req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://personal-finance-tracker-frontend-azure.vercel.app"
    ); // Allow specific origin
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  },
  login.loginFunction
);

router.post(
  "/logout",
  (req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://personal-finance-tracker-frontend-azure.vercel.app"
    ); // Allow specific origin
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  },
  logout.logoutFunction
);

router.post(
  "/data",
  (req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://personal-finance-tracker-frontend-azure.vercel.app"
    ); // Allow specific origin
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  },
  data.getDataFunction
);

router.get(
  "/userData/:username",
  (req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://personal-finance-tracker-frontend-azure.vercel.app"
    ); // Allow specific origin
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  },
  data.getUserDataFunction
);

module.exports = router;
