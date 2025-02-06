/* Define authentiation for routes */

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateUserSignup } = require('../middleware/validateUser');

const router = express.Router();


router.post('/signup', validateUserSignup, async (req, res) => {  // Add validation middleware
    try {
        const { username, firstName, lastName, email, password, profileImage } = req.body;
        console.log("Signup request received:", req.body);

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create(username, firstName, lastName, email, hashedPassword, profileImage);

        console.log("Signup successful!", newUser);

        const token = jwt.sign(
            { id: newUser.id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({ token, user: newUser });

    } catch (err) {
        console.error("Signup Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});


// User Login (Authenticate with Username Instead of Email)
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Login attempt for username:", username);

        const user = await User.findByUsername(username);
        console.log("Database query result for username:", username, "=>", user);

        if (!user) {
            console.log("No user found with this username");
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log("Password comparison result:", isValidPassword);

        if (!isValidPassword) {
            console.log("Incorrect password");
            return res.status(401).json({ error: "Invalid username or password" });
        }

        console.log("Login successful! Generating token...");
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, user: { id: user.id, username: user.username } });
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
