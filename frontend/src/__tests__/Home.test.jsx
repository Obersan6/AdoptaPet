
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

vi.mock("../context/AuthContext", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuth: () => ({
      currentUser: { id: 1, username: "testuser" },
      token: "fake-token",
    }),
  };
});

describe("Home Page", () => {
  test("renders homepage correctly", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText("Find a Very Special Dog")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /find a dog/i })).toBeInTheDocument();
  });
});