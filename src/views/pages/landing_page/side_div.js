import React from "react";

const SideDiv = ({ title, paragraph, children }) => {
  return (
    <div className="flex flex-row bg-gradient-to-b items-center gap-3 w-full md:lg:w-1/4 from-lightGreen to-darkGreen  dark:bg-gradient-to-tr dark:from-dodgerBlue dark:to-darkBlack rounded-3xl p-7">
      <div className="flex flex-col gap-5 items-start">
        <div className="flex flex-col gap-3">
            <h1 className="font-bold text-2xl">{title}</h1>
            <p className="text-md font-semibold">{paragraph}</p>
        </div>
        <button className="border-[2px] py-2 px-5 rounded-full bg-white text-black hover:font-bold">
            For Details
        </button>
      </div>
      <div className="mt-2">
        {children}
    </div>
    </div>
  );
};

export default SideDiv;
