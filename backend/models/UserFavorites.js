/* UserFavorites model */

require('dotenv').config();
const pool = require('../db');

class UserFavorites {
    // Add a favorite dog for a user
    static async add(userId, dogId) {
        const result = await pool.query(
            `INSERT INTO user_favorites (user_id, dog_id) VALUES ($1, $2)`,
            [userId, dogId]
        );
        return result.rows[0];
    }

    // Remove a favorite dog for a user
    static async remove(userId, dogId) {
        const result = await pool.query(
            `DELETE FROM user_favorites WHERE user_id = $1 AND dog_id = $2 RETURNING *`,
            [userId, dogId]
        );
        return result.rows[0];
    }

    // Get all favorite dogs for a user
    static async getFavorites(userId) {
        const result = await pool.query(
            `SELECT dogs.* FROM dogs
            JOIN user_favorites ON dogs.id = user_favorites.dog_id
            WHERE user_favorites.user_id = $1`,
            [userId]
        );
        return result.rows;
    }
}

module.exports = UserFavorites;