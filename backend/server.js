// const express = require("express");
// const cors = require("cors");
// const pool = require("./db");
// const cors = require('cors');

// const app = express();

// // Updated CORS configuration
// // app.use(cors({
// //     origin: "http://localhost:5173", // Allow requests from frontend
// //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow all standard HTTP methods
// //     credentials: true // Allow cookies/auth headers
// // }));

// const allowedOrigins = ["http://localhost:5173", "http://localhost:4173"];

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (process.env.NODE_ENV === "production") {
//             callback(null, "https://your-deployed-frontend.vercel.app"); // Replace with your production frontend URL
//         } else if (allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true
// };

// app.use(cors(corsOptions));



// app.use(express.json());

// // Connect to PostgreSQL only in non-test mode
// if (process.env.NODE_ENV !== "test") {
//     pool.connect()
//         .then(() => console.log("Connected to PostgreSQL"))
//         .catch(err => console.error("PostgreSQL connection error:", err));
// }

// // Import routes (Only require once)
// const authRoutes = require("./routes/auth");
// const breedRoutes = require("./routes/breeds");
// const dogRoutes = require("./routes/dogs");
// const userRoutes = require("./routes/users");

// // Register routes
// app.use("/api/auth", authRoutes);
// app.use("/api/breeds", breedRoutes);
// app.use("/api/dogs", dogRoutes);
// app.use("/api/users", userRoutes);

// // Default route
// app.get("/", (req, res) => {
//     res.json({ message: "API is running!" });
// });

// // Prevent Jest from launching a real server
// if (process.env.NODE_ENV !== "test") {
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// } else {
//     module.exports = app;  // Export app for testing
// }

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();  // Initialize express before using it

// CORS Configuration
const allowedDevOrigins = ["http://localhost:5173", "http://localhost:4173"];
const allowedProdOrigin = "https://your-deployed-frontend.vercel.app"; // Replace with your actual deployed frontend URL

const corsOptions = {
    origin: function (origin, callback) {
        console.log(`Incoming request from origin: ${origin}`);

        if (process.env.NODE_ENV === "production") {
            // Allow localhost for testing in production mode
            if (allowedDevOrigins.includes(origin) || origin === allowedProdOrigin) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS (production)"));
            }
        } else {
            if (allowedDevOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS (development)"));
            }
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true
};

// Apply CORS Middleware before defining routes
app.use(cors(corsOptions));
app.use(express.json());

// Connect to PostgreSQL only in non-test mode
if (process.env.NODE_ENV !== "test") {
    pool.connect()
        .then(() => console.log("Connected to PostgreSQL"))
        .catch(err => console.error("PostgreSQL connection error:", err));
}

// Import routes
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
