import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import React from "react";

const MenuSelect = ({handleFileUpload, handleFileChange, handleFolderDialog}) => {
  return (
    <div className="flex gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="md:block dark:bg-[#2E236C]  dark:hover:bg-[#433D8B]">
            <div className="flex gap-1 items-center rounded-full md:rounded-lg">
              <Plus />
              <h1 className="hidden md:block">Add</h1>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleFileUpload}>
            Upload File
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleFolderDialog}
          >
            New Folder
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        multiple
        type="file"
        className="hidden"
        id="fileInput"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default MenuSelect;
