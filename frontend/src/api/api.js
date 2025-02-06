/* Handles API calls to the backend */

const API_BASE_URL = "http://localhost:5000/api"; // Backend URL

// Login User (Uses username instead of email)
export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Login failed");
        }

        return data;
    } catch (error) {
        return { error: error.message };
    }
};

// Signup User
export const signupUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Signup failed");
        }

        return data;
    } catch (error) {
        return { error: error.message };
    }
};

export const fetchUserProfile = async (token, userId) => {
    try {
        if (!userId) {
            console.error("fetchUserProfile Error: User ID is missing!");
            return { error: "User ID is missing" };
        }

        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch user profile");
        }

        return data;
    } catch (error) {
        console.error("API Error:", error);
        return { error: error.message };
    }
};


export const updateUserProfile = async (token, userId, firstName, lastName) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ firstName, lastName }), // Remove email from request
        });

        if (!response.ok) {
            throw new Error(`Failed to update profile: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        return { error: error.message };
    }
};

export const deleteUserAccount = async (token, userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to delete account: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        return { error: error.message };
    }
};

export const fetchDogs = async (token, page = 1, limit = 10) => {
    try {
        const response = await fetch(`${API_BASE_URL}/dogs?page=${page}&limit=${limit}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch dogs");
        }

        const data = await response.json();
        
        return {
            dogs: data.dogs.map(dog => ({
                ...dog,
                images: dog.images && dog.images.length > 0 ? dog.images : ["/default-dog.jpg"]
            })),
            pagination: data.pagination || {},
            sort: data.sort || "name",
        };
    } catch (error) {
        console.error("API Error:", error);
        return { dogs: [] };
    }
};

export const searchDogs = async (token, searchType, query) => {
    try {
        if (!token) {
            console.error("Missing authentication token");
            return [];
        }

        const params = new URLSearchParams();
        if (searchType === "location") {
            if (!query.includes(",")) {
                console.error("Invalid location format:", query);
                return [];
            }
            params.append("location", query.trim());
        } else if (searchType === "breed") {
            params.append("breed", query.trim());
        }

        const response = await fetch(`${API_BASE_URL}/dogs/search?${params.toString()}`, {
            headers: {
                "Authorization": `Bearer ${token}`, // Include Bearer token
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch dogs");
        }

        const data = await response.json();
        return data.dogs || []; // Always return an array
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
};

export const fetchPetById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/dogs/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch pet details");
        }

        const data = await response.json();

        // Ensure images are extracted properly
        const images = data.images && data.images.length > 0 ? data.images : [];

        return { ...data, images }; // Ensure 'images' is always defined
    } catch (error) {
        console.error("API Error:", error);
        return { error: error.message };
    }
};

// Fetch breeds from the backend
export const fetchBreeds = async (token, limit = 10, page = 1) => {
    try {
        const response = await fetch(`${API_BASE_URL}/breeds?limit=${limit}&page=${page}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch breeds");
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        return { error: error.message };
    }
};








