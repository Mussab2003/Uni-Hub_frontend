import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ScanSearch } from "lucide-react";
import { Card } from "@mui/material";

const Hero = ({name}) => {
  return (
    <div className="container mx-20 mt-10 w-full h-[40vh]">
      <Card className="w-full h-full">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4 bg-[#E5E7EB] dark:bg-[#2E236C]  p-2">
            <Search size={30} className="text-slate-700 dark:text-[#C8ACD6]"/>
            <h1 className="text-4xl text-slate-700 dark:text-[#C8ACD6] md:text-3xl  font-bold ">
              Search For Repositories {name}
            </h1>
          </div>
          <div className="m-6 flex items-center gap-2 ">
            <Input
              type="search"
              placeholder="Search repositories..."
              className="w-full h-14 dark:text-[#C8ACD6] text-lg "
            />
            <Button className="dark:bg-[#2E236C] w-1/12 dark:hover:bg-[#433D8B] h-12">
              Search
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Hero;
