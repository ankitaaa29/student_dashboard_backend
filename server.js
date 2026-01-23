const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ===== CORS CONFIG (VERY IMPORTANT) =====
app.use(
 cors({
    origin: [
     "http://localhost:5173", // local frontend
     "https://student-task-manager-snowy.vercel.app" // vercel frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// Body parser
app.use(express.json());

// ===== ROUTES =====
app.use("/api/schedule", require("./routes/schedule"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/goals", require("./routes/goals"));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// ===== DATABASE =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
