/* Configuration of Database Connection - This page manages Postgres connections. */



const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Select connection string based on environment
const connectionString = process.env.NODE_ENV === "production"
    ? process.env.PROD_DATABASE_URL  // Supabase for production
    : process.env.DATABASE_URL;     // Local DB for development

if (!connectionString) {
    console.error("DATABASE_URL or PROD_DATABASE_URL is missing!");
    process.exit(1);
}

const pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === "production" 
        ? { require: true, rejectUnauthorized: false } 
        : false
});

module.exports = pool;
