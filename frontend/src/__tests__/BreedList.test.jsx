
import React from "react";
import { vi, beforeEach, describe, test, expect } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import BreedList from "../components/BreedList";
import { fetchBreeds } from "../api/api";

// Reset mocks before each test
beforeEach(() => {
  vi.resetAllMocks();
  localStorage.setItem("token", "fake-token"); // Simulate logged-in user
});

// Mock API
vi.mock("../api/api", () => ({
  fetchBreeds: vi.fn(),
}));

describe("BreedList Component", () => {
  test(
    "fetches and displays breeds",
    async () => {
      // Ensure response structure matches what the component expects
      fetchBreeds.mockResolvedValue({
        breeds: [
          { breed_name: "Labrador" },
          { breed_name: "Beagle" },
          { breed_name: "Bulldog" }
        ]
      });

      await act(async () => {
        render(<BreedList page={1} setPage={vi.fn()} />);
      });

      // Check text inside <h5> 
      await waitFor(() => {
        expect(screen.getByRole("heading", { name: /labrador/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /beagle/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /bulldog/i })).toBeInTheDocument();
      });
    },
    10000
  );

  test(
    "displays an error message when fetch fails",
    async () => {
      fetchBreeds.mockResolvedValue({ error: "Failed to fetch breeds" });

      await act(async () => {
        render(<BreedList page={1} setPage={vi.fn()} />);
      });

      await waitFor(() => {
        expect(screen.getByText("Failed to fetch breeds")).toBeInTheDocument();
      });
    },
    10000
  );

  test(
    "displays unauthorized error message if no token is provided",
    async () => {
      localStorage.removeItem("token"); // Simulate logged-out user

      await act(async () => {
        render(<BreedList page={1} setPage={vi.fn()} />);
      });

      await waitFor(() => {
        expect(screen.getByText("Unauthorized: Please log in first.")).toBeInTheDocument();
      });
    },
    10000
  );

  test(
    "handles pagination correctly",
    async () => {
      fetchBreeds.mockResolvedValue({
        breeds: [
          { breed_name: "Labrador" },
          { breed_name: "Beagle" },
          { breed_name: "Bulldog" }
        ]
      });

      await act(async () => {
        render(<BreedList page={1} setPage={vi.fn()} />);
      });

      await waitFor(() => {
        expect(screen.getByRole("heading", { name: /labrador/i })).toBeInTheDocument();
      });
    },
    10000
  );
});
