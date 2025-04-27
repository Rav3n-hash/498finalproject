"use client";

export default function StoreCard({ user }) {
  return (
    <div className="bg-[#f8f8f8] rounded-2xl border border-gray-300 shadow-sm hover:shadow-md overflow-hidden">
      <img
        src={user.pic || null}
        alt={user.companyname}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#2e2e2e] mb-1">
          {user.companyname}
        </h3>
        <p className="ml-5 text-sm font-semibold italic text-gray-600">About:</p>
        <p className="ml-5 text-xs italic text-gray-400 mt-1">{user.companydesc}</p>
      </div>
    </div>
  );
}