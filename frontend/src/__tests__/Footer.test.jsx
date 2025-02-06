
import React from "react";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

test("renders the Footer with correct year", () => {
  render(<Footer />);
  const currentYear = new Date().getFullYear();
  expect(screen.getByText(`© ${currentYear} AdoptaPet. All rights reserved.`)).toBeInTheDocument();
});
