import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ScanSearch } from "lucide-react";
import { Card } from "@mui/material";

const Hero = ({name}) => {
  return (
    <div className="md:px-4 flex justify-center pt-28 w-full h-full md:h-[40vh]">
      <Card className="w-3/4 h-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 bg-[#E5E7EB] dark:bg-[#2E236C]  p-4">
            <h1 className="text-md text-slate-700 dark:text-[#C8ACD6] md:text-3xl  font-bold ">
              Welcome back, {name}!
            </h1>
          </div>
          <div className="m-3 md:m-6 flex md:flex-row items-center gap-2 ">
            <Input
              type="search"
              placeholder="Search for repositories..."
              className="w-full md:h-14 dark:text-[#C8ACD6] md:text-lg "
              />
            <Button className="hidden md:block dark:bg-[#2E236C] md:w-1/12 dark:hover:bg-[#433D8B] md:h-12">
              Search
            </Button>
            <Search size={25} className="md:hidden"/>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Hero;
