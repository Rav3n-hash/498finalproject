"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import users from "../Service/users";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MiniLoginPanel() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("loggedInUser");
    if (stored) {
      setLoggedInUser(JSON.parse(stored));
    }
  }, []);

  const handleLogin = () => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      sessionStorage.setItem("loggedIn", 1);
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      setLoggedInUser(user);
      setUsername("");
      setPassword("");
      setError("");
    } else {
      setError("Invalid login");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    router.push("/");
  };

  if (loggedInUser) {
    return (
      <div className="p-4 mt-auto border-t border-[#7c7f65] text-sm text-[#2e2e2e]">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={loggedInUser.picture || "https://via.placeholder.com/40"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-[#a8b2a1]"
          />
          <div>
            <p className="font-semibold">Hello,</p>
            <p className="text-[#7c7f65]">{loggedInUser.username}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-[#a8b2a1] hover:bg-[#7c7f65] text-white py-2 rounded-md flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 mt-auto border-t border-[#7c7f65] text-sm text-[#2e2e2e]">
      <input
        type="text"
        placeholder="Username"
        className="w-full mb-2 p-2 border border-[#cfc7d2] rounded-md"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-2 p-2 border border-[#cfc7d2] rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-[#a8b2a1] hover:bg-[#7c7f65] text-white py-2 rounded-md"
      >
        Login
      </button>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
}