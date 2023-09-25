const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const db = require("../knex");

const privateKey = process.env.JWT_SECRET;
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// POST - Log in user
const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await db("users").where("email", "=", email).first();

  // Check if user exists, if not return and error
  if (user === undefined) {
    return res.status(404).json({ success: false, message: "Invalid user" });
  }
  // Check if password is correct
  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ success: false, message: "Wrong password" });
  }

  // Generate Token to return to user
  const token = jwt.sign({ email: user.email, id: user.id }, privateKey, {
    expiresIn: "1d",
  });
  res.status(200).json({ success: true, token: `Bearer ${token}` });
  return null;
};

// POST - Register user
const postRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check for all necessary info before proceeding
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid User Registration" });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Check if user is already signed up
    const user = await db("users").where("email", "=", email).first();

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
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      success: false,
      message: "User registration failed",
      error: error.message,
    });
  }
};

const getUserDetails = (req, res) => {
  // Get Bearer token from header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  // Return unauthorized if no token
  if (token == null)
    return res.status(401).json({ success: false, error: "401: Unauthorized" });

  // Verify token and get user

  jwt.verify(token, privateKey, async (error, verifiedJwt) => {
    if (error)
      return res.status(403).json({ success: false, message: "Invalid Token" });

    const user = await db("users")
      .where("email", "=", verifiedJwt.email)
      .first();

    const entries = await db("entries").where("user_id", "=", user.id);

    const userDetails = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      entries: entries || [],
    };

    return res.status(200).json({ userDetails });
  });
  return null;
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
