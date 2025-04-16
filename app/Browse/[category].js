"use client";

//brackets are used in title for dynamic route
import items from "../Service/items";
import { useRouter } from "next/router";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;


  // Normalize and filter items
  const filteredItems = items.filter(item =>
    item.category.toLowerCase() === category?.toLowerCase()
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">{category} Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div key={item.id} className="border p-4 rounded shadow bg-white">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p>{item.description}</p>
            <p className="mt-2 font-medium">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}