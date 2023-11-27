const { version } = require("../package.json");

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
  apis: ["../routes/*.js"],
};

module.exports = options;
