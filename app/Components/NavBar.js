"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBagShopping, faUser, faPlusCircle, faSoap, faUtensils, faGem, faAppleAlt, faCouch, faShirt, faThList, faCartShopping, faFileInvoice, faIdCard, faLock, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useState, useContext} from 'react';
import Link from "next/link";
import MiniLoginPanel from './LoginPanel';
import { MyContext } from './MyContext';

export default function LeftNavbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const {isLoggedIn} = useContext(MyContext);
  console.log("The user is logged in: ", isLoggedIn)

  const profileOptions = [
    { name: "View Profile", icon: faIdCard, path: "/Profile" },
    { name: "View Orders", icon: faFileInvoice, path: "/Profile/Orders" },
    { name: "View Cart", icon: faCartShopping, path: "/Profile/Cart" },
  ];

  const toggleProfileOptions = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <>
      <div className="w-60 h-screen bg-[#a8b2a1] text-[#2e2e2e] fixed left-0 top-0 flex flex-col">
        <div className='flex justify-center items-center mt-2'>
          <img
            src={"https://i.ibb.co/Y4bcHT4K/Login-Logo.png"}
            alt={"Site Logo"}
            className="w-full h-30 object-cover" />
        </div>

        <div className="ml-4 text-lg p-3 mb-2 mt-5 hover:bg-[#cad9bc] hover:text-black/35 hover:transition-discrete duration-400">
          <FontAwesomeIcon icon={faHome} className='mr-2' />
          <Link href="/">Home</Link>
        </div>

        <div className="ml-4 text-lg p-3 mb-2 hover:bg-[#cad9bc] hover:text-black/35 hover:transition-discrete duration-400">
          <FontAwesomeIcon icon={faBagShopping} className='mr-2' />
          <Link href="/Browse">Browse</Link>
        </div>

        {isLoggedIn ? (
          <>
            <button
              onClick={toggleProfileOptions}
              className="text-left ml-4 text-lg p-3 hover:bg-[#cad9bc] hover:text-black/35 transition duration-400 cursor-pointer"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
            </button>
            {showProfileMenu && (
              <div className="ml-10 text-black/40">
                {profileOptions.map((option, index) => (
                  <div
                    key={index}
                    className="text-md p-2 hover:bg-[#cad9bc] rounded hover:text-black/35 transition duration-300 cursor-pointer"
                    onClick={option.action || null}
                  >
                    <FontAwesomeIcon icon={option.icon} className="text-sm mr-2" />
                    {option.path ? <Link href={option.path}>{option.name}</Link> : option.name}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="ml-4 text-lg p-3 hover:bg-[#cad9bc] hover:text-black/35 hover:transition-discrete duration-400">
            <FontAwesomeIcon icon={faUser} className='mr-2' />
            <Link href="/Profile">Profile</Link>
          </div>
        )}

        <div className="ml-4 text-lg p-3 hover:bg-[#cad9bc] hover:text-black/35 hover:transition-discrete duration-400">
          <Link href="/PostItem">
            <FontAwesomeIcon icon={faPlusCircle} className='mr-2' /> Post Item
          </Link>
        </div>

        <MiniLoginPanel />
      </div>
    </>
  );
}