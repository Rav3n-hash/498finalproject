"use client";

import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/app/Components/MyContext";
import StoreCard from "@/app/Components/StoreCard"; // Import StoreCard


export default function AllUsers() {
  const { getAllUsers, deleteUser, isLoggedIn, userRole } = useContext(MyContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
      setUsers(users.filter(user => user.userid !== userId));
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
      <h1 className="text-3xl font-bold text-[#bea8aa] mb-6 text-center">All Users</h1>

      {users.length === 0 ? (
        <p className="text-center text-[#a8b2a1]">Loading Users...</p>
      ) : (
        <div className="space-y-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <StoreCard 
              key={user.userid} 
              user={user} 
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
