import React from "react";
import { IoDocumentText } from "react-icons/io5";

const MainDiv = () => {
  return (
    <div className="p-2  bg-gradient-to-b  from-lightGreen to-darkGreen  dark:bg-gradient-to-tr dark:from-dodgerBlue dark:to-darkBlack px-20 flex  flex-row  sm:justify-center md:justify-evenly lg:justify-evenly items-center w-full min-h-80 md:h-96 lg:h-96 rounded-b-2xl">
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-5xl dark:text-dark-text">
          View and upload <br />
          repositories
        </h1>
        <button className="px-2 dark:bg-dark-button dark:text-dark-text bg-white dark:bg-blue-gray-900 text-black hover:font-bold py-2 font-medium rounded-md w-full md:lg:w-1/3 border-[2px] border-green-300 dark:border-blue-300 ">
          Sign Up Now
        </button>
      </div>
      <div className="mt-2">
        <IoDocumentText size={250} className="hidden lg:flex md:flex" />
      </div>
    </div>
  );
};

export default MainDiv;
