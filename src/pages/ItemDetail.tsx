import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import items from "../data/items.json";
import type { Item } from "../types";
import { formatPrice } from "../utils/formatPrice";
import { handleImageError } from "../utils/imageFallback";
import { useCart } from "../context/CartContext";
import DictionaryTooltip from "../components/DictionaryTooltip";

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const item = (items as Item[]).find((i) => i.id === id);

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          Item not found
        </h1>
        <Link
          to="/"
          className="inline-block rounded-full bg-gray-900 px-6 py-2 font-medium text-white hover:bg-gray-700"
        >
          Back to Menu
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        ← Back
      </button>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="aspect-[16/9] w-full bg-gray-200">
          <img
            src={item.imageUrl}
            alt={item.name}
            onError={handleImageError}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 p-6">
          <h1 className="text-2xl font-bold text-gray-900">
            <DictionaryTooltip name={item.name} />
          </h1>
          <p className="text-gray-600">{item.description}</p>
          <p className="text-xl font-semibold text-gray-900">
            {formatPrice(item.price)}
          </p>
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full rounded-full bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700 sm:w-auto"
          >
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
