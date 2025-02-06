
import React from "react";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import UserCard from "../components/UserCard";
import { useAuth } from "../context/AuthContext";
import { vi } from "vitest";


// Mock useAuth hook
vi.mock("../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

// **Test 1: Does not render if no user is logged in**
test("does not render if no user is logged in", () => {
  useAuth.mockReturnValue({ currentUser: null }); // No user

  const { container } = render(<UserCard />);
  expect(container.firstChild).toBeNull();
});

// **Test 2: Displays logged-in user**
test("displays the logged-in user's username", () => {
  useAuth.mockReturnValue({ currentUser: { username: "testuser" } });

  render(<UserCard />);

  expect(screen.getByText("testuser")).toBeInTheDocument();
});
