const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ===== CORS: ALLOW ALL ORIGINS & ALL PATHS ===== */
app.use(cors({
  origin: true, // 🔥 allow all origins dynamically
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // safe with origin:true
}));

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
