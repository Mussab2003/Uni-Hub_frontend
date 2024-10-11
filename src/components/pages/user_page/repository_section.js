import { Button } from "@/components/ui/button";
import { Card } from "@mui/material";
import { File, FolderClosed, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";

const RepositorySection = ({handleClickNewRepo}) => {
  return (
    <div className="md:px-4 flex justify-center w-full h-full">
      <Card className="w-3/4 h-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between p-2 md:p-4">
            <div className="flex items-center gap-1 md:gap-4">
              <FolderClosed
                size={25}
                className="text-black dark:text-[#C8ACD6]"
              />
              <h1 className="text-sm md:text-2xl text-slate-700 dark:text-[#C8ACD6]   font-bold ">
                Your Repositories
              </h1>
            </div>
            <div className="hidden md:block">
              <button onClick={handleClickNewRepo} className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-400 ">
                <div className="flex items-center gap-2">
                  <Plus />
                  New Repo
                </div>
              </button>
            </div>
            <div className="md:hidden">
              <button onClick={handleClickNewRepo} className="rounded-full bg-green-700 p-0.5 hover:bg-green-400">
                <Plus size={15} className="text-white"/>
              </button>
            </div>
          </div>
          <div className="m-6 flex items-center gap-2 ">
            
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RepositorySection;
