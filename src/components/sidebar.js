import Image from "next/image";
import React, { useState } from "react";

const Sidebar = ({ isOpen, toggleSidebar, menuItems }) => {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-60 dark:bg-dark-secondary bg-white p-6 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-40`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <Image
                src={"/Assets/logo.png"}
                width={50}
                height={50}
                alt="Uni-Hub Logo"
              />
              <h1 className="text-black dark:text-dark-text font-bold text-2xl">
                Uni-Hub
              </h1>
            </div>
            <hr className="border-1 border-black dark:border-white" />
          </div>
          <div>
            <ul className="ml-3">
              {menuItems.map((item, index) => (
                <li className="mb-4 my-10 text-black dark:text-dark-text" key={index}>
                  <a href="#" className="hover:text-gray-400" key={index}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex mb-10">
            <button className="text-black dark:text-dark-text hover:font-bold mx-1 py-2 px-4 font-medium rounded-full border-[2px] border-grey-100 ">
              Log In
            </button>
            <button className="text-black dark:text-dark-text hover:font-bold mx-1 py-2 px-4 font-medium rounded-full border-[2px] border-grey-100 ">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
