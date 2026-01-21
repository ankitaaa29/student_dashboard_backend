const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const scheduleRoutes = require("./routes/schedule");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "*",
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

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
