"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { MyContext } from './MyContext';
import { useContext } from 'react';

export default function ItemCard({ item, handleDelete }) {
  const {updateCart, isLoggedIn, userRole}=useContext(MyContext);

  return (
    <div className="bg-[#cfcd2] rounded-2xl border-2 border-black/25 shadow-sm hover:shadow-md hover:shadow-[#dcf7c9] hover:bg-gray-200/20 overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#2e2e2e] mb-1">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="text-[#a8b2a1] font-medium">${item.price.toFixed(2)}</span>
          {item.stock < 10 ? (
            <span className="text-red-500">{item.stock} in stock</span>
          ) : (
            <span className="text-gray-500">{item.stock} in stock</span>
          )}
        </div>
        <p className="text-xs text-gray-400">
          by {item.seller}
          {item.companyname ? ` @ ${item.companyname}` : ""}
        </p>

        {isLoggedIn && (
          userRole === 1 ? (
            // Admins see "Delete Item"
            <button
              className="ml-60 h-8 bg-red-500 hover:bg-red-400 text-white rounded-sm w-32 flex items-center justify-center gap-2"
              onClick={() => handleDelete(item)}
            >
              <FontAwesomeIcon icon={faTrash} className="text-sm" />
              Delete Item
            </button>
          ) : (
            // Regular users see "Add to Cart"
            <button
              className="ml-60 h-8 bg-red-400 hover:bg-red-300 text-black/50 rounded-sm w-32 flex items-center justify-center gap-2"
              onClick={() => updateCart(item)}
            >
              <FontAwesomeIcon icon={faCartShopping} className="text-sm" />
              Add to Cart
            </button>
          )
        )}
      </div>
    </div>
  );
}