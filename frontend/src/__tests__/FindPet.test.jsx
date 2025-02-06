
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import FindPet from "../pages/FindPet";
import { searchDogs } from "../api/api";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom"; 

vi.mock("../api/api", () => ({
  searchDogs: vi.fn(),
}));

vi.mock("../context/AuthContext", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuth: () => ({
      token: "fake-token", 
    }),
  };
});

describe("FindPet Page", () => {
  test("renders the search form", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <FindPet />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Enter location")).toBeInTheDocument();
  });

  test("searches for pets by breed and displays results", async () => {
    searchDogs.mockResolvedValueOnce([
      { id: 1, name: "Buddy", breed: "Labrador", location: "New York, NY" },
    ]);

    render(
      <BrowserRouter>
        <AuthProvider>
          <FindPet />
        </AuthProvider>
      </BrowserRouter>
    );

    // Select "Breed" as the search type
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "breed" },
    });

    
    fireEvent.change(screen.getByPlaceholderText("Enter breed"), {
      target: { value: "Labrador" },
    });

    // Click the search button
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    // Wait for results
    await waitFor(() => {
      expect(screen.findByText(/Buddy/i)).resolves.toBeInTheDocument();
      expect(screen.findByText(/Labrador/i)).resolves.toBeInTheDocument();
    });
  });

  test("displays an error when search fails", async () => {
    searchDogs.mockRejectedValueOnce(new Error("Failed to fetch pets"));

    render(
      <BrowserRouter>
        <AuthProvider>
          <FindPet />
        </AuthProvider>
      </BrowserRouter>
    );

    // Set search type to breed
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "breed" },
    });

    // Enter a breed
    fireEvent.change(screen.getByPlaceholderText("Enter breed"), {
      target: { value: "Golden Retriever" },
    });

    // Click the search button
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });
});

