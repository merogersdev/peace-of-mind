const express = require("express");
const passport = require("passport");

const router = express.Router();

const { postLogin, postRegister } = require("../controllers/userController");

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Gets all users
 *     description: Retrieves all users in database and returns basic info.
 *     tags: [users]
 */

/**
 * @swagger
 * /users/:
 *   post:
 *     summary: Register User
 *     description: Creates user in database and returns basic info.
 *     tags: [users]
 */
router.post("/", postRegister);

/**
 * @swagger
 * /users/login:
 *   get:
 *     summary: User Login
 *     description: API endpoint for logging in the user and returning their user info, along with entries.
 *     tags: [users]
 */
router.post("/login", postLogin);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: User Details
 *     description: Get user details
 *     tags: [users]
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update User
 *     description: Update user details
 *     tags: [users]
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete User
 *     description: Deletes user and their entries
 *     tags: [users]
 */

module.exports = router;
