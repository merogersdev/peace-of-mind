// ENV
const privateKey = process.env.JWT_SECRET;

// Bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// JWT
const jwt = require("jsonwebtoken");

// Knex
const knex = require("knex");
const knexConfig = require("../config/knexfile.js");
const db = knex(knexConfig);

// POST - Log in user
const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await db("users").where("username", "=", email).first();

  // Check if user exists, if not return and error
  if (user === undefined) {
    return res.status(400).json({ success: false, message: "Invalid user" });
  }
  // Check if password is correct
  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ success: false, message: "Wrong password" });
  }

  // Generate Token to return to user
  const token = jwt.sign({ email: user.username, id: user.id }, privateKey, {
    expiresIn: "1d",
  });
  res.status(200).json({ success: true, token: `Bearer ${token}` });
};

// POST - Sign up user
const postSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check for all necessary info before proceeding
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid User Signup" });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Check if user is already signed up
    const user = await db("users").where("username", "=", email).first();

    // If user exists, exit and display error
    if (user !== undefined) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Create New User
    await db("users").insert({
      first_name: firstName,
      last_name: lastName,
      username: email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "User signup failed" });
    console.error(error.message);
  }
  res.json({ message: "post signup" });
};

module.exports = { postLogin, postSignup };
