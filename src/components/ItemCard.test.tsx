import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ItemCard from "./ItemCard";
import { CartProvider } from "../context/CartContext";
import { createLocalStorageMock } from "../test/localStorageMock";
import type { Item } from "../types";

const freeItem: Item = {
  id: "6",
  name: "Carrot Cake",
  description: "A classic carrot cake with cream cheese frosting.",
  price: 0,
  imageUrl: "https://example.com/carrot-cake.jpg",
};

function renderItemCard(item: Item) {
  return render(
    <MemoryRouter>
      <CartProvider>
        <ItemCard item={item} />
      </CartProvider>
    </MemoryRouter>
  );
}

describe("ItemCard pricing", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", createLocalStorageMock());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("free items", () => {
    it('displays "Free" for a zero-price item and never renders "$0.00"', () => {
      renderItemCard(freeItem);

      expect(screen.getByText("Free")).toBeInTheDocument();
      expect(screen.queryByText("$0.00")).not.toBeInTheDocument();
    });
  });
});
