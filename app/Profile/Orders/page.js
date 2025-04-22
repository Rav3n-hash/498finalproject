'use client';



//If the user is an admin, they should be able to see all items in the system. Otherwise, they should only see orders that contain relevant items 
    //ex.) If I sell item15, I should only see orders containing item15 

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import mockOrders from "../../Service/orders";

export default function ViewOrders() {
  const [orderList, setOrderList] = useState([]);
  const router = useRouter();

  // Simulate fetching orders
  useEffect(() => {
    const simulateOrders = () => {
      console.log("Fetched Orders: ", JSON.stringify(mockOrders, null, 2));
      setOrderList(mockOrders); // Use the entire list of items
    };

    simulateOrders();
  }, []);

  // Delete an order (just alert)
  function handleDeleteOrder(id) {
    const confirmDelete = window.confirm(`Are you sure you want to delete order #${id}?`);
    if (confirmDelete) {
      alert(`Deleting Order #${id}`);
      setOrderList(prev => prev.filter(o => o.orderid !== id));
    }
  }

  return (
    <div className="ml-105 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#bea8aa] mb-6 text-center">All Orders</h1>

      {orderList.length === 0 ? (
        <p className="text-center text-[#a8b2a1]">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orderList.map((order, index) => (
            <div
              key={order.orderid}
              className="bg-[#f8e7e7cb] border border-[#a8b2a1] rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow text-[#2e2e2e8c]"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-[#2e2e2e]">Order #{order.id}</h2>
                <span className="text-sm text-[#a8b2a1]">
                  {order.orderDate}
                </span>
              </div>

              <p className="text-sm mb-2">
                <strong>User ID:</strong> {order.userId}
              </p>

              <p className="text-sm mb-2">
                <strong>Items:</strong>{" "}
                {[order.items[0].name, order.items[1].name,order.items[2].name ]
                  .filter(Boolean)
                  .join(", ")}
              </p>

              <p className="text-sm mb-4">
                <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => alert("Order confirmed")}
                  className="bg-[#7c7f65] hover:bg-[#a8b2a1] text-white px-4 py-2 rounded-lg text-sm"
                >
                  Confirm
                </button>
                <button
                  onClick={() => alert("Order denied")}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Deny
                </button>
                <button
                  onClick={() => handleDeleteOrder(order.orderid)}
                  className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg text-sm ml-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}