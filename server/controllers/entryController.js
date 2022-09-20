// Knex
const knex = require("knex");
const knexConfig = require("../knexfile.js");
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
    const entries = await db("entries");

    // If no entries for user, return empty array
    if (entries === undefined) {
      return res.json({ success: true, entries: [] });
    }
    // If entries, return entry objects in array
    return res.json({ success: true, entries: entries });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Failed to retrieve entries" });
  }
};

// POST - Add New Entry
const postEntry = async (req, res) => {
  const { description, entry } = req.body;
  const { id } = req.user;

  // Check for data and user id, else return
  if (!description || !entry || !id) {
    return res.status(400).json({
      success: false,
      message: "Invalid entry",
    });
  }

  try {
    await db("entries").insert({
      user_id: req.user.id,
      description: description,
      entry: entry,
    });
    res.status(201).json({ message: "post entry" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error creating entry" });
  }
};

// PATCH - Update Entry
const patchEntry = async (req, res) => {
  const { id } = req.params;
  const { description, entry } = req.body;

  if (!id || !description || !entry) {
    return res.status(400).json({ success: false, message: "Invalid entry" });
  }

  try {
    const entry = await db("entries").where({ id: id }).first();

    // Make sure that user patching is author
    if (entry.user_id !== req.user.id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized to update entry" });
    }
    const updatedEntry = await db("entries").where({ id: id }).update({
      description: description,
      entry: entry,
    });
    return res.status(200).json({
      success: true,
      message: "Entry updated successfully",
      entry: updatedEntry,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Could not update entry" });
  }
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
    const entry = await db("entries").where({ id: id }).first();

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

    await db("entries").where({ id: id }).del();

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
