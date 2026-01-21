const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.json(goals);
});

router.post("/", auth, async (req, res) => {
  const goal = new Goal({ text: req.body.text, user: req.user.id });
  await goal.save();
  res.json(goal);
});

router.put("/:id", auth, async (req, res) => {
  const goal = await Goal.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  res.json(goal);
});

router.delete("/:id", auth, async (req, res) => {
  await Goal.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ success: true });
});

module.exports = router;
