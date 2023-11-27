require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("passport");

const userRoutes = require("./routes/userRoutes");
const entryRoutes = require("./routes/entryRoutes");
const docRoutes = require("./routes/docRoutes");

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

app.use("/api/docs", docRoutes);
app.use("/api/users", userRoutes);
app.use(
  "/api/entries",
  // passport.authenticate("jwt", { session: false }),
  entryRoutes
);

//  404 Catch
app.use("*", (_req, res) =>
  res.status(404).json({ message: "Endpoint not found" })
);

module.exports = app;

/*


GET:      /api/users/       Gets all users
POST:     /api/users/       Register User
PUT:      /api/users/:id    Updates User
DELETE:   /api/users/:id    Deletes User
GET:      /api/users/login  User Login

GET:      /api/entries/:id  Gets Entry
POST:     /api/entries/:id  New Entry
PUT:      /api/entries/:id  Update Entry
DELETE:   /api/entries/:id  Delete Entry

*/
