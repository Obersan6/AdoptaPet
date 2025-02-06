/* Test for Dogs API */

const request = require("supertest");
const app = require("../server");
const Dog = require("../models/Dog");

jest.mock("../models/Dog"); // Mock API calls to avoid real Petfinder requests

let server;
let token;

beforeAll(async () => {
    server = app.listen(0); // Start a test server dynamically

    // Login user to get a token
    const res = await request(server).post("/api/auth/login").send({
        username: "testuser",  
        password: "Testpassword123",
    });
    token = res.body.token;
});

afterAll(async () => {
    await server.close(); // Stop the test server
});

describe("Dogs API", () => {
    test("Get all dogs with filters", async () => {
        Dog.getFilteredDogs.mockResolvedValue({
            dogs: [
                { id: 1, name: "Buddy", age: "Young", breed: "Labrador" },
                { id: 2, name: "Max", age: "Adult", breed: "Golden Retriever" }
            ],
            totalPages: 1,
            currentPage: 1
        });

        const response = await request(server).get("/api/dogs")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.dogs.length).toBe(2);
        expect(response.body.dogs[0].name).toBe("Buddy");
    });

    test("Get a single dog by ID", async () => {
        Dog.findById.mockResolvedValue({
            id: 1,
            name: "Buddy",
            age: "Young",
            breed: "Labrador",
            location: "New York"
        });

        const response = await request(server).get("/api/dogs/1")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Buddy");
    });

    test("Get a non-existent dog should return 404", async () => {
        Dog.findById.mockResolvedValue(null);

        const response = await request(server).get("/api/dogs/999")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe("Dog not found");
    });
});
