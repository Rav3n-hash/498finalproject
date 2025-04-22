"use client"; // Ensure the component is rendered on the client-side

import { useEffect, useState } from "react";
import items from "./Service/items"; // Assuming this imports a static list for development
import ItemCard from "./Components/ItemCard";
import { GetItems } from "./Service/ItemRoutes";

export default function Home() {
  const [allItems, setAllItems] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [runningOutItems, setRunningOutItems] = useState([]);

  // Fetch items and update state
  useEffect(() => {
    async function fetchItems() {
      const fetchedItems = await GetItems();
      setAllItems(fetchedItems);

      // Randomly pick 5 items for the featured section
      const randomItems = fetchedItems.sort(() => 0.5 - Math.random()).slice(0, 5);
      setFeaturedItems(randomItems);

      // Filter items with stock under 10 for the "Running out fast!" section
      const lowStockItems = fetchedItems.filter(item => item.stock < 10);
      setRunningOutItems(lowStockItems);
    }

    fetchItems();
  }, []);

  return (
    <div className="ml-60 p-8">
      {/* Featured Items Section */}
      <h2 className="text-3xl font-bold mb-6 text-[#2e2e2e]">Featured Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 p-2 shadow-lg rounded-sm">
        {featuredItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Running Out Fast Section */}
      <h2 className="text-3xl font-bold mb-6 text-[#c85050]">Running out fast!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 p-2 shadow-lg rounded-sm">
        {runningOutItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* All Items Section */}
      <h2 className="text-3xl font-bold mb-6 text-[#2e2e2e]">All Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2 shadow-lg rounded-sm">
        {allItems.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}