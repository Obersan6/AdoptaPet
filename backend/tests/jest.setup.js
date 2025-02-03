require('dotenv').config({ path: '.env.test' });

console.log("Jest setup loaded");
console.log("TEST_DATABASE_URL:", process.env.TEST_DATABASE_URL);
console.log("PETFINDER_API_KEY:", process.env.PETFINDER_API_KEY);
console.log("PETFINDER_API_SECRET:", process.env.PETFINDER_API_SECRET);

const pool = require('../db');

// Ensure we close the database only once
afterAll(async () => {
    console.log("Closing database connection...");
    if (!pool._ending) {
        await pool.end();
    }
});


