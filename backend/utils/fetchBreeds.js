/* Script to populate the database with Petfinder breeds */

require('dotenv').config();
const axios = require('axios');
const pool = require('../db');

// Fetch Petfinder API token
async function getAccessToken() {
    try {
        const response = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
            grant_type: "client_credentials",
            client_id: process.env.PETFINDER_API_KEY,
            client_secret: process.env.PETFINDER_API_SECRET
        });
        return response.data.access_token;
    } catch (err) {
        console.error("ERROR: Failed to get API token", err.message);
        throw err;
    }
}

// Fetch breeds from Petfinder API
async function fetchBreeds() {
    try {
        const token = await getAccessToken();
        console.log("Fetching breeds from Petfinder...");

        const response = await axios.get('https://api.petfinder.com/v2/types/dog/breeds', {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.data.breeds) {
            throw new Error("ERROR: API did not return breeds.");
        }

        console.log(`Retrieved ${response.data.breeds.length} breeds.`);
        return response.data.breeds;
    } catch (err) {
        console.error("ERROR: Fetching breeds failed.", err.message);
        throw err;
    }
}

// Update breeds in the database
async function updateBreeds() {
    try {
        console.log("Updating breeds in the database...");

        // Fetch new breeds from API
        const breeds = await fetchBreeds();

        // Clear old breeds
        await pool.query(`DELETE FROM breeds`);
        console.log("Old breeds removed.");

        // Insert new breeds
        for (const breed of breeds) {
            await pool.query(
                `INSERT INTO breeds (breed_name) VALUES ($1) ON CONFLICT (breed_name) DO NOTHING`,
                [breed.name]
            );
        }

        console.log("Breeds successfully updated in the database.");
        process.exit(); // Exit script after completion
    } catch (err) {
        console.error("ERROR: Updating breeds failed.", err.message);
        process.exit(1);
    }
}

// Run the update function periodically (every 24 hours)
setInterval(updateBreeds, 24 * 60 * 60 * 1000);

// Run immediately when script is started
updateBreeds();
