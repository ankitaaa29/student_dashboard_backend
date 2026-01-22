const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const scheduleRoutes = require("./routes/schedule");

const app = express();

// ✅ Correct CORS for both localhost + Vercel
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://student-task-manager-snowy.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/schedule", scheduleRoutes);
app.use("/api/admin", require("./routes/admin"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/goals", require("./routes/goals"));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
