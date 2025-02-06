/* User routes */

const express = require('express');
const User = require('../models/User');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

// Get user profile (Must be logged in)
router.get('/:id', authenticateJWT, async (req, res) => {
    try {
        if (req.user.id !== Number(req.params.id)) {
            return res.status(403).json({ error: "Unauthorized" });
        }
        
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch('/:id', authenticateJWT, async (req, res) => {
    try {
        if (req.user.id !== Number(req.params.id)) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const { firstName, lastName } = req.body;
        const updatedUser = await User.updateProfile(req.params.id, firstName, lastName);
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        if (req.user.id !== Number(req.params.id)) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const response = await User.deleteUser(req.params.id);
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
