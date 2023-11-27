const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const pool = require("../config/db");

const privateKey = process.env.JWT_SECRET;
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

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

const registerHandler = async (req, res) => {
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

const userDetailsHandler = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Error: Missing user id" });
  }

  try {
    const userExists = await pool.query(
      "SELECT id, first_name, last_name, email FROM users WHERE id = $1",
      [id]
    );

    if (userExists.rows[0] === undefined) {
      return res
        .status(404)
        .json({ success: false, message: "Error: No user found" });
    }

    const entries = await pool.query(
      "SELECT DISTINCT user_id, entries.id, title, gratitude, entry FROM entries JOIN users ON entries.user_id = $1 ORDER BY entries.id",
      [userExists.rows[0].id]
    );

    return res.status(200).json({
      success: true,
      message: "User Details",
      user: userExists,
      entries: entries || [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get user details",
      error: error.message,
    });
  }
};

const allUsersHandler = async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT id, first_name, last_name, email FROM users"
    );

    if (users.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Error: No users found" });
    }

    return res.status(200).json({
      success: true,
      message: "Users Details",
      users: users.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get users",
      error: error.message,
    });
  }
};

const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  // Check for all necessary info before proceeding
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Error: Missing fields" });
  }

  try {
    const userExists = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);

    if (userExists.rows[0] === undefined) {
      return res
        .status(404)
        .json({ success: false, message: "Error: No user found" });
    }

    const hashedPassword = bcrypt.hashSync(password, salt);

    await pool.query(
      "UPDATE users SET email = ($1), first_name = ($2), last_name = ($3), password = ($4) WHERE id = ($5)",
      [email, firstName, lastName, hashedPassword, id]
    );

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
};

const deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const userExists = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);

    if (userExists.rows[0] === undefined) {
      return res
        .status(404)
        .json({ success: false, message: "Error: No user found" });
    }

    await pool.query("DELETE FROM users WHERE id = ($1)", [id]);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

module.exports = {
  loginHandler,
  registerHandler,
  userDetailsHandler,
  allUsersHandler,
  updateUserHandler,
  deleteUserHandler,
};
