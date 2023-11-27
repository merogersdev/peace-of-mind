const express = require("express");

const router = express.Router();

const {
  loginHandler,
  registerHandler,
  userDetailsHandler,
  allUsersHandler,
  updateUserHandler,
  deleteUserHandler,
} = require("../controllers/userController");

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Gets all users
 *     description: Retrieves all users in database and returns basic info.
 *     tags: [users]
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
 *                  description: User delete success or fail
 *                  example: true
 *                message:
 *                  type: string
 *                  description: Message indicating success
 *                  example: "Users Details"
 *                users:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: number
 *                        example: 1
 *                      first_name:
 *                        type: string
 *                        example: Test
 *                      last_name:
 *                        type: string
 *                        example: User
 *                      email:
 *                        type: string
 *                        example: testuser@example.com
 *      '404':
 *        description: No users found
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
 *                  example: "Error: No users found"
 */
router.get("/", allUsersHandler);

/**
 * @swagger
 * /users/:
 *   post:
 *     summary: Register User
 *     description: Creates user in database and returns basic info.
 *     tags: [users]
 *     responses:
 *      '201':
 *        description: User registered successfully
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
 *                  example: User registered successfully
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
 */
router.post("/", registerHandler);

/**
 * @swagger
 * /users/login:
 *   get:
 *     summary: User Login
 *     description: API endpoint for logging in the user and returning their user info, along with entries.
 *     tags: [users]
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
router.post("/login", loginHandler);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: User Details
 *     description: Get user details
 *     tags: [users]
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
 *                  description: User delete success or fail
 *                  example: true
 *                message:
 *                  type: string
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
 *      '400':
 *          description: No user id
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
 *                    example: "Error: Missing User ID"
 *      '403':
 *          description: Unauthorized
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
 *                    example: "Error: Unauthorized"
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
 */
router.get("/:id", userDetailsHandler);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update User
 *     description: Update user details
 *     tags: [users]
 *     responses:
 *      '200':
 *        description: Successfully updated user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Query success or fail
 *                  example: true
 *                message:
 *                  type: string
 *                  description: Message indicating success
 *                  example: "User updated successfully"
 *      '400':
 *          description: No user ID
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
 *      '403':
 *          description: Unauthorized
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
 *                    example: "Error: Unauthorized"
 *      '404':
 *        description: No user found to update
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

 */
router.patch("/:id", updateUserHandler);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete User
 *     description: Deletes user and their entries
 *     tags: [users]
 *     responses:
 *      '200':
 *        description: Successfully deleted user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: User delete success or fail
 *                  example: true
 *                message:
 *                  type: string
 *                  description: Message indicating success
 *                  example: "User deleted successfully"
 *      '403':
 *          description: Unauthorized
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
 *                    example: "Error: Unauthorized"
 *      '404':
 *        description: No user found to delete
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: User delete success or fail
 *                  example: false
 *                message:
 *                  type: string
 *                  description: Message indicating no user found
 *                  example: "Error: No user found"
 */
router.delete("/:id", deleteUserHandler);

module.exports = router;
