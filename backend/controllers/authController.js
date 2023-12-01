const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const pool = require("../config/db");

const privateKey = process.env.JWT_SECRET;

const loginHandler = async (req, res) => {
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

    const quote = await axios.get(
      "https://api.api-ninjas.com/v1/quotes?category=inspirational",
      {
        headers: {
          "X-Api-Key": process.env.API_KEY,
        },
      }
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
      quote: quote.data[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User login failed",
      error: error.message,
    });
  }
};

const refreshHandler = async (req, res) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Error: No token present",
    });
  }

  try {
    // Decode Token, return decoded token or error
    const decodedToken = jwt.verify(token, privateKey, (error, decoded) => {
      if (error)
        return res.status(401).json({
          success: false,
          message: "Token verification failed",
          error: error.message,
        });
      return decoded;
    });

    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      decodedToken.id,
    ]);

    if (user.rows[0] === undefined) {
      return res
        .status(404)
        .json({ success: false, message: "Error: User not found" });
    }

    const entries = await pool.query(
      "SELECT DISTINCT user_id, entries.id, title, gratitude, entry FROM entries JOIN users ON entries.user_id = $1 ORDER BY entries.id",
      [user.rows[0].id]
    );

    const quote = await axios.get(
      "https://api.api-ninjas.com/v1/quotes?category=inspirational",
      {
        headers: {
          "X-Api-Key": process.env.API_KEY,
        },
      }
    );

    // Generate Token to return to user
    const newToken = jwt.sign(
      { email: user.email, id: user.rows[0].id },
      privateKey,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: true,
      token: `Bearer ${newToken}`,
      user: user.rows[0],
      entries: entries.rows,
      quote: quote.data[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error: Token verification Failed",
      error: error.message,
    });
  }
};

module.exports = { loginHandler, refreshHandler };
