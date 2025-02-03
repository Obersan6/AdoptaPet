
/* User authentication */

const jwt = require('jsonwebtoken');

// Middleware to check if user is logged in and protect routes
function authenticateJWT(req, res, next) {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
        return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        console.log("Received Token:", req.headers.authorization); 
        next(); // Continue to next middleware or route handler
    } catch (err) {
        return res.status(403).json({ error: "Invalid token" });
    }
}

module.exports = authenticateJWT;
