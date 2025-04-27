import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/app/Components/MyContext";

export default function AllOrders() {
  const { getAllOrders, deleteOrder } = useContext(MyContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const allOrders = await getAllOrders();
      setOrders(allOrders);
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    if (confirm("Are you sure you want to delete this order?")) {
      await deleteOrder(orderId);
      setOrders(orders.filter(order => order.orderid !== orderId));
    }
  };

  return (
    <div className="ml-105 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#bea8aa] mb-6 text-center">All Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-[#a8b2a1]">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
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

              <p className="text-sm mb-4"><strong><b>Total:  ${parseFloat(order.price).toFixed(2)}</b></strong></p>

              <div className="flex gap-3">
                <button className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg text-sm ml-auto"
                  onClick={() => handleDelete(order.orderid)}>
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