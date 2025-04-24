'use client';

//If the user is an admin, they should be able to see all items in the system. Otherwise, they should only see orders that contain relevant items 
//ex.) If I sell item15, I should only see orders containing item15 

import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/app/Components/MyContext";
import { useRouter } from "next/navigation";

// Added functionality to sort orders by date.

export default function ViewOrders() {
  const router = useRouter();
  const { getOrders, userOrders, orderList, deleteOrder, setOrderList, isLoggedIn } = useContext(MyContext);
  const [sortedOrders, setSortedOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    // Sort orders by date whenever userOrders changes
    const sorted = [...userOrders].sort((a, b) => new Date(b.orderdate) - new Date(a.orderdate));
    setSortedOrders(sorted);
  }, [userOrders]);

  if (!isLoggedIn) {
    return (
      <div className="ml-20">
        <div className="ml-80 mt-2">
          <h1 className="text-3xl font-bold text-[#2e2e2e] mb-3">Please Login to View Orders</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-105 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#bea8aa] mb-6 text-center">All Orders</h1>

      {sortedOrders.length === 0 ? (
        <p className="text-center text-[#a8b2a1]">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {sortedOrders.map((order) => (
            <div
              key={order.orderid}
              className="bg-[#f8e7e7cb] border border-[#a8b2a1] rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow text-[#2e2e2e8c]"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-[#2e2e2e]">
                  <em>Order No. {order.orderid}</em>
                </h2>
                <span className="text-sm text-[#a8b2a1]">{new Date(order.orderdate).toLocaleDateString()}</span>
              </div>

              {/* Item 1 */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={order.item1_image || "https://via.placeholder.com/40"}
                  alt="Item 1"
                  className="w-12 h-12 object-cover rounded-full border border-[#a8b2a1]"
                />
                <div>
                  <p className="text-sm mb-1"><strong>Item:</strong> {order.item1_title}</p>
                  <p className="text-sm mb-1"><strong>Quantity:</strong> {order.item1_stock}</p>
                  <p className="text-sm mb-1"><strong>Description:</strong> {order.item1_description}</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={order.item2_image || "https://via.placeholder.com/40"}
                  alt="Item 2"
                  className="w-12 h-12 object-cover rounded-full border border-[#a8b2a1]"
                />
                <div>
                  <p className="text-sm mb-1"><strong>Item:</strong> {order.item2_title}</p>
                  <p className="text-sm mb-1"><strong>Quantity:</strong> {order.item2_stock}</p>
                  <p className="text-sm mb-1"><strong>Description:</strong> {order.item2_description}</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={order.item3_image || "https://via.placeholder.com/40"}
                  alt="Item 3"
                  className="w-12 h-12 object-cover rounded-full border border-[#a8b2a1]"
                />
                <div>
                  <p className="text-sm mb-1"><strong>Item:</strong> {order.item3_title}</p>
                  <p className="text-sm mb-1"><strong>Quantity:</strong> {order.item3_stock}</p>
                  <p className="text-sm mb-1"><strong>Description:</strong> {order.item3_description}</p>
                </div>
              </div>

              <p className="text-sm mb-4"><strong><b>Total:  ${parseFloat(order.price).toFixed(2)}</b></strong></p>

              <div className="flex gap-3">
                <button className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg text-sm ml-auto"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this order?")) {
                      deleteOrder(order.orderid);
                    }
                  }}>
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}