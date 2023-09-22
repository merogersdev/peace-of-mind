const express = require("express");

const router = express.Router();
const passport = require("passport");

const userRoutes = require("./userRoutes");
const entryRoutes = require("./entryRoutes");

router.use("/users", userRoutes);
router.use(
  "/entries",
  passport.authenticate("jwt", { session: false }),
  entryRoutes
);

module.exports = router;
