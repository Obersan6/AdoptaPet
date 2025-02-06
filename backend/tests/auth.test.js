 /* Authentication tests */

const request = require("supertest");
const app = require("../server");
const pool = require("../db");
const bcrypt = require("bcrypt");

let server;
let token;

beforeAll(async () => {
    server = app.listen(0); // Start a test server dynamically on any available port

    await pool.query(`DELETE FROM users`); // Clear previous test data

    // Hash password before inserting (meets password validation rules)
    const hashedPassword = await bcrypt.hash("Testpassword123", 10);
    await pool.query(
        `INSERT INTO users (username, first_name, last_name, email, password) 
         VALUES ('testuser', 'Test', 'User', 'test@example.com', $1)`,
        [hashedPassword]
    );

    // Login user to get a token for protected routes
    const res = await request(server).post("/api/auth/login").send({
        username: "testuser",  
        password: "Testpassword123",
    });

    token = res.body.token;
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

describe("User Authentication", () => {
    test("Signup: Should create a new user", async () => {
        const response = await request(server).post("/api/auth/signup").send({
            username: "testuser2", // Avoid conflict with pre-inserted testuser
            firstName: "New",  
            lastName: "User",  
            email: "new@example.com",
            password: "ValidPass123",  // Meets validation (8 chars, 1 number, 1 uppercase)
        });

        console.log("Signup response:", response.body); // Debugging log

        expect(response.statusCode).toBe(201);
        expect(response.body.token).toBeDefined();  // Ensures token exists
        expect(response.body.user).toHaveProperty("id");  // Ensures user object is present
    });

    test("Login: Should authenticate user", async () => {
        const response = await request(server).post("/api/auth/login").send({
            username: "testuser",  
            password: "Testpassword123",
        });

        console.log("Login response:", response.body); // Debugging log

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();  // Ensures token exists
    });

    test("Login: Should fail for wrong password", async () => {
        const response = await request(server).post("/api/auth/login").send({
            username: "testuser",
            password: "WrongPass123",
        });

        console.log("Failed login response:", response.body); // Debugging log

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Invalid username or password");
    });

    test("Login: Should fail for non-existing user", async () => {
        const response = await request(server).post("/api/auth/login").send({
            username: "nonexistentuser",
            password: "SomePassword123",
        });

        console.log("Non-existing user login response:", response.body); // Debugging log

        expect(response.statusCode).toBe(401);
        expect(response.body.error).toBe("Invalid username or password");
    });
});
