const bcrypt = require("bcrypt");
const pool = require("../config/db");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

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
      .json({ success: false, message: "Error: Missing User ID" });
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

    if (userExists.rows[0].id !== id) {
      return res
        .status(403)
        .json({ success: false, message: "Error: Unauthorized" });
    }

    const entries = await pool.query(
      "SELECT DISTINCT user_id, entries.id, title, gratitude, entry, created_at, updated_at FROM entries JOIN users ON entries.user_id = $1 ORDER BY entries.id",
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

const allUsersHandler = async (_req, res) => {
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
  if (!firstName || !lastName || !email) {
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
    if (userExists.rows[0].id !== Number(id)) {
      return res
        .status(403)
        .json({ success: false, message: "Error: Unauthorized" });
    }

    // Update user depending on whether password is changed or not
    if (password === null) {
      await pool.query(
        "UPDATE users SET email = ($1), first_name = ($2), last_name = ($3) WHERE id = ($4)",
        [email, firstName, lastName, id]
      );
    } else {
      const hashedPassword = bcrypt.hashSync(password, salt);
      await pool.query(
        "UPDATE users SET email = ($1), first_name = ($2), last_name = ($3), password = ($4) WHERE id = ($5)",
        [email, firstName, lastName, hashedPassword, id]
      );
    }

    return res.status(200).json({
      success: true,
      message: "User updated. Please logout and log back in.",
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

    if (userExists.rows[0].id !== Number(id)) {
      return res
        .status(403)
        .json({ success: false, message: "Error: Unauthorized" });
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
  registerHandler,
  userDetailsHandler,
  allUsersHandler,
  updateUserHandler,
  deleteUserHandler,
};
