/* Configuration of Database Connection - This page manages Postgres connections. */

const dotenv = require('dotenv');

if (process.env.NODE_ENV === "test") {
    console.log("Test mode detected - Loading .env.test...");
    dotenv.config({ path: ".env.test" });
} else {
    dotenv.config();
}

const { Pool } = require('pg');

// Handle production vs development database URLs
const connectionString = process.env.NODE_ENV === "production"
    ? process.env.PROD_DATABASE_URL  // Use Supabase DB URL in production
    : process.env.DATABASE_URL;     // Use local DB URL in development

if (!connectionString) {
    console.error("DATABASE_URL is missing in .env or .env.test!");
    console.error("DATABASE_URL or PROD_DATABASE_URL is missing in .env or .env.test!");
    console.log("Current ENV:", process.env.NODE_ENV);
    console.log("Available ENV Vars:", process.env);
    process.exit(1);
}

const pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

// Prevent multiple connections in tests
if (process.env.NODE_ENV !== "test") {
    (async () => {
        try {
            const result = await pool.query(`SELECT current_database()`);
            console.log(`Connected to database: ${result.rows[0].current_database}`);
        } catch (err) {
            console.error("Database connection error:", err.message);
        }
    })();
}

module.exports = pool;
