

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom"; 
import Pets from "../pages/Pets";
import { fetchDogs } from "../api/api";
import { AuthProvider } from "../context/AuthContext";

vi.mock("../api/api", () => ({
  fetchDogs: vi.fn(),
}));

vi.mock("../context/AuthContext", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuth: () => ({
      currentUser: { token: "fake-token" },
    }),
  };
});

// Mock localStorage to return a fake token
beforeAll(() => {
  global.Storage.prototype.getItem = vi.fn((key) => {
    if (key === "token") return "fake-token";
    return null;
  });
});

describe("Pets Page", () => {
  test("renders loading state initially", () => {
    fetchDogs.mockImplementationOnce(() => new Promise(() => {})); // Simulate a pending promise

    render(
      <MemoryRouter>
        <AuthProvider>
          <Pets />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders pet list on successful fetch", async () => {
    fetchDogs.mockResolvedValueOnce({
      dogs: [{ id: 1, name: "Buddy", breed: "Labrador", location: "NY" }],
      pagination: { totalPages: 2 },
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Pets />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Buddy/i)).toBeInTheDocument();
      expect(screen.getByText(/Labrador/i)).toBeInTheDocument();
      expect(screen.getByText(/NY/i)).toBeInTheDocument();
    });
  });

  test("displays an error message on failed fetch", async () => {
    fetchDogs.mockRejectedValueOnce(new Error("Failed to fetch dogs"));

    render(
      <MemoryRouter>
        <AuthProvider>
          <Pets />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch dogs/i)).toBeInTheDocument();
    });
  });
});
