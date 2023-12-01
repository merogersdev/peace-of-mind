const pool = require("../config/db");

// GET - Get all Entries for that user
const allEntryHandler = async (req, res) => {
  const { id } = req.user;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Error: No User ID" });
  }

  try {
    const entries = await pool.query(
      "SELECT * FROM entries WHERE user_id = $1",
      [id]
    );

    // If no entries for user, return empty array
    if (entries.rows[0] === undefined) {
      return res.status(200).json({ success: true, entries: [] });
    }
    // If entries, return entry objects in array

    return res.status(200).json({ success: true, entries: entries.rows[0] });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Failed to retrieve entries" });
  }
};

const entryDetailsHandler = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Error: Missing Entry ID" });
  }

  try {
    const entryExists = await pool.query("SELECT * entries WHERE id = $1", [
      id,
    ]);

    if (entryExists.rows[0] === undefined) {
      return res
        .status(404)
        .json({ success: false, message: "Error: No entry found" });
    }

    if (entryExists.rows[0].id !== id) {
      return res
        .status(403)
        .json({ success: false, message: "Error: Unauthorized" });
    }

    return res.status(200).json({
      success: true,
      message: "Entry Details",
      entry: entryExists,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get entry details",
      error: error.message,
    });
  }
};

const newEntryHandler = async (req, res) => {
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
    const newEntry = await pool.query(
      "INSERT INTO entries(user_id, title, gratitude, entry) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, title, gratitude, entry]
    );

    return res.status(201).json({
      success: true,
      message: "Entry posted successfully",
      entry: newEntry,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Entry Creation failed",
      error: error.message,
    });
  }
};

const updateEntryHandler = async (req, res) => {
  const { id } = req.params;
  const { title, gratitude, entry } = req.body;

  if (!id || !title || !gratitude || !entry) {
    return res
      .status(400)
      .json({ success: false, message: "Error: Missing fields" });
  }

  try {
    const entryExists = await pool.query(
      "SELECT * FROM entries WHERE id = $1",
      [id]
    );

    if (entryExists.rows[0] === undefined)
      return res
        .status(404)
        .json({ success: false, message: "Error: No entry found" });

    if (entryExists.rows[0].user_id !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Error: Unauthorized" });
    }

    const updatedEntry = await pool.query(
      "UPDATE entries SET title = $1, gratitude = $2, entry = $3 WHERE id = $4 RETURNING *",
      [title, gratitude, entry, id]
    );
    return res.status(200).json({
      success: true,
      message: "Entry updated successfully",
      entry: updatedEntry,
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

const deleteEntryHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const entryExists = await pool.query(
      "SELECT * FROM entries WHERE id = $1",
      [id]
    );

    if (entryExists.rows[0] === undefined)
      return res
        .status(404)
        .json({ success: false, message: "Entry does not exist" });

    if (entryExists.rows[0].user_id !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Error: Unauthorized" });
    }

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

module.exports = {
  allEntryHandler,
  entryDetailsHandler,
  newEntryHandler,
  updateEntryHandler,
  deleteEntryHandler,
};
