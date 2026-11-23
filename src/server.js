require("dotenv").config();

const express = require("express");
const cors = require("cors");

const pool = require("./config/db");
const studentRoutes = require("./routes/student.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health-check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management API is running",
  });
});

// Register student routes
app.use("/api/students", studentRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server after checking the database connection
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await pool.query("SELECT 1");

    console.log("MySQL connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MySQL:", error.message);
    process.exit(1);
  }
}

startServer();
