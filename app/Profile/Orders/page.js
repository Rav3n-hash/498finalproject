'use client';

import { useEffect, useState } from "react";

import orders from ".../Service/orders";


export default function YourOrder() {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(orders);
        const data = await res.json();
        const userId = sessionStorage.getItem("userId");
        // You can filter orders by userId if needed
        const userOrder = data.find((o) => o.userId === parseInt(userId));
        if (userOrder) {
          setOrder(userOrder.items);
        } else {
          setOrder([]);
        }
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl text-pink-500 w-1/2">Your Order</h1>
      <br />
      {order.length === 0 ? (
        <p className="text-pink-500">You have not added any items to your order.</p>
      ) : (
        <div className="flex mt-5 justify-center items-center">
          <ul className="text-left bg-pink-100 p-4 rounded shadow-md w-80">
            {order.map((item, index) => (
              <li
                key={index}
                className="mb-2 border-b border-pink-300 pb-1 flex justify-between items-center"
              >
                <span>{item.name}</span>
                <button
                  className="text-xs bg-red-300 hover:bg-red-400 text-white px-2 py-1 rounded"
                  onClick={() => removeItem(index)}
                  title="Remove Item"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 text-lg font-semibold text-pink-600">
        Order Total: ${total}
      </p>

      {order.length > 0 && (
        <>
          <button
            onClick={clearOrder}
            className="text-xs mt-4 p-2 bg-red-300 hover:bg-red-400 text-white rounded"
          >
            Clear Order
          </button>
          <button
            onClick={placeOrder}
            className="text-xs mt-4 p-2 bg-green-300 hover:bg-green-400 text-white rounded ml-2"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}