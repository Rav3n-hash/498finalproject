"use client"; 

import { useState, useContext } from "react";
import { MyContext } from "../Components/MyContext";

export default function SignUp() {
  const { addNewUser, loginUser, isLoggedIn } = useContext(MyContext);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    pic: "",
    companyname: "",
    companydesc: "",
    role: "", // This will be the admin code or the role value
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [adminMessage, setAdminMessage] = useState(""); // For showing the admin access message

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    //Get the user role according to if correct code was entered: 
    const userRole = formData.role === "SuperSecret123" ? 1 : 0;

      const finalFormData = { 
        ...formData, 
        role: userRole
      };

      console.log("Form submitted:", finalFormData);
      try {
        await addNewUser(finalFormData);
        alert('User created successfully!');
        await loginUser(finalFormData.email, finalFormData.password, setError);

        // reset form
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          pic: "",
          companyname: "",
          companydesc: "",
          role: "",
        });
        setIsSignedUp(true);
      } catch (err) {
        console.error('Failed to create user:', err);
        alert('Something went wrong.');
      }
    }

  if (isSignedUp || isLoggedIn) {
    return (
      <div className="ml-60 mt-20 flex justify-center items-center h-[70vh]">
        <div className="bg-[#f5f0f2] border border-[#bea8aa] shadow-lg rounded-xl p-10 text-center max-w-xl">
          <h2 className="text-3xl font-bold mb-6 text-[#2e2e2e]">Sign Up Successful!</h2>
          <p className="text-lg text-[#2e2e2e]">Welcome to Harvest Lane, {sessionStorage.getItem("fName")}!</p>
          <p className="text-lg text-[#2e2e2e]">You are now logged in!</p>
          <p className="text-lg text-[#e02828]">You are {sessionStorage.getItem("role") === "1"? "an Admin" : "a Normal User"}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center mt-2">
      <div className="flex flex-col ml-60 p-5 shadow-lg bg-gray-200/50 border-2 border-black h-auto w-200 rounded-sm">
        <h2 className="text-3xl font-bold mb-6 text-[#2e2e2e]">Sign Up</h2>

        {adminMessage && (
          <div className="text-center text-green-500 font-medium mb-4">
            {adminMessage}
          </div>
        )}

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

          <div className="ml-10">
            <label className="block text-sm font-medium text-[#2e2e2e]">Admin Code</label>
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
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
