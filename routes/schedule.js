const express = require("express");
const router = express.Router();
const Schedule = require("../models/Schedule");
const auth = require("../middleware/auth"); // JWT middleware

// GET schedule (logged in student)
router.get("/", auth, async (req, res) => {
  const schedule = await Schedule.find({ user: req.user.id });
  res.json(schedule);
});

// ADD schedule
router.post("/", auth, async (req, res) => {
  const { subject, day, startTime, endTime } = req.body;

  const newSchedule = new Schedule({
    subject,
    day,
    startTime,
    endTime,
    user: req.user.id
  });

  const saved = await newSchedule.save();
  res.json(saved);
});

// DELETE schedule
router.delete("/:id", auth, async (req, res) => {
  await Schedule.findByIdAndDelete(req.params.id);
  res.json({ msg: "Schedule deleted" });
});

module.exports = router;
