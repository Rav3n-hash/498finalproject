"use client";

export default function ItemCard({ item }) {
  return (
    <div className="bg-[#cfcd2] rounded-2xl shadow-md hover:shadow-lg hover:bg-black/10 overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#2e2e2e] mb-1">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="text-[#a8b2a1] font-medium">${item.price.toFixed(2)}</span>
          {item.stock < 10 ? (<span className="text-red-500">{item.stock} in stock</span>) : (<span className="text-gray-500">{item.stock} in stock</span>)}
        </div>
        <p className="text-xs text-gray-400">
          by {item.seller}
          {item.companyname ? ` @ ${item.companyname}` : ""}
        </p>
      </div>
    </div>
  );
}