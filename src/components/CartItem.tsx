import type { CartLineItem } from "../types";
import { formatPrice } from "../utils/formatPrice";
import { handleImageError } from "../utils/imageFallback";
import { useCart } from "../context/CartContext";

export default function CartItem({ lineItem }: { lineItem: CartLineItem }) {
  const { removeFromCart, incrementQuantity, decrementQuantity } = useCart();
  const { lineItemId, item, quantity } = lineItem;
  const lineTotal = item.price * quantity;

  return (
    <div className="flex items-center gap-4 border-b border-gray-200 py-4 last:border-b-0">
      <img
        src={item.imageUrl}
        alt={item.name}
        onError={handleImageError}
        className="h-20 w-20 flex-shrink-0 rounded-lg object-cover bg-gray-200"
      />
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500">{formatPrice(item.price)} each</p>
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => decrementQuantity(lineItemId)}
            disabled={quantity === 1}
            aria-label="Decrease quantity"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors enabled:hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>
          <span className="w-6 text-center font-medium">{quantity}</span>
          <button
            type="button"
            onClick={() => incrementQuantity(lineItemId)}
            aria-label="Increase quantity"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:bg-gray-100"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => removeFromCart(lineItemId)}
            className="ml-2 text-sm font-medium text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="text-right font-semibold text-gray-900">
        {formatPrice(lineTotal)}
      </div>
    </div>
  );
}
