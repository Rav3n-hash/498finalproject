"use client";

import { useContext, useState, useEffect } from "react";
import ItemCard from "../Components/ItemCard";
import StoreCard from "../Components/StoreCard";
import { MyContext } from "../Components/MyContext";

export default function Browse() {
  const { getItemsByCategory, getAllUsers, userRole, adminDelItem, deleteUser } = useContext(MyContext);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([{ catid: -1, category: "All" }]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(-1); // -1 means "All"
  const [shops, setShops] = useState([]);
  const [showShops, setShowShops] = useState(false); // controls toggle between items & stores
  

  // Fetch all items and categories on mount
  useEffect(() => {
    const fetchAll = async () => {
      const allItems = await getItemsByCategory(-1);
      setItems(allItems);

      const unique = new Map();
      allItems.forEach(item => unique.set(item.catid, item.category));
      const dynamicCats = Array.from(unique.entries()).map(([catid, category]) => ({ catid, category }));
      setCategories([{ catid: -1, category: "All Items" }, ...dynamicCats]);
    };

    fetchAll();
  }, [getItemsByCategory]);

  // Fetch items when category changes
  useEffect(() => {
    const fetch = async () => {
      const filtered = await getItemsByCategory(selectedCategoryId);
      setItems(filtered);
    };

    fetch();
  }, [selectedCategoryId, getItemsByCategory]);

  // Fetch users for store cards
  useEffect(() => {
    const fetchUsers = async () => {
      const shopList = await getAllUsers();
      setShops(shopList);
    };

    fetchUsers();
  }, []);

  const handleDeleteItem = async (item) => {
    if (confirm("Are you sure you want to delete this Item?")) {
      await adminDelItem(item.id); // <-- pass item.id only
      setItems(prevItems => prevItems.filter(i => i.id !== item.id)); // <-- fix the typo
    }
  };

  const handleDeleteUser = async (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
      setShops(prevShops => prevShops.filter(user => user.userid !== userId));
    }
  };


  return (
    <div className="ml-60 p-8">
      <h2 className="text-3xl font-bold mb-6 text-[#2e2e2e]">Browse Categories:</h2>

      <div className="mb-2 flex flex-wrap gap-4">
        {categories.map(({ catid, category }) => (
          <button
            key={catid}
            onClick={() => {
              setShowShops(false);
              setSelectedCategoryId(catid);
            }}
            className={`text-lg font-medium px-4 py-2 rounded-md ${
              selectedCategoryId === catid && !showShops ? "bg-[#7c7f65] text-white" : "bg-[#cfc7d2] text-[#2e2e2e]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <button
          onClick={() => setShowShops(prev => !prev)}
          className={`mb-2 text-lg font-medium px-4 py-2 rounded-md ${
            showShops ? "bg-[#7c7f65] text-white" : "bg-[#cfc7d2] text-[#2e2e2e]"
          }`}
        >
          All Stores
        </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {showShops
          ? shops.map(user => <StoreCard key={user.userid} user={user} handleDelete={userRole === 1 ? () => handleDeleteUser(user.userid) : null} />) //pass handledelete only if userRole is 1
          : items.map(item => <ItemCard key={item.id} item={item}  handleDelete={userRole === 1 ? () => handleDeleteItem(item) : null} />)}
      </div>
    </div>
  );
}