const express = require("express");
const router = express.Router();

const {
  postLogin,
  postSignup,
  getUserDetails,
} = require("../controllers/userController.js");

// ROUTE - /login
// POST - /login
router.route("/login").post(postLogin);

// ROUTE - /signup
// POST - /signup
router.route("/signup").post(postSignup);

// ROUTE - /getuser
// GET - /getuser
router.route("/details").get(getUserDetails);

module.exports = router;
