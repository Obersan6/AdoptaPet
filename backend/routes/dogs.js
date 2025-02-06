/* Dog routes */

const express = require('express');
const Dog = require('../models/Dog');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

// New route: Find dogs by location or breed
router.get('/search', authenticateJWT, async (req, res) => {
    try {
        const { location, breed } = req.query;

        if (!location && !breed) {
            return res.status(400).json({ error: "Please provide either a location or breed for searching." });
        }

        if (location && !location.includes(",")) {
            return res.status(400).json({ error: "Invalid location format. Use 'City, State'." });
        }

        // Ensure authentication is working
        console.log("Authenticated User:", req.user);

        const result = await Dog.getFilteredDogs(
            { location, breed },
            1, // No pagination needed
            50 // Fetch up to 50 results
        );

        if (result.dogs.length === 0) {
            return res.status(404).json({ error: "No dogs found for your search." });
        }

        res.json({ dogs: result.dogs });
    } catch (err) {
        console.error("Error in /dogs/search:", err.message);
        res.status(500).json({ error: "Internal Server Error. Please try again later." });
    }
});

// Get all dogs with optional filters, pagination, and sorting (must be logged in)
router.get('/', authenticateJWT, async (req, res) => {
    try {
        const { breed, age, gender, size, location, page, limit, sort } = req.query;

        const result = await Dog.getFilteredDogs(
            { breed, age, gender, size, location },
            parseInt(page) || 1,
            parseInt(limit) || 10,
            sort || 'name' // Default sorting by name
        );

        if (result.dogs.length === 0) {
            return res.status(404).json({ error: "No dogs found matching your criteria" });
        }

        res.json({
            dogs: result.dogs,
            pagination: {
                totalPages: result.totalPages,
                currentPage: result.currentPage,
                perPage: limit || 10
            },
            sort: sort || 'name'
        });
    } catch (err) {
        console.error("Error fetching dogs:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get('/:id', authenticateJWT, async (req, res) => {
    try {
        console.log("🔍 Fetching dog with ID:", req.params.id); // Log incoming request
        const dog = await Dog.findById(req.params.id);

        if (!dog) {
            return res.status(404).json({ error: "Dog not found" });
        }

        res.json(dog);
    } catch (err) {
        console.error("Error fetching dog by ID:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;




