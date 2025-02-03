const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// Updated CORS configuration
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow all standard HTTP methods
    credentials: true // Allow cookies/auth headers
}));

app.use(express.json());

// Connect to PostgreSQL only in non-test mode
if (process.env.NODE_ENV !== "test") {
    pool.connect()
        .then(() => console.log("Connected to PostgreSQL"))
        .catch(err => console.error("PostgreSQL connection error:", err));
}

// Import routes (Only require once)
const authRoutes = require("./routes/auth");
const breedRoutes = require("./routes/breeds");
const dogRoutes = require("./routes/dogs");
const userRoutes = require("./routes/users");

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/breeds", breedRoutes);
app.use("/api/dogs", dogRoutes);
app.use("/api/users", userRoutes);

// Default route
app.get("/", (req, res) => {
    res.json({ message: "API is running!" });
});

// Prevent Jest from launching a real server
if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} else {
    module.exports = app;  // Export app for testing
}
