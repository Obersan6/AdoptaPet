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
const { Pool } = require("pg");
const app = express();

// CORS Configuration
const allowedProdOrigins = [
    "https://adoptapet-wk33.onrender.com",  // Frontend deployed URL
    "http://localhost:5173",  // Local development
    "http://localhost:4173"   // Vite preview
];

const corsOptions = {
    origin: function (origin, callback) {
        console.log(`Incoming request from origin: ${origin}`);
        
        // Allow requests with no origin (Postman, mobile apps, etc.)
        if (!origin || allowedProdOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// PostgreSQL Client Pool Setup
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" 
        ? { require: true, rejectUnauthorized: false } 
        : false
});

// Connect to PostgreSQL (skip if testing)
if (process.env.NODE_ENV !== "test") {
    pool.connect()
        .then(() => console.log("Connected to PostgreSQL"))
        .catch(err => console.error("PostgreSQL connection error:", err));
}

// Import and Register Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/breeds", require("./routes/breeds"));
app.use("/api/dogs", require("./routes/dogs"));
app.use("/api/users", require("./routes/users"));

// Default Route
app.get("/", (req, res) => {
    res.json({ message: "API is running!" });
});

// Start Server (Render dynamically assigns PORT)
if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} else {
    module.exports = app;  // Export for testing
}

