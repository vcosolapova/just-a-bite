import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Order } from "../types";
import { formatPrice } from "../utils/formatPrice";

const ADMIN_AUTH_KEY = "adminAuth";
const ORDERS_STORAGE_KEY = "orders";

function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export default function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(() => loadOrders());
  const [expandedOrderIds, setExpandedOrderIds] = useState<Set<string>>(
    new Set()
  );

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    navigate("/");
  };

  const toggleExpanded = (orderId: string) => {
    setExpandedOrderIds((prev) => {
      const next = new Set(prev);
      if (next.has(orderId)) {
        next.delete(orderId);
      } else {
        next.add(orderId);
      }
      return next;
    });
  };

  const handleDelete = (orderId: string) => {
    const remaining = orders.filter((order) => order.orderId !== orderId);
    setOrders(remaining);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(remaining));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-1.5 bg-gray-900" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm text-gray-500 transition-colors hover:text-gray-800"
          >
            ← Back to Menu
          </Link>
          <span className="text-xl font-bold text-gray-900">Admin Panel</span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
        >
          Logout
        </button>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Orders</h1>

        {orders.length === 0 ? (
          <p className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500 shadow-sm">
            No orders yet
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => {
              const isExpanded = expandedOrderIds.has(order.orderId);

              return (
                <div
                  key={order.orderId}
                  className="rounded-xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between gap-4 p-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-gray-900">
                        Order #{order.orderId.slice(0, 8)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(order.timestamp).toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}{" "}
                        &middot; {formatPrice(order.total)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleExpanded(order.orderId)}
                        className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                      >
                        {isExpanded ? "Collapse" : "Expand"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(order.orderId)}
                        className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-gray-200 px-4 pb-4">
                      {order.items.map((lineItem) => (
                        <div
                          key={lineItem.lineItemId}
                          className="flex items-center justify-between gap-4 border-b border-gray-100 py-3 last:border-b-0"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {lineItem.item.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty {lineItem.quantity} &times;{" "}
                              {formatPrice(lineItem.item.price)}
                            </p>
                          </div>
                          <span className="font-semibold text-gray-900">
                            {formatPrice(
                              lineItem.item.price * lineItem.quantity
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
