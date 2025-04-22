"use client";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext";

export default function EditItemModal() {
    const { editItem, setEditItem, updateItemInDB } = useContext(MyContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [image, setImage] = useState("");

    useEffect(() => {
        if (editItem) {
            setTitle(editItem.title || "");
            setDescription(editItem.description || "");
            setPrice(editItem.price || 0);
            setStock(editItem.stock || 0);
            setImage(editItem.image || "");
        }
    }, [editItem]);

    if (!editItem) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-[#f5f0f2] border border-[#bea8aa] p-8 rounded-xl shadow-2xl w-full max-w-lg">
                <h2 className="text-2xl font-bold text-[#2e2e2e] mb-6">Edit Item</h2>

                <label className="block text-sm font-medium text-[#2e2e2e] mb-1">Title</label>
                <input
                    type="text"
                    className="w-full mb-4 p-2 border border-[#cfc7d2] rounded-md"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label className="block text-sm font-medium text-[#2e2e2e] mb-1">Description</label>
                <textarea
                    className="w-full mb-4 p-2 border border-[#cfc7d2] rounded-md"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label className="block text-sm font-medium text-[#2e2e2e] mb-1">Price</label>
                <div className="relative mb-4">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">$</span>
                    <input
                        type="number"
                        className="w-full p-2 pl-7 border border-[#cfc7d2] rounded-md"
                        value={price ? price.toFixed(2) : "0.00"}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                    />
                </div>

                <label className="block text-sm font-medium text-[#2e2e2e] mb-1">Stock</label>
                <input
                    type="number"
                    className="w-full mb-4 p-2 border border-[#cfc7d2] rounded-md"
                    value={stock}
                    onChange={(e) => setStock(parseInt(e.target.value))}
                />

                <label className="block text-sm font-medium text-[#2e2e2e] mb-1">Image URL</label>
                <input
                    type="text"
                    className="w-full mb-6 p-2 border border-[#cfc7d2] rounded-md"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />


                <div className="flex justify-end gap-4">
                    <button
                        onClick={() =>
                            updateItemInDB({
                                id: editItem.id,
                                title,
                                description,
                                price,
                                stock,
                                image,
                            })
                        }
                        className="bg-[#7c7f65] hover:bg-[#65684e] text-white px-4 py-2 rounded-md"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setEditItem(null)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
