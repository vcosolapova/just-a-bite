import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import type { Item } from "../types";
import { formatPrice } from "../utils/formatPrice";
import { handleImageError } from "../utils/imageFallback";
import { useCart } from "../context/CartContext";

export default function ItemCard({ item }: { item: Item }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      to={`/items/${item.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-200">
        <img
          src={item.imageUrl}
          alt={item.name}
          onError={handleImageError}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="line-clamp-2 text-sm text-gray-500">
          {item.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <p className="font-semibold text-gray-900">
            {formatPrice(item.price)}
          </p>
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-full bg-gray-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  );
}
