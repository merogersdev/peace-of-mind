const express = require("express");
const router = express.Router();

const {
  getEntries,
  postEntry,
  putEntry,
} = require("../controllers/entryController");

// ROUTE - /
// GET - /entries
// POST - /entries
router.route("/").get(getEntries).post(postEntry);

// ROUTE - /:id
// POST - /entries/:id - param id
router.route("/:id").put(putEntry);

module.exports = router;
