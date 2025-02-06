
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Login from "../pages/Login";
import { loginUser } from "../api/api";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

vi.mock("../api/api", () => ({
  loginUser: vi.fn(),
}));

vi.mock("../context/AuthContext", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuth: () => ({
      login: vi.fn(),
    }),
  };
});

describe("Login Page", () => {
  test("renders login form", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test("logs in successfully", async () => {
    loginUser.mockResolvedValue({ user: { username: "testuser" }, token: "fake-token" });

    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalled();
    });
  });

  test("displays error message on failed login", async () => {
    loginUser.mockResolvedValue({ error: "Invalid credentials" }); // Mock API 

    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    // Ensure inputs are filled before clicking login
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "wronguser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "wrongpass" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Error matching (case insensitive & avoids structure mismatch)
    await waitFor(
      () => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      },
      { timeout: 2000 } // Allow extra time for UI update
    );
  });
});
