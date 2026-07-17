import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { CartLineItem, Item } from "../types";

const CART_STORAGE_KEY = "cart";

interface CartContextValue {
  cartItems: CartLineItem[];
  addToCart: (item: Item) => void;
  removeFromCart: (lineItemId: string) => void;
  incrementQuantity: (lineItemId: string) => void;
  decrementQuantity: (lineItemId: string) => void;
  clearCart: () => void;
  totalItemCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function loadCartFromStorage(): CartLineItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartLineItem[]>(() =>
    loadCartFromStorage()
  );

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Item) => {
    setCartItems((prev) => [
      ...prev,
      { lineItemId: crypto.randomUUID(), item, quantity: 1 },
    ]);
  };

  const removeFromCart = (lineItemId: string) => {
    setCartItems((prev) => prev.filter((li) => li.lineItemId !== lineItemId));
  };

  const incrementQuantity = (lineItemId: string) => {
    setCartItems((prev) =>
      prev.map((li) =>
        li.lineItemId === lineItemId
          ? { ...li, quantity: li.quantity + 1 }
          : li
      )
    );
  };

  const decrementQuantity = (lineItemId: string) => {
    setCartItems((prev) =>
      prev.map((li) =>
        li.lineItemId === lineItemId
          ? { ...li, quantity: Math.max(1, li.quantity - 1) }
          : li
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItemCount = cartItems.length;
  const totalPrice = cartItems.reduce(
    (sum, li) => sum + li.item.price * li.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        totalItemCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
