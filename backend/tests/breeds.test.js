/* Tests for Breeds */

/* Tests for Breeds API */
const request = require("supertest");
const app = require("../server");
const pool = require("../db");

let server;
let token;
let breedId; // Store the actual inserted breed ID

beforeAll(async () => {
    server = app.listen(0);

    // Reset breeds table before each test
    await pool.query(`DELETE FROM breeds`);
    const result = await pool.query(
        `INSERT INTO breeds (breed_name) VALUES 
         ('Labrador Retriever'), ('German Shepherd'), ('Golden Retriever')
         RETURNING id, breed_name`
    );

    console.log("Inserted breeds:", result.rows); // Debugging

    // Login user to get a token
    const res = await request(server).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
    });

    token = res.body.token;

    // Get a real breed ID for the test
    breedId = result.rows[0].id;  // Pick the first inserted breed
});

afterAll(async () => {
    if (server) await server.close(); // Ensure the test server is properly closed

    // Prevent multiple calls to pool.end()
    if (pool && !pool._ending) {
        try {
            await pool.end();
        } catch (error) {
            console.error("Database pool closing error:", error.message);
        }
    }
});

// Add missing test cases
describe("Breeds API", () => {
    test("Should return all breeds", async () => {
        const response = await request(server)
            .get("/api/breeds")
            .set("Authorization", `Bearer ${token}`);

        // console.log("All Breeds API Response:", response.body); // Debugging

        expect(response.statusCode).toBe(200);
        expect(response.body.breeds.length).toBeGreaterThan(0);
    });

    test("Should return a single breed by ID", async () => {
        const response = await request(server)
            .get(`/api/breeds/${breedId}`) 
            .set("Authorization", `Bearer ${token}`);

        // console.log("Single Breed API Response:", response.body); // Debugging

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("breed_name");
    });

    test("Should return 404 for a non-existent breed", async () => {
        const response = await request(server)
            .get("/api/breeds/999") // Assuming this ID doesn't exist
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe("Breed not found");
    });
});
