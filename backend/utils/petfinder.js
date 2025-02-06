/* Script to retrieve API Token automatically */

const axios = require('axios');
require('dotenv').config();

let petfinderToken = null;
let tokenExpiration = null;

/**
 * Function to fetch a new access token from Petfinder API.
 */
async function fetchPetfinderToken(retries = 3) {
    try {
        console.log("Fetching new Petfinder API token...");

        const response = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
            grant_type: 'client_credentials',
            client_id: process.env.PETFINDER_API_KEY,
            client_secret: process.env.PETFINDER_API_SECRET
        });

        petfinderToken = response.data.access_token;
        tokenExpiration = Date.now() + response.data.expires_in * 1000; // Convert seconds to milliseconds

        console.log("Petfinder API Token acquired successfully.");
        console.log("Token expires at:", new Date(tokenExpiration).toLocaleString());

        return petfinderToken;
    } catch (error) {
        console.error("ERROR: Fetching Petfinder token failed.");
        console.error(error.response?.data || error.message);
        
        if (retries > 0) {
            console.log(`Retrying in 3 seconds... (${retries} retries left)`);
            await new Promise(resolve => setTimeout(resolve, 3000));
            return fetchPetfinderToken(retries - 1);
        }
        
        throw new Error("Failed to retrieve Petfinder API token");
    }
}

/**
 * Function to get a valid access token, refreshing it if necessary.
 */
async function getPetfinderToken() {
    if (petfinderToken && Date.now() < tokenExpiration) {
        console.log("Using cached Petfinder API token");
        return petfinderToken;
    }
    return await fetchPetfinderToken();
}

module.exports = getPetfinderToken;




