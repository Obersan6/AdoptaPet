
import { vi } from "vitest";
import { fetchBreeds, fetchUserProfile, loginUser } from "../api/api";

describe("API Functions", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn();
  });

  test("fetchBreeds fetches dog breeds successfully", async () => {
    const mockResponse = {
      breeds: [{ breed_name: "Labrador" }, { breed_name: "Beagle" }],
      totalPages: 2,
    };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await fetchBreeds("fake-token", 10, 1);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5000/api/breeds?limit=10&page=1",
      {
        headers: { Authorization: "Bearer fake-token" },
      }
    );

    expect(result.breeds.length).toBe(2);
    expect(result.breeds[0].breed_name).toBe("Labrador");
  });

  test("fetchUserProfile fetches user profile successfully", async () => {
    const mockProfile = { username: "testuser", first_name: "John", last_name: "Doe" };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProfile),
    });

    const userId = "123"; // Ensure a valid userId is passed
    const result = await fetchUserProfile("fake-token", userId);

    // Corrected the expected fetch call
    expect(fetch).toHaveBeenCalledWith(`http://localhost:5000/api/users/${userId}`, {
      headers: { Authorization: "Bearer fake-token" },
    });

    expect(result.username).toBe("testuser");
  });

  test("fetchUserProfile returns an error on failure", async () => {
    fetch.mockResolvedValue({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ error: "Failed to fetch user profile" }),
    });

    const result = await fetchUserProfile("invalid-token", "123");
    expect(result.error).toBe("Failed to fetch user profile"); // Match the actual error message
});


  test("loginUser posts credentials and returns token", async () => {
    const mockLoginResponse = { user: { username: "testuser" }, token: "fake-jwt-token" };

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockLoginResponse),
    });

    const result = await loginUser("testuser", "password123");

    expect(fetch).toHaveBeenCalledWith("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "testuser", password: "password123" }),
    });

    expect(result.token).toBe("fake-jwt-token");
  });
});
