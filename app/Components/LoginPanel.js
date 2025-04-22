"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { MyContext } from "../Components/MyContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function MiniLoginPanel() {
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {
    isLoggedIn,
    fName,
    lName,
    pic,
    loginUser,
    updateLogout,
  } = useContext(MyContext);

  const router = useRouter();

  const handleLogout = () => {
    updateLogout();
    router.push("/");
  };

  const fullName = `${fName} ${lName}`.trim();

  return (
    <div className="p-4 mt-auto border-t border-[#7c7f65] text-sm text-[#2e2e2e]">
      {isLoggedIn ? (
        <>
          <div className="flex items-center gap-2 mb-2">
            <img
              src={pic || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-[#a8b2a1]"
            />
            <div>
              <p className="font-semibold">Hello,</p>
              <p className="text-[#7c7f65]">{fullName || "User"}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-[#a8b2a1] hover:bg-[#7c7f65] text-white py-2 rounded-md flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            Logout
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Email"
            className="w-full mb-2 p-2 border border-[#cfc7d2] rounded-md"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-2 p-2 border border-[#cfc7d2] rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => loginUser(emailInput, password, setError)}
            className="w-full bg-[#a8b2a1] hover:bg-[#7c7f65] text-white py-2 rounded-md"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </>
      )}
    </div>
  );
}
