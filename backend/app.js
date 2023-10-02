require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("passport");
const indexRoutes = require("./routes");
require("./middleware/passport");

// Express & Middleware
const app = express();
app.use(passport.initialize());
app.use(express.json());
app.use(cors());
app.use(helmet());

// Log requests in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

// API Routes
app.use("/api", indexRoutes);

//  404 Catch
app.use("*", (_req, res) =>
  res.status(404).json({ message: "Endpoint not found" })
);

module.exports = app;
