const pool = require("../config/db");

// GET - Get all Entries for that user
const getEntries = async (req, res) => {
  const { id } = req.user;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "No user specified" });
  }

  try {
    const entries = await pool.query(
      "SELECT * FROM entries WHERE user_id = $1",
      [id]
    );

    // If no entries for user, return empty array
    if (entries.rows[0] === undefined) {
      return res.json({ success: true, entries: [] });
    }
    // If entries, return entry objects in array

    return res.json({ success: true, entries: entries.rows[0] });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Failed to retrieve entries" });
  }
};

// POST - Add New Entry
const postEntry = async (req, res) => {
  const { title, gratitude, entry } = req.body;
  const id = 1;

  // Check for data and user id, else return
  if (!title || !gratitude || !entry || !id) {
    return res.status(400).json({
      success: false,
      message: "Invalid entry",
    });
  }

  try {
    await pool.query(
      "INSERT INTO entries(user_id, title, gratitude, entry) VALUES ($1, $2, $3, $4)",
      [id, title, gratitude, entry]
    );

    return res
      .status(201)
      .json({ success: true, message: "Entry posted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Entry Creation failed",
      error: error.message,
    });
  }
};

// PATCH - Update Entry
const patchEntry = async (req, res) => {
  const { id } = req.params;
  const { title, gratitude, entry } = req.body;

  if (!id || !title || !gratitude || !entry) {
    return res.status(400).json({ success: false, message: "Invalid entry" });
  }

  try {
    const selectedEntry = await pool.query(
      "SELECT * FROM entries WHERE id = $1",
      [id]
    );

    if (selectedEntry.row[0] === null)
      return res
        .status(404)
        .json({ success: false, message: "Entry does not exist" });

    if (selectedEntry.rows[0].user_id !== req.user.id)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized to update resource" });

    await pool.query(
      "UPDATE entries SET title = $1, gratitude = $2, entry = $3 WHERE id = $4",
      [title, gratitude, entry, id]
    );
    return res.status(200).json({
      success: true,
      message: "Entry updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Entry Update failed",
      error: error.message,
    });
  }
};

// DELETE - Delete Entry

const deleteEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const selectedEntry = await pool.query(
      "SELECT * FROM entries WHERE id = $1",
      [id]
    );

    if (selectedEntry.row[0] === null)
      return res
        .status(404)
        .json({ success: false, message: "Entry does not exist" });

    if (selectedEntry.rows[0].user_id !== req.user.id)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized to update resource" });

    await pool.query("DELETE FROM entries WHERE id = $1", [id]);

    return res
      .status(200)
      .json({ success: true, message: "Entry deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Entry Update failed",
      error: error.message,
    });
  }
};

module.exports = { getEntries, postEntry, patchEntry, deleteEntry };
