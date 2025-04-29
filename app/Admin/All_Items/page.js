"use client";

import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/app/Components/MyContext";
import ItemCard from "@/app/Components/ItemCard";
import EditItemModal from "@/app/Components/EditItemModal";


export default function AllItems() {
  const { getAllItems, deleteItem, isLoggedIn, userRole} = useContext(MyContext);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const allItems = await getAllItems();
      setItems(allItems);
    };

    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteItem(itemId);
      setItems(items.filter(item => item.id !== itemId));
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleEditSave = (updatedItem) => {
    setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
    setIsEditModalOpen(false);
  };


  if (!isLoggedIn || userRole !==1) {
    return (
     <div className="ml-60 mt-20 flex justify-center items-center h-[70vh]">
        <div className="bg-[#f5f0f2] border border-[#bea8aa] shadow-lg rounded-xl p-10 text-center max-w-xl">
          <h1 className="text-4xl font-bold text-[#e22c2c] mb-4">Access Denied</h1>
          <h1 className="text-4xl font-bold text-[#2e2e2e] mb-4">Sorry, Only Admin Can Access This Page!</h1>
          <p className="text-lg text-[#2e2e2e] mb-6">
            Nice try though!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-105 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#bea8aa] mb-6 text-center">All Items</h1>

      {items.length === 0 ? (
        <p className="text-center text-[#a8b2a1]">Loading Items...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item.id} className="relative">
              <ItemCard item={item} handleDelete={handleDelete}/>
              <div className="absolute top-2 right-2 flex gap-2">
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}