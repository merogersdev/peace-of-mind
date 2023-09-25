// Knex
const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig);

// GET - Get all Entries for that user
const getEntries = async (req, res) => {
  const { id } = req.user;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "No user specified" });
  }

  try {
    const entries = await db("entries").where("user_id", "=", id);

    // If no entries for user, return empty array
    if (entries === undefined) {
      return res.json({ success: true, entries: [] });
    }
    // If entries, return entry objects in array

    return res.json({ success: true, entries });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Failed to retrieve entries" });
  }
};

// POST - Add New Entry
const postEntry = async (req, res) => {
  const { title, gratitude, entry } = req.body;
  const { id } = req.user;

  // Check for data and user id, else return
  if (!title || !gratitude || !entry || !id) {
    return res.status(400).json({
      success: false,
      message: "Invalid entry",
    });
  }

  try {
    await db("entries").insert({
      user_id: req.user.id,
      title,
      gratitude,
      entry,
    });
    res
      .status(201)
      .json({ success: true, message: "Entry posted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error creating entry" });
  }
  return null;
};

// PATCH - Update Entry
const patchEntry = async (req, res) => {
  const { id } = req.params;
  const { title, gratitude, entry } = req.body;

  if (!id || !title || !gratitude || !entry) {
    return res.status(400).json({ success: false, message: "Invalid entry" });
  }

  const entryExists = await db("entries").where({ id }).first();

  // If no entry by that ID, return failure
  if (!entryExists)
    return res
      .status(401)
      .json({ success: false, message: "Entry does not exist" });

  // Make sure user is authorized to update resource
  if (entryExists.user_id !== req.user.id)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized to update resource" });

  // Have to use old promise syntax, as Knex doesn't like try/catch for some reason...
  db("entries")
    .where({ id })
    .select({ title, gratitude, entry })
    .update({
      title,
      gratitude,
      entry,
    })
    .catch((error) =>
      res.status(400).json({
        success: false,
        message: "Could not update entry",
        error: error.message,
      })
    );

  // Return success status
  return res.status(200).json({
    success: true,
    message: "Entry updated successfully",
  });
};

// DELETE - Delete Entry

const deleteEntry = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "No entry specified" });
  }

  try {
    const entry = await db("entries").where({ id }).first();

    // If no entry with that ID, error

    if (entry === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "Entry does not exist" });
    }

    // Make sure user deleting is author
    if (entry.user_id !== req.user.id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized to delete entry" });
    }

    await db("entries").where({ id }).del();

    return res
      .status(200)
      .json({ success: true, message: "Entry deleted successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Failed to delete entry" });
  }
};

module.exports = { getEntries, postEntry, patchEntry, deleteEntry };
