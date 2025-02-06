/* Tests for Breeds API */

const request = require("supertest");
const app = require("../server");
const pool = require("../db");

// Mock the Breed model to prevent real API calls
jest.mock("../models/Breed", () => ({
    getAll: jest.fn().mockResolvedValue([
        { breed_name: "Labrador Retriever" },
        { breed_name: "German Shepherd" },
        { breed_name: "Golden Retriever" },
    ]),
    findById: jest.fn().mockResolvedValue({ breed_name: "Labrador Retriever" }),
}));

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

    
    const res = await request(server).post("/api/auth/login").send({
        username: "testuser",  
        password: "Testpassword123",
    });

    token = res.body.token;
    console.log("Received Token:", token); // Debugging

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

describe("Breeds API", () => {
    test("Should return all breeds", async () => {
        console.log("Using token:", token); // Debugging

        const response = await request(server)
            .get("/api/breeds")
            .set("Authorization", `Bearer ${token}`);

        console.log("All Breeds API Response:", response.body); // Debugging

        expect(response.statusCode).toBe(200);
        expect(response.body.breeds.length).toBeGreaterThan(0);
    });
});
