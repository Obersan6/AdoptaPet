require('dotenv').config({ path: '.env.test' }); // Load test env

const axios = require('axios');

async function testPetfinderAuth() {
    console.log("Testing Petfinder API authentication...");
    console.log("PETFINDER_API_KEY:", process.env.PETFINDER_API_KEY);
    console.log("PETFINDER_API_SECRET:", process.env.PETFINDER_API_SECRET);

    try {
        const response = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
            grant_type: "client_credentials",
            client_id: process.env.PETFINDER_API_KEY,
            client_secret: process.env.PETFINDER_API_SECRET
        });

        console.log("SUCCESS! Petfinder API Token received:");
        console.log(response.data);
    } catch (error) {
        console.error("ERROR: Petfinder API authentication failed!");
        console.error(error.response ? error.response.data : error.message);
    }
}

testPetfinderAuth();
