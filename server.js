const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

/* ===== FORCE CORS (FIXES PREFLIGHT 100%) ===== */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* ===== BODY PARSER ===== */
app.use(express.json());

/* ===== ROUTES ===== */
app.use("/api/schedule", require("./routes/schedule"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/goals", require("./routes/goals"));

/* ===== TEST ROUTE ===== */
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

/* ===== DATABASE ===== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

/* ===== START SERVER ===== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
