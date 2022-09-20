// GET - Get all Entries
const getEntries = (_req,res) => {
  res.json({ message: "get entries" })
}

// POST - Add New Entry
const postEntry = (_req,res) => {
  res.json({ message: "post entry" })
}

// PUT - Update Entry
const putEntry = (req,res) => {
  res.json({ message: "put entry", id: req.params.id })
}

module.exports = { getEntries, postEntry, putEntry };