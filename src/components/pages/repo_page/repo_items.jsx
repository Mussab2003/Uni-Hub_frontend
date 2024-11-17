import { Delete, Download, File, FolderIcon, Recycle, Trash } from "lucide-react";
import React from "react";
import { CircularProgress } from "@mui/material";

const RepoItems = ({
  itemType,
  itemName,
  itemTime,
  handleItemClick,
  handleFileDownload,
  handleDelete,
  loading,
}) => {
  return (
    <div
      className="w-full h-10 flex justify-between items-center py-4 px-4 md:px-7 gap-5 border-gray-200 border-b-2 bg-white hover:bg-gray-100 "
    >
      <div className="flex gap-5">
        {itemType == "folder" ? <FolderIcon /> : <File />}
        <div className="flex gap-4">
        <h1 className="cursor-pointer underline-offset-2 hover:underline hover:text-blue-500" onClick={handleItemClick}>{itemName}</h1>
        <h1 className="font-light text-gray-600">{itemTime}</h1>
        </div>
      </div>
      <div className="flex gap-3 justify-evenly">
        {itemType == "file" && (
          <>
            {loading ? (
              <CircularProgress size={20} color="black"/>
            ) : (
              <Download
                className="hover:text-blue-900"
                onClick={handleFileDownload}
              />
            )}
          </>
        )}
        <Trash className="hover:text-red-500" onClick={handleDelete}/>
        
      </div>
    </div>
  );
};

export default RepoItems;
