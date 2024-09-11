"use client";
import Image from "next/image";
import React, { useState } from "react";
import Sidebar from "./sidebar";

const navItems = ["Home", "Uni-Assignments", "Course Resources", "Map"];

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const darkThemeMq = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useState(darkThemeMq() || true);
  console.log(isDark);
  const toggleTheme = () => {
    setIsDark((prev) => {
      const newDarkState = !prev;
      document.documentElement.classList.toggle("dark", newDarkState);
      return newDarkState;
    });
  };

  return (
    <div className="relative">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        menuItems={navItems}
      />
      <div className="dark:bg-dark-background dark:border-b-4 dark:border-dark-secondary px-4 py-2 flex items-center justify-between">
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
        <div className="flex gap-3">
          <button onClick={toggleTheme}>
            {!isDark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 hover:size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 hover:size-10 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            )}
          </button>
          <button className="dark:bg-lime-50 hover:font-bold hidden lg:block xl:block py-2 px-5 font-medium rounded-full border-[2px] border-grey-100 ">
            Log In
          </button>
          <button className="dark:bg-lime-50 hover:font-bold hidden lg:block xl:block py-2 px-5 font-medium rounded-full border-[2px] border-grey-100 ">
            Sign Up
          </button>
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
