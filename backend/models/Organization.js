/* Organization model */

require('dotenv').config();
const pool = require('../db');

class Organization {
    static async getAll() {
        const result = await pool.query(`SELECT * FROM organizations`);
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query(`SELECT * FROM organizations WHERE id=$1`, [id]);
        return result.rows[0];
    }
}

module.exports = Organization;