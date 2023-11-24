const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const pool = require("../config/db");

const privateKey = process.env.JWT_SECRET;
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// POST - Log in user
const postLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check for all necessary info before proceeding
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Error: Missing fields" });
  }

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows[0] === undefined) {
      return res
        .status(404)
        .json({ success: false, message: "Error: User not found" });
    }
    // Check if password is correct
    const validPassword = bcrypt.compareSync(password, user.rows[0].password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Error: Invalid credentials" });
    }

    const entries = await pool.query(
      "SELECT DISTINCT user_id, entries.id, title, gratitude, entry FROM entries JOIN users ON entries.user_id = $1 ORDER BY entries.id",
      [user.rows[0].id]
    );

    // Generate Token to return to user
    const token = jwt.sign(
      { email: user.email, id: user.rows[0].id },
      privateKey,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({
      success: true,
      token: `Bearer ${token}`,
      user: user.rows[0],
      entries: entries.rows,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User login failed",
      error: error.message,
    });
  }
};

// POST - Register user
const postRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check for all necessary info before proceeding
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Error: Missing fields" });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Check if user is already signed up
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // If user exists, exit and display error
    if (user.rows[0] !== undefined) {
      return res.status(400).json({
        success: false,
        message: "Error: User already exists",
      });
    }

    // Insert User
    await pool.query(
      "INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
      [firstName, lastName, email, hashedPassword]
    );
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { firstName, lastName, email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User registration failed",
      error: error.message,
    });
  }
};

const getUserDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    const entries = await pool.query(
      "SELECT * FROM entries WHERE user_id = $1",
      [id]
    );

    return res.status(200).json({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      entries: entries || [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User details request failed",
      error: error.message,
    });
  }
};

const getQuote = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  // Return unauthorized if no token
  if (token == null)
    return res.status(401).json({ success: false, error: "401: Unauthorized" });

  try {
    const response = await axios.get(
      "https://api.api-ninjas.com/v1/quotes?category=inspirational",
      {
        headers: {
          "X-Api-Key": process.env.API_KEY,
        },
      }
    );

    return res.status(200).json({ quote: response.data[0] });
  } catch (error) {
    console.error(error);
  }
  return null;
};

module.exports = { postLogin, postRegister, getUserDetails, getQuote };
