import { Link } from "react-router-dom";
import items from "../data/items.json";
import ItemCard from "../components/ItemCard";
import type { Item } from "../types";

export default function ItemList() {
  const menuItems = items as Item[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Menu</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      <Link
        to="/admin"
        className="fixed bottom-4 right-4 rounded-tl-lg bg-gray-800 px-3 py-2 text-xs font-medium text-white transition-colors duration-150 hover:bg-gray-700"
      >
        Staff Access
      </Link>
    </div>
  );
}
