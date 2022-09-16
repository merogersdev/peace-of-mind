// Require ENV

require("dotenv").config();
const port = process.env.PORT || 5000;

// Express

const express = require("express");
const app = express();
const cors = require("cors");

// Middleware

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Listen

app.listen(port, () => {
  console.log(`> Server running on port: ${port} `);
});
