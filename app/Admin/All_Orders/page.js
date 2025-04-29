"use client";

import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/app/Components/MyContext";


export default function AllOrders() {
  const { getAllOrders, deleteOrder, isLoggedIn, userRole} = useContext(MyContext);
  const [orders, setOrders] = useState([]);
  const [sortedOrders, setSortedOrders] = useState([]); // Added state for sorted orders

  useEffect(() => {
    const fetchOrders = async () => {
      const allOrders = await getAllOrders();
      setOrders(allOrders);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const sorted = [...orders].sort((a, b) => new Date(b.orderdate) - new Date(a.orderdate));
    setSortedOrders(sorted); // Set the sorted orders
  }, [orders]); // Dependency on orders to re-sort when they change

  const handleDelete = async (orderId) => {
    if (confirm("Are you sure you want to delete this order?")) {
      await deleteOrder(orderId);
      setOrders(orders.filter(order => order.orderid !== orderId));
    }
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
      <h1 className="text-3xl font-bold text-[#bea8aa] mb-6 text-center">All Orders In System</h1>

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
                <h2 className="text-sm text-[#7f8c75] font-semibold">
                  <em>Placed By: {order.user_firstname} {order.user_lastname}</em>
                </h2>
                <h2 className="text-lg font-semibold text-[#2e2e2e]">
                  <em>Order No. {order.orderid}</em>
                </h2>
                <span className="text-sm text-[#a8b2a1]">{new Date(order.orderdate).toLocaleDateString()}</span>
              </div>

                {/* Item 1 */}
                {order.item1_title && (
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
              )}

              {/* Item 2 */}
              {order.item2_title && (
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
              )}

              {/* Item 3 */}
              {order.item3_title && (
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
              )}

              <div className="flex gap-3">
                <button
                  className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg text-sm ml-auto"
                  onClick={() => handleDelete(order.orderid)}
                >
                  Delete Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
