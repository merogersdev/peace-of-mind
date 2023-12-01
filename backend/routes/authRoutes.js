const express = require("express");

const router = express.Router();

const {
  refreshHandler,
  loginHandler,
} = require("../controllers/authController");

/**
 * @swagger
 * /auth/:
 *   get:
 *     summary: Refresh User Token
 *     description: If token is present, it will reauthenticate the user
 *     tags: [auth]
 *     responses:
 *      '200':
 *        description: User Details
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  description: Message indicating success
 *                  example: "User Details"
 *                user:
 *                  type: object
 *                  properties:
 *                    first_name:
 *                      type: string
 *                      example: Test
 *                    last_name:
 *                      type: string
 *                      example: User
 *                    email:
 *                      type: string
 *                      example: testuser@example.com
 *                    entries:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: number
 *                            example: 1
 *                          title:
 *                            type: string
 *                            example: Entry 1
 *                          gratitude:
 *                            type: string
 *                            example: I'm thankful for my kitties.
 *                          entry:
 *                            type: string
 *                            example: Today was a good day. Just gonna send it.
 *                quote:
 *                  type: object
 *                  properties:
 *                    quote:
 *                      type: text
 *                      example: Clouds come floating into my life, no longer to carry rain or usher storm, but to add color to my sunset sky.
 *                    author:
 *                      type: text
 *                      example: Rabindranath Tagore
 *                    category:
 *                      type: text
 *                      example: inspirational
 *      '400':
 *          description: Missing fields
 *          content:
 *            application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  message:
 *                    type: string
 *                    description: Message indicating fields missing
 *                    example: "Error: Missing Fields"
 *      '404':
 *        description: No user found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  description: Message indicating no user found
 *                  example: "Error: No user found"
 *
 */

router.get("/", refreshHandler);

/**
 * @swagger
 * /auth/:
 *   post:
 *     summary: User Login
 *     description: API endpoint for logging in the user and returning their user info, along with entries.
 *     tags: [auth]
 *     responses:
 *      '200':
 *        description: User Details
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: true
 *                message:
 *                  type: string
 *                  description: Message indicating success
 *                  example: "User Details"
 *                user:
 *                  type: object
 *                  properties:
 *                    first_name:
 *                      type: string
 *                      example: Test
 *                    last_name:
 *                      type: string
 *                      example: User
 *                    email:
 *                      type: string
 *                      example: testuser@example.com
 *                    entries:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: number
 *                            example: 1
 *                          title:
 *                            type: string
 *                            example: Entry 1
 *                          gratitude:
 *                            type: string
 *                            example: I'm thankful for my kitties.
 *                          entry:
 *                            type: string
 *                            example: Today was a good day. Just gonna send it.
 *                quote:
 *                  type: object
 *                  properties:
 *                    quote:
 *                      type: text
 *                      example: Clouds come floating into my life, no longer to carry rain or usher storm, but to add color to my sunset sky.
 *                    author:
 *                      type: text
 *                      example: Rabindranath Tagore
 *                    category:
 *                      type: text
 *                      example: inspirational
 *      '400':
 *          description: Missing fields
 *          content:
 *            application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  message:
 *                    type: string
 *                    description: Message indicating fields missing
 *                    example: "Error: Missing Fields"
 *      '404':
 *        description: No user found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  example: false
 *                message:
 *                  type: string
 *                  description: Message indicating no user found
 *                  example: "Error: No user found"
 *
 */
router.post("/", loginHandler);

module.exports = router;
