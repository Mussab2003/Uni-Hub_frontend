import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Settings } from "lucide-react";
import React from "react";

const SettingSelect = ({handleDeleteRepo, handleEditRepo, properties}) => {
  return (
    <div className={"flex gap-3 " + properties}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="" variant='outline'>
            <div className="flex gap-1 items-center rounded-full md:rounded-lg">
              <Settings />
              <h1>Settings</h1>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleEditRepo}>
            Edit Repository
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteRepo}
          >
            Delete Repository
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SettingSelect;
