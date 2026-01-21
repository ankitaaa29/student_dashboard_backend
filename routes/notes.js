const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Note = require("../models/Note");

// Get notes
router.get("/", auth, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

// Add note
router.post("/", auth, async (req, res) => {
  const newNote = new Note({
    text: req.body.text,
    user: req.user.id
  });

  const saved = await newNote.save();
  res.json(saved);
});

// Delete note
router.delete("/:id", auth, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
