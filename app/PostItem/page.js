'use client';

import { useState } from 'react';

export default function PostItem() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    quantity: 1,
    image: '',
    price: '',
  });

  /************************************************HANDLE ALL INPUT CHANGES**************************************************/
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) : value,
    }));
  }

  /********************************************HANDLE SUBMISSION**************************************************/
  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.quantity ||
      !formData.image ||
      !formData.price
    ) {
      alert('Please fill out all fields to post an item');
      return;
    }

    // Replace with API call:
   
    console.log('Form submitted:', formData);
    alert('Item posted!');

    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      quantity: 1,
      image: '',
      price: '',
    });
  }

  /************************************************UI DISPLAY***************************************************/
  return (
    <div className="ml-80 mt-2 max-w-3/4 p-6 h-170 bg-[#eedce2] rounded-xl shadow-lg border-2 border-[#2e2e2e]/50">
      <h1 className="text-3xl font-bold text-[#2e2e2e] mb-6 text-center">Post a New Item</h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <div>
          <label className="block text-lg font-semibold text-[#2e2e2e] mb-1">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            placeholder="Item Title"
            required
            className="w-full border border-[#7c7f65] rounded px-4 py-2 bg-white focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-semibold text-[#2e2e2e] mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Item Description"
            required
            className="w-full border border-[#7c7f65] rounded px-4 py-2 bg-white resize-none h-24 focus:outline-none"
          />
        </div>

        {/* Category (as select dropdown) */}
        <div>
            <label className="block text-lg font-semibold text-[#2e2e2e] mb-1">Category</label>
            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-[#7c7f65] rounded px-4 py-2 bg-white focus:outline-none"
            >
                <option value="" disabled>Select a category</option>
                <option value="Jewelery">Jewelery</option>
                <option value="Bath and Body">Bath & Body</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Food">Food</option>
                <option value="Decor">Decor</option>
                <option value="Clothing">Clothing</option>
                <option value="Other">Other</option>
            </select>
        </div>

        {/* Quantity and Price */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-lg font-semibold text-[#2e2e2e] mb-1">Quantity</label>
            <input
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              type="number"
              min={1}
              required
              className="w-full border border-[#7c7f65] rounded px-4 py-2 bg-white focus:outline-none"
            />
          </div>

          <div className="flex-1">
            <label className="block text-lg font-semibold text-[#2e2e2e] mb-1">Price ($)</label>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              step="0.01"
              required
              className="w-full border border-[#7c7f65] rounded px-4 py-2 bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-lg font-semibold text-[#2e2e2e] mb-1">Image URL</label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            type="url"
            placeholder="https://example.com/image.jpg"
            required
            className="w-full border border-[#7c7f65] rounded px-4 py-2 bg-white focus:outline-none"
          />
        </div>

        {/* Image Preview */}
        {formData.image && (
          <div className="flex flex-col items-center mt-4">
            <img
              src={formData.image}
              alt="Preview"
              className="w-60 h-60 object-cover rounded-md border-2 border-dashed border-[#2e2e2e] shadow"
            />
            <p className="text-[#2e2e2e] mt-2">Image Preview</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-50 bg-[#7c7f65] hover:bg-[#a8b2a1] text-white font-semibold py-2 rounded transition duration-300"
        >
          Post Item
        </button>
      </form>
    </div>
  );
}