'use client';

import { useContext, useEffect, useState } from "react";

import orders from "../../Service/orders";
import items from "../../Service/items";
import users from "../../Service/users";
import { AddOrder } from "@/app/Service/OrderRoutes";
import { MyContext } from "@/app/Components/MyContext";



export default function ViewCart() {
  const {clearCart, removeItem, placeOrder}= useContext(MyContext);
  const [currentCart, setCurrentCart]=useState([]);
  const {isLoggedIn}=useContext(MyContext);

//TESTING: Fill the cart with all items
  useEffect(() => {
    const curCart = sessionStorage.getItem("cart");
    if(curCart){
      setCurrentCart(JSON.parse(curCart));
    }
  }, []);

  const total = currentCart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);


  if (!isLoggedIn){
    return(
      <div className="ml-20">
      <div className="ml-80 mt-2">
        <h1 className="text-3xl font-bold text-[#2e2e2e] mb-3">Please Login to View Cart</h1>
      </div>
    </div>

    )
  }

  return (
    <div className="ml-20">
      <div className="ml-80 mt-2">
        <h1 className="text-3xl font-bold text-[#2e2e2e] mb-3">Your Cart</h1>
      </div>

      <div className="flex flex-col justify-center items-center ml-30">
        <br />
        {currentCart.length === 0 ? (
          <p className="text-[#7c7f65]">You have not added any items to your order.</p>
        ) : (
          <div className="flex flex-wrap justify-left gap-6 shadow-lg bg-[#eed7e1] border-black/50 border-2 rounded-sm w-175">
                {currentCart.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 w-80 ml-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded border border-[#2e2e2e]"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-[#2e2e2e]">{item.name}</p>
                      <p className="text-sm text-[#7c7f65]">${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      className="text-xs bg-[#c85050] hover:bg-red-400 text-white px-2 py-1 rounded"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            
          
        )}

      <p className="mt-4 text-lg font-semibold text-[#7c7f65]">
        Order Total: ${total}
      </p>

    <div className="ml-3 flex flex-row gap-2">
      {currentCart.length > 0 && (
        <>
          <button
            onClick={clearCart}
            className="text-xs mt-4 p-2 bg-[#d44343] hover:bg-red-400 text-white rounded"
          >
            Clear Order
          </button>
          <button
            onClick={placeOrder}
            className="text-xs mt-4 p-2 bg-[#4ca06b] hover:bg-green-400 text-white rounded"
          >
            Place Order
          </button>
        </>
      )}
    </div>
    </div>
  </div>
  );
}
