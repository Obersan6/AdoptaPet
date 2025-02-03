/* Test if script retrieves token */

require('dotenv').config();
const axios = require("axios");

const PETFINDER_API_KEY = process.env.PETFINDER_API_KEY;
const PETFINDER_API_SECRET = process.env.PETFINDER_API_SECRET;

console.log("Testing Petfinder API authentication...");
console.log("PETFINDER_API_KEY:", PETFINDER_API_KEY);
console.log("PETFINDER_API_SECRET:", PETFINDER_API_SECRET);

async function testAuth() {
    try {
        const response = await axios.post("https://api.petfinder.com/v2/oauth2/token", {
            grant_type: "client_credentials",
            client_id: PETFINDER_API_KEY,
            client_secret: PETFINDER_API_SECRET,
        });

        console.log("SUCCESS: Received API Token:", response.data.access_token);
    } catch (error) {
        console.error("ERROR: Petfinder API authentication failed!", error.response?.data || error.message);
    }
}

testAuth();

