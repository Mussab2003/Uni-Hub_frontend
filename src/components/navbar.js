'use client';
import Image from "next/image";
import React, { useState } from "react";
import Sidebar from "./sidebar";

const navItems = ["Home", "Uni Assignments", "Course Resources", "Map"];

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="relative">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} menuItems={navItems}/>
      <div className="mx-4 mt-2 flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <Image
            src={"/Assets/logo.png"}
            width={50}
            height={50}
            alt="Uni-Hub Logo"
          />
          <h1 className="font-bold text-3xl">Uni-Hub</h1>
        </div>
        <div className="flex gap-10">
          {navItems.map((item, index) => (
            <button className="hidden lg:block xl:block text-lg" key={index}>
              {item}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button className="hidden lg:block xl:block py-2 px-5 font-medium rounded-full border-[2px] border-grey-100 ">
            Log In
          </button>
          <button className="hidden lg:block xl:block py-2 px-5 font-medium rounded-full border-[2px] border-grey-100 ">
            Sign Up
          </button>
          <button className="lg:hidden xl:hidden" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
