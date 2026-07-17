import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { formatPrice } from "../utils/formatPrice";
import type { Order } from "../types";

const ORDERS_STORAGE_KEY = "orders";

export default function Cart() {
  const { cartItems, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const order: Order = {
      orderId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      items: cartItems,
      total: totalPrice,
    };

    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    const orders: Order[] = raw ? JSON.parse(raw) : [];
    orders.push(order);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));

    clearCart();
    navigate("/confirmation", { state: { order } });
  };

  const handleStartOver = () => {
    clearCart();
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Your cart is empty
        </h1>
        <p className="mb-6 text-gray-500">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/"
          className="inline-block rounded-full bg-gray-900 px-6 py-2 font-medium text-white hover:bg-gray-700"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Your Cart</h1>
      <div className="rounded-xl border border-gray-200 bg-white px-4 shadow-sm sm:px-6">
        {cartItems.map((lineItem) => (
          <CartItem key={lineItem.lineItemId} lineItem={lineItem} />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-lg font-bold text-gray-900">
          {formatPrice(totalPrice)}
        </span>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="order-2 flex-1 rounded-full border border-gray-800 px-6 py-3 font-medium text-gray-800 transition-colors hover:bg-gray-100 sm:order-1"
        >
          Back to Menu
        </button>
        <button
          type="button"
          onClick={handleCheckout}
          className="order-1 flex-1 rounded-full bg-gray-800 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700 sm:order-2"
        >
          Checkout
        </button>
      </div>
      <div className="mt-3 text-center">
        <button
          type="button"
          onClick={handleStartOver}
          className="text-sm text-gray-400 transition-colors hover:text-red-500"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
