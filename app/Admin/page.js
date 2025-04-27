"use client";

import Link from "next/link";
import { useContext } from "react";
import { MyContext } from "../Components/MyContext";

export default function AdminPage() {
  const { isLoggedIn, userRole } = useContext(MyContext);

  if (!isLoggedIn || userRole !== 1) {
    return (
      <div className="ml-60 mt-20 flex justify-center items-center h-[70vh]">
        <div className="bg-[#f5f0f2] border border-[#bea8aa] shadow-lg rounded-xl p-10 text-center max-w-xl">
          <h1 className="text-4xl font-bold text-[#e22c2c] mb-4">Access Denied</h1>
          <h1 className="text-4xl font-bold text-[#2e2e2e] mb-4">Sorry, Only Admins Can Access This Page!</h1>
          <p className="text-lg text-[#2e2e2e] mb-6">
            Nice try though!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-60 p-8">
      <h1 className="text-4xl font-bold mb-10 text-[#2e2e2e]">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Orders Card */}
        <Link href="/Admin/All_Orders" className="block">
          <div className="bg-[#f5f0f2] border-2 border-[#bea8aa] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-[#2e2e2e]">Manage Orders</h2>
            <p className="text-[#2e2e2e] mb-2 font-semibold italic"> View all orders placed in the system.</p>
            <p className="text-[#2e2e2e] ml-2">Delete any orders that are inappropriate or fraudulent.</p>
          </div>
        </Link>

        {/* Users Card */}
        <Link href="/Admin/All_Users" className="block">
          <div className="bg-[#f5f0f2] border-2 border-[#bea8aa] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-[#2e2e2e]">Manage Users</h2>
          <p className="text-[#2e2e2e] mb-2 font-semibold italic"> View all users.</p>
          <p className="text-[#2e2e2e] ml-2">Delete any users by request or for inappropriate behavior</p>

          </div>
        </Link>

        {/* Items Card */}
        <Link href="/Admin/All_Items" className="block">
          <div className="bg-[#f5f0f2] border-2 border-[#bea8aa] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-[#2e2e2e]">Manage Items</h2>
            <p className="text-[#2e2e2e] mb-2 font-semibold italic"> View all posted items.</p>
          <p className="text-[#2e2e2e] ml-2">Delete any items that are fraudulent or against guidelines</p>
          </div>
        </Link>
      </div>
    </div>
  );
}