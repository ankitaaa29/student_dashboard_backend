const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
  category: String,
  dueDate: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Task", taskSchema);
