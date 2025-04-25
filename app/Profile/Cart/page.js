'use client';

import { useContext, useEffect } from "react";
import { MyContext } from "@/app/Components/MyContext";
import MiniLoginPanel from '@/app/Components/LoginPanel';

export default function ViewCart() {
  const { cart, clearCart, removeItem, placeOrder } = useContext(MyContext);
  const {isLoggedIn}=useContext(MyContext);

  const total = cart?.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2) || "0.00";
  useEffect(() => {
    console.log("Cart in ViewCart:", cart);
  }, [cart]);

  /************************************************UI DISPLAY**************************************************/
    if (!isLoggedIn) {
      return (
        <div className="ml-60 mt-20 flex justify-center items-center h-[70vh]">
          <div className="bg-[#f5f0f2] border border-[#bea8aa] shadow-lg rounded-xl p-10 text-center max-w-xl">
            <h1 className="text-4xl font-bold text-[#2e2e2e] mb-4">Sorry, Only Members Can Access This Page!</h1>
            <p className="text-lg text-[#7c7f65] mb-6">
              To access your profile, cart, and orders, please log in and settle in.
            </p>
            <div className="flex ml-25 w-75">
              <MiniLoginPanel/>
            </div>
          </div>
        </div>
      );
    }

  return (
    <div className="ml-20">
      <div className="ml-80 mt-2">
        <h1 className="text-3xl font-bold text-[#2e2e2e] mb-3">Your Cart</h1>
      </div>

      <div className="flex flex-col justify-center items-center ml-30">
        <br />
        {cart?.length === 0 ? (
          <p className="text-[#7c7f65]">You have not added any items to your order.</p>
        ) : (
          <div className="flex flex-wrap justify-left gap-6 shadow-lg bg-[#eed7e1] border-black/50 border-2 rounded-sm w-175">
            {cart?.map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-2 w-80 ml-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded-full border border-[#a8b2a1]"
                />
                <div className="flex-1">
                  <p className="font-medium text-[#2e2e2e]">{item.title}</p>
                  <p className="text-sm text-[#7c7f65]">
                    ${parseFloat(item.price || 0).toFixed(2)}
                  </p>
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
          {cart?.length > 0 && (
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
