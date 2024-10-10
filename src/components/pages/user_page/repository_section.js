import { Button } from "@/components/ui/button";
import { Card } from "@mui/material";
import { File, FolderClosed, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";

const RepositorySection = ({handleClickNewRepo}) => {
  return (
    <div className="mx-20 mt-10 w-full h-[40vh]">
      <Card className="w-full h-full">
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between bg-[#E5E7EB] dark:bg-[#2E236C]  p-4">
            <div className="flex items-center gap-4">
              <FolderClosed
                size={30}
                className="text-slate-700 dark:text-[#C8ACD6]"
              />
              <h1 className="text-4xl text-slate-700 dark:text-[#C8ACD6] md:text-3xl  font-bold ">
                Repositories
              </h1>
            </div>
            <div>
              <button onClick={handleClickNewRepo} className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-400 ">
                <div className="flex items-center gap-2">
                  <Plus />
                  New Repo
                </div>
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
