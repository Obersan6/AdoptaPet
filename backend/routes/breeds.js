/* Breed routes */

const express = require('express');
const Breed = require('../models/Breed');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateJWT, async (req, res) => {
    try {
        console.log("Fetching breeds...");

        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit; // Calculate offset for pagination

        const breeds = await Breed.getAll(limit, offset);

        if (!breeds || breeds.length === 0) {
            return res.status(404).json({ error: "No breeds found" });
        }

        res.json({ breeds, page, limit });
    } catch (err) {
        console.error("Breeds Fetch Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
