"use client";
import { MyContext } from "./MyContext";
import { useContext } from "react";

export default function StoreCard({ user, handleDelete }) {
  const { userRole } = useContext(MyContext);

  return (
    <div className="bg-[#f8f8f8] rounded-2xl border border-gray-300 shadow-sm hover:shadow-md overflow-hidden">
      <img
        src={user.pic || null}
        alt={user.companyname}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#2e2e2e] mb-2">{user.firstname} {user.lastname}</h3>
        <p className="text-sm text-[#a8b2a1] mt-2 italic"><strong>Company:</strong> {user.companyname || "N/A"}</p>
        <p className="text-xs text-gray-400 mt-1 ml-2 italic">{user.companydesc || "No description available"}</p>

        {userRole === 1 && (
          <div className="flex justify-end mt-4">
            <button 
              className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg text-sm" 
              onClick={() => handleDelete(user.userid)} // Trigger delete
            >
              Delete User
            </button>
          </div>
        )}
      </div>
    </div>
  );
}