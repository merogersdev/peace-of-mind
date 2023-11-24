const express = require("express");

const router = express.Router();
const passport = require("passport");

const userRoutes = require("./userRoutes");
const entryRoutes = require("./entryRoutes");

router.use("/users", userRoutes);
router.use(
  "/entries",
  // passport.authenticate("jwt", { session: false }),
  entryRoutes
);

module.exports = router;

/*


GET:      /api/users/       Gets all users
POST:     /api/users/       Register User
PUT:      /api/users/:id    Updates User
DELETE:   /api/users/:id    Deletes User
GET:      /api/users/login  User Login

GET:      /api/entries/:id  Gets Entry
POST:     /api/entries/:id  New Entry
PUT:      /api/entries/:id  Update Entry
DELETE:   /api/entries/:id  Delete Entry

*/
