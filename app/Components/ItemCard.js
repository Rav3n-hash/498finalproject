"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'; 
import { MyContext } from './MyContext';
import { useContext } from 'react';

export default function ItemCard({ item }) {
  const {updateCart}=useContext(MyContext);
  const {isLoggedIn}=useContext(MyContext);
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
          {item.stock < 10 ? (<span className="text-red-500">{item.stock} in stock</span>) : (<span className="text-gray-500">{item.stock} in stock</span>)}
        </div>
        <p className="text-xs text-gray-400">
          by {item.seller}
          {item.companyname ? ` @ ${item.companyname}` : ""}
        </p>

       {isLoggedIn?(
        <button
        className="ml-60 h-8 bg-red-400 hover:bg-red-300 rounded-sm text-black/50 w-30"
        onClick={() => updateCart(item)}
        > <FontAwesomeIcon icon={faCartShopping} className=' text-sm mr-2' />
        Add to Cart
        </button>
       ):""}
      </div>
    </div>
  );
}