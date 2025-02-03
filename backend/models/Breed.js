/* Breed model */

require('dotenv').config();
const pool = require('../db');
const axios = require("axios");
const getPetfinderToken = require("../utils/petfinder"); // Use the centralized token handler

class Breed {
    // Get all breeds with optional filters, pagination, and sorting
    static async getAll() {
        try {
            console.log("Fetching breeds from Petfinder API...");
            const token = await getPetfinderToken(); // Use the token manager

            const response = await axios.get("https://api.petfinder.com/v2/types/dog/breeds?", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.data.breeds) {
                throw new Error("API did not return breeds");
            }

            console.log("Breeds retrieved successfully.");
            return response.data.breeds.map(breed => ({ breed_name: breed.name })); 

        } catch (error) {
            console.error("ERROR: Fetching breeds failed:", error.message);
            throw new Error("Could not retrieve breeds");
        }
    }

    // Fetch a single breed by ID from the database
    static async findById(id) {
        const result = await pool.query(`SELECT * FROM breeds WHERE id = $1`, [id]);
        return result.rows[0];
    }
}

module.exports = Breed;





