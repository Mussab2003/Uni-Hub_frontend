import { File, FolderIcon } from "lucide-react";
import React from "react";

const RepoItems = ({ itemType, itemName, itemTime, handleItemClick }) => {
  return (
    <div onDoubleClick={handleItemClick} className="w-full h-10 flex justify-between items-center py-4 px-4 md:px-7 gap-5 border-gray-500 border-b-2 bg-white hover:bg-gray-100">
      <div className="flex gap-5">
        {itemType == "folder" ? <FolderIcon/> : <File />}
        <h1>{itemName}</h1>
      </div>
      <div>
        <h1>{itemTime}</h1>
      </div>
    </div>
  );
};

export default RepoItems;
