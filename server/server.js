// Require ENV

require("dotenv").config();
const port = process.env.PORT || 5000;

// Route Imports

const userRoutes = require("./routes/userRoutes");
const entryRoutes = require("./routes/entryRoutes");

// Express

const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");

// Passport

const passport = require("passport");
app.use(passport.initialize());
require("./middleware/passport");

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(helmet());

app.use("/users", userRoutes);
app.use(
  "/entries",
  passport.authenticate("jwt", { session: false }),
  entryRoutes
);

// Listen
app.listen(port, () => {
  console.log(`> Server running at http://localhost:${port} `);
});
