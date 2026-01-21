const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

// Get tasks of logged-in user
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

// Add new task for logged-in user
router.post("/", auth, async (req, res) => {
  const newTask = new Task({
    text: req.body.text,
    completed: req.body.completed,
    category: req.body.category,
    dueDate: req.body.dueDate,
    user: req.user.id   // very important
  });

  await newTask.save();
  res.json(newTask);
});

// Delete only user's task
router.delete("/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ success: true });
});

// Update only user's task
router.put("/:id", auth, async (req, res) => {
  const updated = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});

module.exports = router;
