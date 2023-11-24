const express = require("express");
const passport = require("passport");

const router = express.Router();

const {
  postLogin,
  postRegister,
  getUserDetails,
  getQuote,
} = require("../controllers/userController");

// ROUTE - /login
router.route("/login").post(postLogin);

// ROUTE - /register
router.route("/register").post(postRegister);

// ROUTE - /details
router.route("/details").get(getUserDetails);

// Route - /quote
router.route("/quote").get(getQuote);

module.exports = router;
