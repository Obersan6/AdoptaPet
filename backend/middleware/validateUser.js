/* Validation parameters for User:

- Username must be unique and at least 3 characters long.
- Email must be unique and valid.
- Password must be at least 8 characters long and contain at least one number & one uppercase letter.

If errors exist, the request is rejected with a 400 Bad Request response.*/



const { body, validationResult } = require('express-validator');
const pool = require('../db');

const validateUserSignup = [
    body('username')
        .trim()
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .custom(async (username) => {
            const result = await pool.query(`SELECT id FROM users WHERE username = $1`, [username]);
            if (result.rows.length > 0) {
                throw new Error('Username is already taken');
            }
        }),

    body('email')
        .trim()
        .isEmail().withMessage('Invalid email format')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).withMessage('Email must contain "." after domain')
        .custom(async (email) => {
            const result = await pool.query(`SELECT id FROM users WHERE email = $1`, [email]);
            if (result.rows.length > 0) {
                throw new Error('Email is already registered');
            }
        }),

    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter'),
        

    (req, res, next) => {
        console.log("🔍 Validating signup request:", req.body);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.error("Validation errors:", errors.array());
            return res.status(400).json({ errors: errors.array() }); 
        }
        next(); // Proceed if no errors
    }
];

module.exports = { validateUserSignup };
