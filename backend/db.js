/* Configuration of Database Connection - This page manages Postgres connections. */

const dotenv = require('dotenv');

// Load environment variables
if (process.env.NODE_ENV === "test") {
    console.log("Test mode detected - Loading .env.test...");
    dotenv.config({ path: ".env.test" });
} else {
    dotenv.config();
}

const { Pool } = require('pg');

// Select appropriate connection string
const connectionString = process.env.NODE_ENV === "production"
    ? process.env.PROD_DATABASE_URL  // Supabase connection for production
    : process.env.DATABASE_URL;     // Local database for development

// Validate connection string presence
if (!connectionString) {
    console.error("DATABASE_URL or PROD_DATABASE_URL is missing in the environment variables.");
    process.exit(1);
}

// Create database connection pool
const pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === "production" 
        ? { require: true, rejectUnauthorized: false }  // Force SSL in production
        : false
});

// Connect and verify database (skip in test mode)
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
