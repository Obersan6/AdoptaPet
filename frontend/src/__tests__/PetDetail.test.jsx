

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import PetDetail from "../pages/PetDetail";
import { fetchPetById } from "../api/api";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

// Mock fetchPetById API
vi.mock("../api/api", () => ({
  fetchPetById: vi.fn(),
}));

// Mock useParams to provide a test pet ID
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ id: "123" }), // Fake ID for testing
  };
});

// Mock localStorage to return a fake token
beforeAll(() => {
  vi.stubGlobal("localStorage", {
    getItem: vi.fn((key) => {
      if (key === "token") return "fake-token"; // Token is a string
      if (key === "user") return JSON.stringify({ username: "testuser" }); // User must be JSON string
      return null;
    }),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  });
});


describe("PetDetail Page", () => {
  test("renders pet details", async () => {
    fetchPetById.mockResolvedValueOnce({
      name: "Buddy",
      breed: "Labrador",
      location: "New York",
      images: ["/fake-dog.jpg"],
      description: "Friendly dog",
      age: "2 years",
      gender: "Male",
      size: "Medium",
      color: "Brown",
      tags: ["Playful", "Friendly"],
      attributes: {
        spayed_neutered: true,
        house_trained: true,
        shots_current: true,
        special_needs: false,
      },
      organization_name: "Rescue Paws",
      organization_email: "contact@rescuepaws.com",
      videos: [],
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <PetDetail />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Buddy")).toBeInTheDocument();
      expect(screen.getByText("Labrador")).toBeInTheDocument();
      expect(screen.getByText("New York")).toBeInTheDocument();
      expect(screen.getByText("Friendly dog")).toBeInTheDocument();
      expect(screen.getByText("2 years")).toBeInTheDocument();
    });
  });

  test("shows error message when pet fetch fails", async () => {
    fetchPetById.mockRejectedValueOnce(new Error("Failed to fetch pet details"));

    render(
      <BrowserRouter>
        <AuthProvider>
          <PetDetail />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch pet details/i)).toBeInTheDocument();
    });
  });
});
