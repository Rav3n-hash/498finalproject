"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBagShopping, faUser, faPlusCircle, faSoap, faUtensils, faGem, faAppleAlt, faCouch, faShirt, faThList, faCartShopping, faFileInvoice, faIdCard, faLock, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import Link from "next/link";
import MiniLoginPanel from './LoginPanel';


export default function LeftNavbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const toggleCategories = () => {
    setShowCategoryMenu(!showCategoryMenu);
  };

  const profileOptions = [
    { name: " Logout", icon: faArrowRightFromBracket },
    { name: " View Profile", icon: faIdCard },
    { name: " View Orders", icon: faFileInvoice },
    { name: " View Cart", icon: faCartShopping },
  ];


  const profileLogin = [
    { name: " Login", icon: faLock },
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
        <Link href="/">Home
        </Link>
      </div>

{/**CATEGORIES*/}

<div className="ml-4 text-lg p-3 mb-2  hover:bg-[#cad9bc] hover:text-black/35 hover:transition-discrete duration-400">
      <FontAwesomeIcon icon={faBagShopping} className='mr-2' />
        <Link href="/">Browse
        </Link>
      </div>

{/**PROFILE "DROPDOWN" */}
      <button
        onClick={toggleProfileOptions}
        className="text-left ml-4 text-lg p-3 hover:bg-[#cad9bc] hover:text-black/35 transition duration-400 cursor-pointer"
      >
        <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
      </button>

      {/* Options */}
        {showProfileMenu && (
          <div className="ml-10 text-black/40">
            {profileOptions.map((option, index) => {
              const pathMap = {
                "View Profile":"/Profile",
                "View Orders":"/Profile/Orders",
                "View Cart":"/Profile/Cart",
              };

              const trimmedName = option.name.trim();
              const path = pathMap[trimmedName];
              if (!path) return null;

              return (
                <Link key={index} href={path}>
                  <div className="text-md p-2 hover:bg-[#cad9bc] rounded hover:text-black/35 transition duration-300 cursor-pointer">
                    <FontAwesomeIcon icon={option.icon} className="text-sm mr-2" />
                    {option.name}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      <div className="ml-4 text-lg p-3 hover:bg-[#cad9bc] hover:text-black/35 hover:transition-discrete duration-400">
      <Link href="/PostItem">
        <FontAwesomeIcon icon={faPlusCircle} className='mr-2' /> Post Item
        </Link>
      </div>

    <MiniLoginPanel/>
    </div >

  
   </>
  );

}