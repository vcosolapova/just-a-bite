import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { CartProvider } from "../context/CartContext";
import { createLocalStorageMock } from "../test/localStorageMock";

function renderItemDetail(itemId: string) {
  return render(
    <MemoryRouter initialEntries={[`/items/${itemId}`]}>
      <CartProvider>
        <Routes>
          <Route path="/items/:id" element={<ItemDetail />} />
        </Routes>
      </CartProvider>
    </MemoryRouter>
  );
}

describe("ItemDetail dictionary tooltip", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", createLocalStorageMock());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("Mondo Nachos (id: 8)", () => {
    it('renders "Mondo" with a dotted-underline tooltip and shows its definition on hover', async () => {
      const user = userEvent.setup();
      renderItemDetail("8");

      const heading = screen.getByRole("heading", { level: 1 });
      const matchedWord = within(heading).getByText("Mondo");

      expect(matchedWord.className).toContain("border-dotted");

      await user.hover(matchedWord);

      expect(screen.getByText("A large or great thing")).toBeInTheDocument();
    });
  });
});
