
require("dotenv").config();
const axios = require("axios");

const API_URL = "http://localhost:5000/api/breeds/25";  // Ensure this is a valid breed ID
const TOKEN = "your_real_access_token_here"; // 🔹 Replace with the actual token from test-petfinder.js

async function testBreedAPI() {
    try {
        console.log("Testing Breeds API...");
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${TOKEN}` }, // Uses a valid token
        });

        console.log("Breed API Response:", response.data);
    } catch (error) {
        console.error("ERROR: Breeds API failed!", error.response?.data || error.message);
    }
}

testBreedAPI();
