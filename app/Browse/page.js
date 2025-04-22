"use client"

import { useState } from "react";
import items from "../Service/items";
import ItemCard from "../Components/ItemCard";

export default function Browse() {
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories from the items
  const categories = ["All", ...new Set(items.map(item => item.category))]; //shouldn't have to replac for db

  // Filter items based on the selected category
  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="ml-60 p-8">
      <h2 className="text-3xl font-bold mb-6 text-[#2e2e2e]">Browse Categories:</h2>

      {/* Category tabs */}
      <div className="mb-6 flex gap-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`text-lg font-medium px-4 py-2 rounded-md ${selectedCategory === category ? 'bg-[#7c7f65] text-white' : 'bg-[#cfc7d2] text-[#2e2e2e]'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Display filtered items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}