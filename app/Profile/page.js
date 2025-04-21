'use client';

import { useState } from 'react';
import allUsers from '../Service/users'; // mock user data
import allItems from '../Service/items'; // all item data

export default function UserProfile() {
  const user = allUsers[0]; // Mocked logged-in user

  const [items, setItems] = useState(
    allItems.filter(item => item.seller === user.username)
  );

  const handleEdit = (id) => {
    alert(`Edit item with ID ${id} (add route)`);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="ml-80 p-6 max-w-5xl bg-[#f5f0f2] rounded-xl shadow-lg border border-[#bea8aa]">
      {/* Store Header */}
      <div className="flex items-center gap-6 mb-10">
        <img
          src={user.storepic}
          alt="Store"
          className="w-40 h-40 object-cover rounded-sm border-4 border-[#7c7f65]"
        />
        <div>
          <h1 className="text-4xl font-bold text-[#2e2e2e]">{user.username}</h1>
          <p className="text-[#7c7f65] mt-2">{user.storedesc}</p>
        </div>
      </div>

      {/* Items List */}
      <h2 className="text-2xl font-semibold text-[#2e2e2e] mb-4">My Items</h2>
      <div className="grid grid-cols-2 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white border border-[#cfc7d2] rounded-lg shadow p-4 flex flex-col">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-3 text-[#2e2e2e]">{item.name}</h3>
            <p className="text-sm text-[#7c7f65]">{item.description}</p>
            <p className="mt-1"><span className="font-medium">Price:</span> ${item.price.toFixed(2)}</p>
            <p><span className="font-medium">Stock:</span> {item.stock}</p>

            <div className="mt-auto flex gap-2 pt-4">
              <button
                onClick={() => handleEdit(item.id)}
                className="flex-1 bg-[#a8b2a1] hover:bg-[#7c7f65] text-white py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="flex-1 bg-red-400 hover:bg-red-500 text-white py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}