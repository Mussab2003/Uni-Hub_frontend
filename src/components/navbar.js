"use client";
import Image from "next/image";
import React, { useState } from "react";
import Sidebar from "./sidebar";
import ThemeSwitch from "./theme_switch";

const navItems = ["Home", "Uni-Assignments", "Course Resources", "Map"];

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={navItems}
      />
      <div className="dark:bg-dark-background px-4 py-2 flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <Image
            src={"/Assets/logo.png"}
            width={50}
            height={50}
            alt="Uni-Hub Logo"
          />
          <h1 className="dark:text-dark-text hover:text-4xl font-bold text-3xl">Uni-Hub</h1>
        </div>
        <div className="flex gap-10">
          {navItems.map((item, index) => (
            <button
              className="dark:text-dark-text hover:font-bold hidden lg:block xl:block text-lg"
              key={index}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          <ThemeSwitch/>
          <div className="flex gap-2 items-center">
            <button className="dark:bg-dark-button dark:text-dark-text text-black hover:font-bold hidden lg:block xl:block py-2 px-5 font-medium rounded-full border-[2px] ">
              Log In
            </button>
            <button className="dark:bg-dark-button dark:text-dark-text text-black hover:font-bold hidden lg:block xl:block py-2 px-5 font-medium rounded-full border-[2px] border-grey-100 ">
              Sign Up
            </button>
          </div>
          {/* Menu Button */}
          <button className="lg:hidden xl:hidden" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 dark:text-white"
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
