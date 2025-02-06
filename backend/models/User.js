/* User model */

const pool = require('../db');

class User {
    // Find user by username
    static async findByUsername(username) {
        const result = await pool.query(
            `SELECT * FROM users WHERE username = $1`, [username]
        );
    
        console.log("Database query result for username:", username, "=>", result.rows);
    
        return result.rows[0]; // Ensure it returns the first row
    }
    
    static async findById(userId) {
        try {
            const result = await pool.query(
                `SELECT id, username, first_name, last_name, email, profile_image FROM users WHERE id = $1`, 
                [userId]
            );
    
            if (result.rows.length === 0) {
                return null;
            }
    
            return result.rows[0];
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw new Error("Database error while fetching user");
        }
    }

    static async updateProfile(id, firstName, lastName) {
        try {
            const result = await pool.query(
                `UPDATE users
                 SET first_name = $1, last_name = $2
                 WHERE id = $3
                 RETURNING id, username, first_name, last_name`,
                [firstName, lastName, id]
            );
    
            if (result.rows.length === 0) {
                throw new Error("User not found");
            }
    
            return result.rows[0]; // Return only relevant user info
        } catch (error) {
            console.error("Error updating profile:", error);
            throw new Error("Database error while updating profile");
        }
    }
    
    // Create a new user
    static async create(username, firstName, lastName, email, password, profileImage) {
        const result = await pool.query(
            `INSERT INTO users (username, first_name, last_name, email, password, profile_image)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, first_name, last_name, email, profile_image`,
            [username, firstName, lastName, email, password, profileImage]
        );
        return result.rows[0];
    }

    static async deleteUser(id) {
        try {
            const result = await pool.query(
                `DELETE FROM users WHERE id = $1 RETURNING id`,
                [id]
            );
    
            if (result.rows.length === 0) {
                throw new Error("User not found");
            }
    
            return result.rows[0]; // Return deleted user's ID
        } catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Database error while deleting user");
        }
    }
    
}

module.exports = User;

