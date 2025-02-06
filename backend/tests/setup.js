/* Set up the Test db before each test */

const pool = require('../db');

async function resetDatabase() {
    await pool.query(`DELETE FROM users`);
    await pool.query(`DELETE FROM dogs`);
    await pool.query(`DELETE FROM breeds`);

    // Re-seed basic test data
    await pool.query(`INSERT INTO breeds (breed_name) VALUES ('Labrador Retriever'), ('Golden Retriever'), ('Bulldog')`);
}

beforeEach(async () => {
    await resetDatabase();
});

afterAll(async () => {
    await pool.end();
});
