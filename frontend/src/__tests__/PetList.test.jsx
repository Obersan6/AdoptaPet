
import React from "react";
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PetList from "../components/PetList";
import { fetchPets } from "../api/api";

// Mock API function
vi.mock("../api/api", () => ({
  fetchPets: vi.fn(),
}));

// Mock Pets Data
const mockPets = [
  {
    id: 1,
    name: "Buddy",
    breed: "Golden Retriever",
    age: "2 years",
    size: "Large",
    gender: "Male",
    location: "New York",
    image: "https://example.com/dog.jpg",
  },
  {
    id: 2,
    name: "Lucy",
    breed: "Labrador",
    age: "3 years",
    size: "Medium",
    gender: "Female",
    location: "California",
    image: "https://example.com/labrador.jpg",
  }
];

// **Test 1: Renders Title**
test("renders the title", () => {
  render(<PetList />);
  expect(screen.getByText("Adoptable Dogs")).toBeInTheDocument();
});

// **Test 2: Displays error when unauthorized**
test("shows error message if user is not logged in", () => {
  localStorage.removeItem("token"); // Ensure no token exists

  render(<PetList />);

  expect(screen.getByText("Unauthorized: Please log in first.")).toBeInTheDocument();
});

// **Test 3: Fetches and displays pets**
test("fetches and displays pets", async () => {
  localStorage.setItem("token", "mock-token"); // Set mock token

  fetchPets.mockResolvedValue({ dogs: mockPets });

  render(<PetList />);

  // Wait for pets to be displayed
  await waitFor(() => {
    expect(screen.getByText((content) => content.includes("Buddy"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("Golden Retriever"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("Lucy"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("Labrador"))).toBeInTheDocument();
  });
});

// **Test 4: Handles API errors**
test("displays an error message when API call fails", async () => {
  localStorage.setItem("token", "mock-token");

  fetchPets.mockResolvedValue({ error: "Failed to fetch pets." });

  render(<PetList />);

  await waitFor(() => {
    expect(screen.getByText("Failed to fetch pets.")).toBeInTheDocument();
  });
});

// **Test 5: Pagination buttons work**
test("pagination buttons update the page", async () => {
  localStorage.setItem("token", "mock-token");

  fetchPets.mockResolvedValue({ dogs: mockPets });

  render(<PetList />);

  // Wait for pets to load
  await waitFor(() => {
    expect(screen.getByText("Buddy")).toBeInTheDocument();
  });

  const nextButton = screen.getByRole("button", { name: /next/i });
  fireEvent.click(nextButton); // Click "Next"

  await waitFor(() => {
    expect(fetchPets).toHaveBeenCalledWith("mock-token", 2, 10);
  });

  const prevButton = screen.getByRole("button", { name: /previous/i });
  fireEvent.click(prevButton); // Click "Previous"

  await waitFor(() => {
    expect(fetchPets).toHaveBeenCalledWith("mock-token", 1, 10);
  });
});

