const express = require("express");
const router = express.Router();

const {
  getEntries,
  postEntry,
  patchEntry,
  deleteEntry,
} = require("../controllers/entryController");

// ROUTE - /
// GET - /entries
// POST - /entries
router.route("/").get(getEntries).post(postEntry);

// ROUTE - /:id
// POST - /:id - param id
// DELETE - /:id - param id
router.route("/:id").patch(patchEntry).delete(deleteEntry);

module.exports = router;
