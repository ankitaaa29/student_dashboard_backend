const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const User = require("../models/User");
const Task = require("../models/task");
const Note = require("../models/Note");
const Goal = require("../models/Goal");

router.get("/dashboard", auth, admin, async (req, res) => {
  const users = await User.find().select("-password");
  const tasks = await Task.find();
  const notes = await Note.find();
  const goals = await Goal.find();

  res.json({
    usersCount: users.length,
    tasksCount: tasks.length,
    notesCount: notes.length,
    goalsCount: goals.length,
    users,
  });
});

module.exports = router;
