
import React from "react";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext"; 
import App from "../App"; 

test("renders the Navbar with AdoptaDog text", () => {
  render(
    <AuthProvider>
      <App />  
    </AuthProvider>
  );

  // Look for "AdoptaDog" text in the Navbar
  const navbarText = screen.getByText(/AdoptaDog/i);
  expect(navbarText).toBeInTheDocument();
});









