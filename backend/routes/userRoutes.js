const express = require("express");
const passport = require("passport");

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
 */
router.get("/", allUsersHandler);

/**
 * @swagger
 * /users/:
 *   post:
 *     summary: Register User
 *     description: Creates user in database and returns basic info.
 *     tags: [users]
 */
router.post("/", registerHandler);

/**
 * @swagger
 * /users/login:
 *   get:
 *     summary: User Login
 *     description: API endpoint for logging in the user and returning their user info, along with entries.
 *     tags: [users]
 */
router.post("/login", loginHandler);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: User Details
 *     description: Get user details
 *     tags: [users]
 */
router.get("/:id", userDetailsHandler);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update User
 *     description: Update user details
 *     tags: [users]
 */
router.patch("/:id", updateUserHandler);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete User
 *     description: Deletes user and their entries
 *     tags: [users]
 */
router.delete("/:id", deleteUserHandler);

module.exports = router;
