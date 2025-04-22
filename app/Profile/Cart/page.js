'use client';

import { useEffect, useState } from "react";

import orders from "../../Service/orders";
import items from "../../Service/items";
import users from "../../Service/users";



export default function ViewCart() {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

//TESTING: Fill the cart with all items
  useEffect(() => {
    const simulateAllItemsInCart = () => {
      setOrder(items); // Use the entire list of items
      setLoading(false);
    };

    simulateAllItemsInCart();
  }, []);


//For actual fetching
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const res = await fetch(orders);
  //       const data = await res.json();
  //       const userId = sessionStorage.getItem("userId");
  //       // You can filter orders by userId if needed
  //       const userOrder = data.find((o) => o.userId === parseInt(userId));
  //       if (userOrder) {
  //         setOrder(userOrder.items);
  //       } else {
  //         setOrder([]);
  //       }
  //     } catch (err) {
  //       console.error("Failed to load orders:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, []);

  const clearOrder = () => {
    setOrder([]);
  };

  const removeItem = (indexToRemove) => {
    const updatedOrder = order.filter((_, index) => index !== indexToRemove);
    setOrder(updatedOrder);
  };

  const total = order?.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);

  const placeOrder = async () => {
    if (order.length > 3) {
      alert("You can only order up to 3 items at a time.");
      return;
    }

    // Fake success for now
    alert("Order placed!");
    clearOrder();
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading order...</div>;
  }

  return (
    <div className="ml-20">
      <div className="ml-80 mt-2">
        <h1 className="text-3xl font-bold text-[#2e2e2e] mb-4">Your Cart</h1>
        <p className="text-[#7c7f65] ml-75 text-2xl font-semibold">Items currently in the cart :</p>
      </div>

      <div className="flex flex-col justify-center items-center p-4 ml-30">
        <br />
        {order.length === 0 ? (
          <p className="text-[#7c7f65]">You have not added any items to your order.</p>
        ) : (
          <div className="flex flex-wrap justify-left gap-6 shadow-lg bg-[#eed7e1] border-black/50 border-2 rounded-sm w-175">
                {order.map((item, index) => (
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
      {order.length > 0 && (
        <>
          <button
            onClick={clearOrder}
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
