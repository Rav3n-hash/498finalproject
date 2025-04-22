"use client";

import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import users from "../Service/users";
import { LoginUser } from "../Service/UserRoutes";
import { MyContext } from "../Components/MyContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { isLoggedIn, updateLoggedIn } = useContext(MyContext);

  async function handleLogin() {
    try {
      const user = await LoginUser(email, password);

      if (user) {
        updateLoggedIn(true);
        sessionStorage.setItem("userid", user.userid);
        sessionStorage.setItem("fName", user.firstname);
        sessionStorage.setItem("lName", user.lastname);
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("pic", user.pic || "");
        sessionStorage.setItem("companyname", user.companyname || "");
        sessionStorage.setItem("logged", "1");
        
        router.push("/"); 
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  }


  return (
    <div className="flex items-center justify-center h-screen bg-[#cad9bc]">
      <div className="bg-white p-10 rounded-xl shadow-xl border border-[#a8b2a1] w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-[#2e2e2e] mb-6">Welcome Back</h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-[#cfc7d2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a8b2a1]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-[#cfc7d2] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a8b2a1]"
          />

          <button
            onClick={handleLogin}
            className="bg-[#a8b2a1] text-white py-3 rounded-md hover:bg-[#7c7f65] transition duration-300"
          >
            Login
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center mt-4 animate-pulse">{error}</p>
        )}
      </div>
    </div>
  );
}