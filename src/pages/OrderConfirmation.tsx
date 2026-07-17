import { Link, useLocation } from "react-router-dom";
import type { Order } from "../types";
import { formatPrice } from "../utils/formatPrice";
import { handleImageError } from "../utils/imageFallback";

export default function OrderConfirmation() {
  const location = useLocation();
  const order = (location.state as { order?: Order } | null)?.order;

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          No order found
        </h1>
        <p className="mb-6 text-gray-500">
          We couldn't find an order to show you.
        </p>
        <Link
          to="/"
          className="inline-block rounded-full bg-gray-900 px-6 py-2 font-medium text-white hover:bg-gray-700"
        >
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Order Confirmed!
        </h1>
        <p className="text-gray-500">
          Order #{order.orderId.slice(0, 8)} &middot;{" "}
          {new Date(order.timestamp).toLocaleString()}
        </p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white px-4 shadow-sm sm:px-6">
        {order.items.map((lineItem) => (
          <div
            key={lineItem.lineItemId}
            className="flex items-center gap-4 border-b border-gray-200 py-4 last:border-b-0"
          >
            <img
              src={lineItem.item.imageUrl}
              alt={lineItem.item.name}
              onError={handleImageError}
              className="h-16 w-16 flex-shrink-0 rounded-lg bg-gray-200 object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                {lineItem.item.name}
              </p>
              <p className="text-sm text-gray-500">
                Qty {lineItem.quantity} &times;{" "}
                {formatPrice(lineItem.item.price)}
              </p>
            </div>
            <div className="font-semibold text-gray-900">
              {formatPrice(lineItem.item.price * lineItem.quantity)}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-lg font-bold text-gray-900">
          {formatPrice(order.total)}
        </span>
      </div>
      <Link
        to="/"
        className="mt-6 block w-full rounded-full bg-gray-900 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-gray-700"
      >
        Back to Menu
      </Link>
    </div>
  );
}
