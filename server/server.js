const path = require("path");

// Require ENV

require("dotenv").config();
const port = process.env.PORT || 5000;

// Route Imports

const indexRoutes = require("./routes");

// Express

const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Passport

const passport = require("passport");
app.use(passport.initialize());
require("./middleware/passport");

// Middleware

app.use(express.json());
app.use(cors());
app.use(helmet());

// Log requests in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

// API Routes
app.use("/api", indexRoutes);

// In Production, serve frontend files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (_req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    )
  );
} else {
  app.get("/", (_req, res) => res.send("Development Mode"));
}

//  404 Catch
app.use("*", (_req, res) =>
  res.status(404).json({ message: "Endpoint not found" })
);

// Listen
app.listen(port, () => {
  console.log(`> Server running at http://localhost:${port} `);
});
