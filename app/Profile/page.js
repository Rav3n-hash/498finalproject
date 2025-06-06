"use client";

import { useState, useEffect, useContext } from "react";
import { MyContext } from "../Components/MyContext";
import EditItemModal from "../Components/EditItemModal";
import MiniLoginPanel from '../Components/LoginPanel';
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const {
    getUserItems,
    fName,
    lName,
    pic,
    companyname,
    userItems,
    handleEditItem,
    deleteItem,
  } = useContext(MyContext);

  const [error, setError] = useState("");
  const {isLoggedIn}=useContext(MyContext);
  const router = useRouter();


  useEffect(() => {
    getUserItems(setError);
  }, []);



  if (!isLoggedIn) {
    return (
      <div className="ml-60 mt-20 flex justify-center items-center h-[70vh]">
        <div className="bg-[#f5f0f2] border border-[#bea8aa] shadow-lg rounded-xl p-10 text-center max-w-xl">
          <h1 className="text-4xl font-bold text-[#2e2e2e] mb-4">Sorry, Only Members Can Access This Page!</h1>
          <p className="text-lg text-[#7c7f65] mb-6">
              To Access Your Profile, Cart, and Orders, Please Login and Settle In.
          </p>
          <div className="flex justify-center items-center">
            <MiniLoginPanel/>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-80 p-6 max-w-5xl bg-[#f5f0f2] rounded-xl shadow-lg border border-[#bea8aa]">
      {/* Store Header */}
      <div className="flex items-center gap-6 mb-10">
        <img
          src={pic || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-40 h-40 object-cover rounded-sm border-4 border-[#7c7f65]"
        />
        <div>
          <h1 className="text-4xl font-bold text-[#2e2e2e]">{`${fName} ${lName}`}</h1>
          <p className="text-[#7c7f65] mt-2">{companyname}</p>
        </div>
      </div>

      {/* Items List */}
      <h2 className="text-2xl font-bold mb-4">My Items</h2>
      {userItems.length === 0 ? (
          <>
            <p className="text-[#7c7f65]">You have not posted any items yet.</p>
            <button
              className="text-[#7c7f65] italic underline font-semibold mt-2"
              onClick={() =>router.push("/PostItem")} 
            >
              Click here to post your first item!
            </button>
          </>
        ) : (
        <>
          {/* Error message if any */}
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-2 gap-4">
            {userItems.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <img
              src={item.image || "https://via.placeholder.com/300"}
              alt={item.title}
              className="w-full h-40 object-cover mb-2"
            />
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p>{item.description}</p>
            <p className="font-medium text-green-700">${item.price.toFixed(2)}</p>
            <p className="text-sm text-gray-600">{item.category}</p>

            <div className="mt-auto flex gap-2 pt-4">
              <button
                onClick={() => handleEditItem(item)}
                className="flex-1 bg-[#a8b2a1] hover:bg-[#7c7f65] text-white py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to delete this item?")) {
                    deleteItem(item.id);
                  }
                }}
                
                className="flex-1 bg-red-400 hover:bg-red-500 text-white py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
          </div>
        </>
      )}

      {/*popup modal if an item is being edited */}
      <EditItemModal />
    </div>
  );
}
