// Require ENV

require("dotenv").config();
const port = process.env.PORT || 5000;

// Route Imports

const userRoutes = require("./routes/userRoutes")
const entryRoutes = require("./routes/entryRoutes")

// Express

const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet")

// Middleware

const { logRequests} = require("./middleware/logRequest")

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(logRequests)
app.use(helmet())

app.use("/users", userRoutes)
app.use("/entries", entryRoutes)

// Listen

app.listen(port, () => {
  console.log(`> Server running on port: ${port} `);
});
