"use client"
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    pic: "",
    companyname: "",
    companydesc: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.firstname.trim()) newErrors.firstname = "First name is required.";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required.";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (!formData.companyname.trim()) newErrors.companyname = "Company name is required.";
    if (!formData.companydesc.trim()) newErrors.companydesc = "Company description is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-2">
    <div className="flex flex-col ml-60 p-5 shadow-lg bg-gray-200/50 border-2 border-black h-170 w-200 rounded-sm">
      <h2 className="text-3xl font-bold mb-6 text-[#2e2e2e]">Sign Up</h2>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-lg">
        <div className="ml-10">
          <label className="block text-sm font-medium text-[#2e2e2e]">First Name</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
        </div>

        <div className="ml-10">
          <label className="block text-sm font-medium text-[#2e2e2e]">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
        </div>

        <div className="ml-10">
          <label className="block text-sm font-medium text-[#2e2e2e]">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="ml-10">
          <label className="block text-sm font-medium text-[#2e2e2e]">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="ml-10">
          <label className="block text-sm font-medium text-[#2e2e2e]">Profile Picture URL</label>
          <input
            type="text"
            name="pic"
            value={formData.pic}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="ml-10">
          <label className="block text-sm font-medium text-[#2e2e2e]">Company Name</label>
          <input
            type="text"
            name="companyname"
            value={formData.companyname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.companyname && <p className="text-red-500 text-sm">{errors.companyname}</p>}
        </div>

        <div className="ml-10">
          <label className="block text-sm font-medium text-[#2e2e2e]">Company Description</label>
          <textarea
            name="companydesc"
            value={formData.companydesc}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
          {errors.companydesc && <p className="text-red-500 text-sm">{errors.companydesc}</p>}
        </div>

        <button
          type="submit"
          className="ml-10 bg-[#7c7f65] text-white px-4 py-2 rounded-md hover:bg-[#5a5d4a]"
        >
          Sign Up
        </button>
      </form>
    </div>
    </div>
  );
}