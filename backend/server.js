require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 5000;

// Listen
app.listen(port, () => {
  console.info(`> Server running at http://localhost:${port} `);
});
