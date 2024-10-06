import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {  FolderClosed, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";

const Repositories = () => {
  return (
    <div className="container mx-20 mt-10 w-full h-[40vh]">
      <Card className="w-full h-full">
        <div className="flex flex-col gap-10">
          <div className="bg-[#E5E7EB] dark:bg-[#2E236C]">
          <div className="flex items-center gap-4 ">
              <FolderClosed size={30} className="text-slate-700" />
              <h1 className="text-4xl text-slate-700 dark:text-[#C8ACD6] md:text-3xl  font-bold ">
                Repositories
              </h1>
            </div>
            
          </div>
          {/* <div className="w-full flex justify-between bg-[#E5E7EB] dark:bg-[#2E236C] m-0 p-2">
            <div className="flex items-center gap-4 ">
              <FolderClosed size={30} className="text-slate-700" />
              <h1 className="text-4xl text-slate-700 dark:text-[#C8ACD6] md:text-3xl  font-bold ">
                Repositories
              </h1>
            </div>
            <div>
              <Button className="dark:bg-[#2E236C] dark:hover:bg-[#433D8B] h-12">
                <Plus className="mr-2"/>
                New
              </Button>
            </div>
          </div> */}
          
        </div>
      </Card>
    </div>
  );
};

export default Repositories;
