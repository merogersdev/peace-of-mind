const express = require("express");
const router = express.Router();

const {
  postLogin,
  postRegister,
  getUserDetails,
  getQuote,
} = require("../controllers/userController.js");

// ROUTE - /login
// POST - /login
router.route("/login").post(postLogin);

// ROUTE - /register
// POST - /register
router.route("/register").post(postRegister);

// ROUTE - /getuser
// GET - /getuser
router.route("/details").get(getUserDetails);

// Route - /quote
// GET - /quote
router.route("/quote").get(getQuote);

module.exports = router;
