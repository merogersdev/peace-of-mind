const express = require("express");
const router = express.Router();

const { postLogin, postSignup } = require("../controllers/userController.js");

// ROUTE - /login
// POST - /login
router.route("/login").post(postLogin);

// ROUTE - /signup
// POST - /signup
router.route("/signup").post(postSignup);

module.exports = router;
