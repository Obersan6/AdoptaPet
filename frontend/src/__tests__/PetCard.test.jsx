
import React from "react";
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PetCard from "../components/PetCard";

const mockPet = {
  id: 1,
  name: "Buddy",
  breed: "Golden Retriever",
  image: "https://example.com/dog.jpg",
};

test("renders pet's name and breed", () => {
  render(
    <BrowserRouter>
      <PetCard pet={mockPet} />
    </BrowserRouter>
  );

  expect(screen.getByText("Buddy")).toBeInTheDocument();
  expect(screen.getByText("Golden Retriever")).toBeInTheDocument();
});

test("uses the correct pet image", () => {
  render(
    <BrowserRouter>
      <PetCard pet={mockPet} />
    </BrowserRouter>
  );

  const image = screen.getByRole("img");
  expect(image).toHaveAttribute("src", "https://example.com/dog.jpg");
  expect(image).toHaveAttribute("alt", "Buddy");
});

test("falls back to default image if none is provided", () => {
  const petWithoutImage = { ...mockPet, image: null };

  render(
    <BrowserRouter>
      <PetCard pet={petWithoutImage} />
    </BrowserRouter>
  );

  const image = screen.getByRole("img");
  expect(image).toHaveAttribute("src", "/default-dog.jpg");
});

test("renders View Details button linking to the correct page", () => {
  render(
    <BrowserRouter>
      <PetCard pet={mockPet} />
    </BrowserRouter>
  );

  const viewDetailsLink = screen.getByRole("link", { name: /view details/i });
  expect(viewDetailsLink).toHaveAttribute("href", "/pets/1");
});
