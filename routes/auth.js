const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hash });

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json("Invalid credentials");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "SECRETKEY"
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
