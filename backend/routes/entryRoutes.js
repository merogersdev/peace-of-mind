const express = require("express");

const router = express.Router();

const {
  getEntries,
  postEntry,
  patchEntry,
  deleteEntry,
} = require("../controllers/entryController");

// ROUTE - /
router.route("/").get(getEntries).post(postEntry);

// ROUTE - /:id
router.route("/:id").patch(patchEntry).delete(deleteEntry);

module.exports = router;
