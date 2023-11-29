const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = require("../config/swagger");

const swaggerSpec = swaggerJSDoc(options);
const router = express.Router();

/**
 * @swagger
 * /docs/:
 *   get:
 *     summary: API Docs
 *     description: Swagger docs and details for all API endpoints
 *     tags: [docs]
 */
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
