"use client";

import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="ml-60 p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#2e2e2e]">Admin Dashboard</h1>

      <div className="space-y-4">
        <Link href="/Admin/All_Orders">
          <div className="block p-3 text-lg hover:bg-[#cad9bc] hover:text-black/35 hover:transition-all duration-300 rounded">
            View All Orders
          </div>
        </Link>

        <Link href="/Admin/All_Users">
          <div className="block p-3 text-lg hover:bg-[#cad9bc] hover:text-black/35 hover:transition-all duration-300 rounded">
            View All Users
          </div>
        </Link>

        <Link href="/Admin/All_Items">
          <div className="block p-3 text-lg hover:bg-[#cad9bc] hover:text-black/35 hover:transition-all duration-300 rounded">
            View All Items
          </div>
        </Link>
      </div>
    </div>
  );
}