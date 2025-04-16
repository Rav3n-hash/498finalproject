"use client";

import items from "./Service/items";
import ItemCard from "./Components/ItemCard";

export default function Home() {
  return (
    <div className="ml-60 p-8">
      <h2 className="text-3xl font-bold mb-6 text-[#2e2e2e]">Featured Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>


  );
}