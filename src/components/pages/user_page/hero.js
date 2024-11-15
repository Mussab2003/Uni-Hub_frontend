import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ScanSearch } from "lucide-react";
import { Card } from "@mui/material";

const Hero = ({ name }) => {
  console.log(name)
  const formattedName = name.replaceAll('%20', ' ')
  console.log(formattedName)
  console.log("Hello World")
  return (
    <div className="md:px-4 flex justify-center pt-28 w-full h-full md:h-[40vh]">
      <Card className="w-3/4 h-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 bg-[#E5E7EB] dark:bg-[#2E236C]  p-4">
            <h1 className="text-md text-slate-700 dark:text-[#C8ACD6] md:text-3xl  font-bold ">
              Welcome back, {formattedName}!
            </h1>
          </div>
          <div className="m-3 md:m-6 flex md:flex-row items-center gap-2">
            <input
              type="search"
              placeholder="Search for repositories..."
              className="w-full bg-[#F4F4F4]  md:h-14 dark:text-[#C8ACD6] md:text-lg border-gray-600 border-2 rounded-lg pl-5 pr-32 pt-30 focus:border-none"
            />
            <Button className="hidden md:block dark:bg-[#2E236C]  dark:hover:bg-[#433D8B] md:h-10 absolute right-56 mr-2 rounded-lg transition-transform scale-100 duration-200 active:scale-90">
              <div className="flex gap-1 justify-center items-center">
                <Search size={25} className="" />
                Search
              </div>
            </Button>

            <Search size={25} className="md:hidden" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Hero;
