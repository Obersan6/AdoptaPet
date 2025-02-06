
import React from "react";
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

// Mock useAuth to control authentication state
vi.mock("../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

test("renders the Navbar with AdoptaDog text", () => {
  useAuth.mockReturnValue({ currentUser: null });

  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  expect(screen.getByText(/AdoptaDog/i)).toBeInTheDocument();
});

test("shows login/signup when user is not logged in", () => {
  useAuth.mockReturnValue({ currentUser: null });

  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByText(/Signup/i)).toBeInTheDocument();
});

test("shows navigation links and logout button when user is logged in", () => {
  const mockLogout = vi.fn();
  useAuth.mockReturnValue({ currentUser: { username: "testuser" }, logout: mockLogout });

  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  expect(screen.getByText(/Dogs/i)).toBeInTheDocument();
  expect(screen.getByText(/Find a Dog/i)).toBeInTheDocument();
  expect(screen.getByText(/Breeds/i)).toBeInTheDocument();
  expect(screen.getByText(/Profile/i)).toBeInTheDocument();

  const logoutButton = screen.getByText(/Logout/i);
  expect(logoutButton).toBeInTheDocument();
  fireEvent.click(logoutButton);
  expect(mockLogout).toHaveBeenCalled();
});
