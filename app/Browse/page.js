"use client";

import { useContext, useState, useEffect } from "react";
import ItemCard from "../Components/ItemCard";
import { MyContext } from "../Components/MyContext";

export default function Browse() {
  const { getItemsByCategory } = useContext(MyContext);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([{ catid: -1, category: "All" }]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1); // -1 means "All"

  // Fetch all items on initial load
  useEffect(() => {
    const fetchAll = async () => {
      const allItems = await getItemsByCategory(-1); // <- you can treat -1 in your backend as "all items"
      setItems(allItems);

      const unique = new Map();
      allItems.forEach(item => unique.set(item.catid, item.category));

      const dynamicCats = Array.from(unique.entries()).map(([catid, category]) => ({ catid, category }));
      setCategories([{ catid: -1, category: "All" }, ...dynamicCats]);
    };

    fetchAll();
  }, []);

  // Fetch items when category changes
  useEffect(() => {
    const fetch = async () => {
      const filtered = await getItemsByCategory(selectedCategoryId);
      setItems(filtered);
    };

    fetch();
  }, [selectedCategoryId]);

  return (
    <div className="ml-60 p-8">
      <h2 className="text-3xl font-bold mb-6 text-[#2e2e2e]">Browse Categories:</h2>

      <div className="mb-6 flex gap-4">
        {categories.map(({ catid, category }) => (
          <button
            key={catid}
            onClick={() => setSelectedCategoryId(catid)}
            className={`text-lg font-medium px-4 py-2 rounded-md ${
              selectedCategoryId === catid ? "bg-[#7c7f65] text-white" : "bg-[#cfc7d2] text-[#2e2e2e]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
