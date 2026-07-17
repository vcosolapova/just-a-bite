import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";
import { createLocalStorageMock } from "../test/localStorageMock";
import type { Item } from "../types";

const testItem: Item = {
  id: "1",
  name: "Test Item",
  description: "A test item for cart tests.",
  price: 500,
  imageUrl: "https://example.com/test-item.jpg",
};

function CartTestHarness() {
  const {
    cartItems,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useCart();
  const firstLineItemId = cartItems[0]?.lineItemId;

  return (
    <div>
      <div data-testid="cart-count">{cartItems.length}</div>
      <ul>
        {cartItems.map((lineItem) => (
          <li key={lineItem.lineItemId} data-testid="line-item">
            <span data-testid="line-item-id">{lineItem.lineItemId}</span>
            <span data-testid="item-id">{lineItem.item.id}</span>
            <span data-testid="quantity">{lineItem.quantity}</span>
          </li>
        ))}
      </ul>
      <button onClick={() => addToCart(testItem)}>add</button>
      <button
        onClick={() => firstLineItemId && incrementQuantity(firstLineItemId)}
      >
        increment
      </button>
      <button
        onClick={() => firstLineItemId && decrementQuantity(firstLineItemId)}
      >
        decrement
      </button>
      <button onClick={() => clearCart()}>clear</button>
    </div>
  );
}

function renderCart() {
  return render(
    <CartProvider>
      <CartTestHarness />
    </CartProvider>
  );
}

describe("CartContext", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", createLocalStorageMock());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("addToCart", () => {
    it("always creates a new line item instead of incrementing quantity", () => {
      renderCart();

      fireEvent.click(screen.getByText("add"));
      fireEvent.click(screen.getByText("add"));

      const lineItems = screen.getAllByTestId("line-item");
      expect(lineItems).toHaveLength(2);

      const [firstId, secondId] = screen
        .getAllByTestId("line-item-id")
        .map((el) => el.textContent);
      expect(firstId).not.toBe(secondId);

      const itemIds = screen
        .getAllByTestId("item-id")
        .map((el) => el.textContent);
      expect(itemIds).toEqual(["1", "1"]);
    });
  });

  describe("decrementQuantity", () => {
    it("never drops quantity below 1 and keeps the line item in the cart", () => {
      renderCart();

      fireEvent.click(screen.getByText("add"));
      fireEvent.click(screen.getByText("increment"));
      fireEvent.click(screen.getByText("increment"));
      expect(screen.getByTestId("quantity").textContent).toBe("3");

      fireEvent.click(screen.getByText("decrement"));
      fireEvent.click(screen.getByText("decrement"));
      fireEvent.click(screen.getByText("decrement"));
      fireEvent.click(screen.getByText("decrement"));

      expect(screen.getByTestId("quantity").textContent).toBe("1");
      expect(screen.getAllByTestId("line-item")).toHaveLength(1);
    });
  });

  describe("clearCart", () => {
    it("empties cartItems and clears the persisted cart in localStorage", () => {
      renderCart();

      fireEvent.click(screen.getByText("add"));
      fireEvent.click(screen.getByText("add"));
      fireEvent.click(screen.getByText("add"));
      expect(screen.getAllByTestId("line-item")).toHaveLength(3);

      fireEvent.click(screen.getByText("clear"));

      expect(screen.queryAllByTestId("line-item")).toHaveLength(0);
      expect(screen.getByTestId("cart-count").textContent).toBe("0");

      const stored = localStorage.getItem("cart");
      const parsedCart = stored ? JSON.parse(stored) : [];
      expect(parsedCart).toEqual([]);
    });
  });
});
