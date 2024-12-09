const express = require("express");
const router = express.Router();

const signup = require("../handlers/userAuth");
const login = require("../handlers/userAuth");
const logout = require("../handlers/userAuth");
const data = require("../handlers/userAuth");

router.post("/signup", signup.signupFunction);
router.post("/login", login.loginFunction);
router.post("/logout", logout.logoutFunction);
router.post("/data", data.getDataFunction);
router.get("/userData/:username", data.getUserDataFunction);

module.exports = router;
