'use client';

import { useState, useContext, useEffect } from 'react';
import {MyContext} from '../Components/MyContext';
import MiniLoginPanel from '../Components/LoginPanel';


export default function PostItem() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    quantity: 1,
    image: '',
    price: '',
  });

  const {isLoggedIn, addNewItem, getAllCategories}=useContext(MyContext);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const catList = await getAllCategories();
      setCategories(catList);
    }
    fetchCategories();
  }, []);

  /************************************************HANDLE ALL INPUT CHANGES**************************************************/
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) : value,
    }));
  }

  /********************************************HANDLE SUBMISSION**************************************************/
  async function handleSubmit(e) {
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

    try {
        const newItem = {
          userid: sessionStorage.getItem("userid"),
          title: formData.title,
          description: formData.description,
          catid: formData.category,
          quantityavailable: formData.quantity,
          image: formData.image,
          price: formData.price,
        };

      await addNewItem(newItem);

      alert('Item posted!');
      console.log('Item submitted:', newItem);

      setFormData({
        title: '',
        description: '',
        category: '',
        quantity: 1,
        image: '',
        price: '',
      });

    } catch (error) {
      console.error('Error posting item:', error);
      alert('Failed to post item');
    }
  }

  /************************************************UI DISPLAY***************************************************/

    if (!isLoggedIn) {
      return (
        <div className="ml-60 mt-20 flex justify-center items-center h-[70vh]">
          <div className="bg-[#f5f0f2] border border-[#bea8aa] shadow-lg rounded-xl p-10 text-center max-w-xl">
            <h1 className="text-4xl font-bold text-[#2e2e2e] mb-4">Sorry, Only Members Can Access This Page!</h1>
            <p className="text-lg text-[#7c7f65] mb-6">
              To Post An Item, Please Login.
            </p>
            <div className="flex justify-center items-center">
              <MiniLoginPanel/>
            </div>
          </div>
      </div>
      );
    }

  return (
    <div className="ml-130 mt-1 bg-[#f5f0f2] border border-[#bea8aa] shadow-lg rounded-xl p-4 text-center w-1/2 h-auto">
      <h1 className="text-3xl font-bold text-[#2e2e2e] mb-4 text-center">Post a New Item</h1>

      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Title */}
        <div>
          <label className="block text-lg font-semibold text-[#2e2e2e] mb-1 text-left">Title</label>
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
          <label className="block text-lg font-semibold text-[#2e2e2e] mb-1 text-left">Description</label>
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
            <label className="block text-lg font-semibold text-[#2e2e2e] mb-1 text-left">Category</label>
            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-[#7c7f65] rounded px-4 py-2 bg-white focus:outline-none"
            >
                <option value="" disabled>Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.catid} value={cat.catid}>{cat.category}</option>
                ))}
            </select>
        </div>

        {/* Quantity and Price */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-lg font-semibold text-[#2e2e2e] mb-1 text-left">Quantity</label>
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
            <label className="block text-lg font-semibold text-[#2e2e2e] mb-1 text-left">Price ($)</label>
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
      <div className="flex flex-row">
        <div className='flex flex-col'>
          <label className="block text-lg font-semibold text-[#2e2e2e] mb-1 text-left">Image URL</label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            type="url"
            placeholder="https://example.com/image.jpg"
            required
            className="w-100 border border-[#7c7f65] rounded px-4 py-2 bg-white focus:outline-none"
          />
        </div>

        {/* Image Preview */}
        {formData.image && (
          <div className="flex flex-col items-center mt-4 ml-20">
            <img
              src={null||formData.image}
              className="w-30 h-30 object-cover rounded-md border-2 border-dashed border-[#2e2e2e] shadow"
            />
            <p className="text-[#2e2e2e] mt-2">Image Preview</p>
          </div>
        )}

      </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-50 h-10 bg-[#7c7f65] hover:bg-[#a8b2a1] text-white font-semibold py-2 rounded transition duration-300"
        >
          Post Item
        </button>
      </form>
    </div>
  );
}