/* Test seed file for test db */

const pool = require('../db');

async function checkDatabase() {
    const result = await pool.query(`SELECT current_database()`);
    console.log("Connected to database:", result.rows[0].current_database);
}

async function seedTestDatabase() {
    try {
        console.log("Seeding test database...");
        await checkDatabase(); // Prints the active database

        // Clear tables before inserting new data
        await pool.query(`DELETE FROM users`);
        await pool.query(`DELETE FROM breeds`);

        // Insert sample users
        await pool.query(
            `INSERT INTO users (username, first_name, last_name, email, password) 
             VALUES ('testuser', 'Test', 'User', 'test@example.com', 'hashedpassword')`
        );

        // Insert sample breeds
        await pool.query(`INSERT INTO breeds (breed_name) VALUES ('Labrador Retriever'), ('Golden Retriever'), ('Bulldog')`);

        console.log("Test database seeded successfully!");
    } catch (err) {
        console.error("Error seeding test database:", err);
    } finally {
        pool.end();
    }
}

seedTestDatabase();
