const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Note", NoteSchema);
