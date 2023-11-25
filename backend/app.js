require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("passport");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { version } = require("./package.json");

const indexRoutes = require("./routes");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Peace Of Mind Express API",
    version,
    description: "This is a REST API for the Peace Of Mind Application",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "Michelle Rogers",
      url: "http://merogers.dewv",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

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
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//  404 Catch
app.use("*", (_req, res) =>
  res.status(404).json({ message: "Endpoint not found" })
);

module.exports = app;
