import {
  Brain,
  Download,
  File,
  FileText,
  FolderIcon,
  Trash,
} from "lucide-react";
import React from "react";
import { CircularProgress } from "@mui/material";
import { Tooltip } from "@mui/material";

// const RepoItems = ({
//   itemType,
//   itemName,
//   itemTime,
//   handleItemClick,
//   handleFileDownload,
//   handleDelete,
//   handleNotes,
//   handleQuiz,
//   loading,
//   isOwner,
//   token,
// }) => {
//   return (
//     <div className="w-full flex justify-between items-center py-4 px-4 md:px-7 gap-5 border-gray-200 border-b-2 bg-white hover:bg-gray-100 ">
//       <div className="flex gap-5 items-center">
//         {itemType == "folder" ? <FolderIcon size={25}/> : <File  className="" size={25}/>}
//         <div className="flex gap-4">
//           <h1
//             className="text-xs md:text-md cursor-pointer underline-offset-2 hover:underline hover:text-blue-500"
//             onClick={handleItemClick}
//           >
//             {itemName}
//           </h1>
//           <h1 className="font-light text-gray-600">{itemTime}</h1>
//         </div>
//       </div>
//       <div className="flex gap-3 justify-evenly">
//         {itemType == "file" && (
//           <>
//             {loading ? (
//               <CircularProgress size={20} color="black" />
//             ) : (
//               <div>
//                 <Tooltip title="download file">
//                   <Download
//                     className="hover:text-blue-900"
//                     onClick={handleFileDownload}
//                   />
//                 </Tooltip>
//               </div>
//             )}
//           </>
//         )}
//         {token && (<>
//           <Tooltip title='AI feature that create notes of the document'>
//             <FileText onClick={handleNotes} className="hover:text-blue-900"/>
//           </Tooltip>
//           <Tooltip title='AI feature that create quiz questions of the document'>
//             <Brain onClick={handleQuiz} className="hover:text-blue-900"/>
//           </Tooltip>
//         </>)}
//         {isOwner && (
//           <div>
//             <Tooltip title='delete file'>
//               <Trash className="hover:text-red-500" onClick={handleDelete} />
//             </Tooltip>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

const RepoItems = ({
  itemType,
  itemName,
  itemTime,
  handleItemClick,
  handleFileDownload,
  handleDelete,
  handleNotes,
  handleQuiz,
  loading,
  isOwner,
  token,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row py-4 px-4 h-32 md:px-7 gap-2 md:gap-3 border-gray-200 border-b-2 bg-white hover:bg-gray-100">
      <div className="flex items-center gap-3">
        {itemType == "folder" ? (
          <FolderIcon size={25} />
        ) : (
          <File className="" size={25} />
        )}
        <h1
          className="text-sm md:text-lg cursor-pointer underline-offset-2 hover:underline hover:text-blue-500"
          onClick={handleItemClick}
        >
          {itemName}
        </h1>
      </div>
      <div className="flex justify-end">
        <h1 className="text-xs md:text-md font-light text-gray-600">
          {itemTime}
        </h1>
      </div>
      <div className="flex gap-3 justify-evenly">
        {itemType == "file" && (
          <>
            {loading ? (
              <CircularProgress size={20} color="black" />
            ) : (
              <div>
                <Tooltip title="download file">
                  <Download
                    className="hover:text-blue-900"
                    onClick={handleFileDownload}
                  />
                </Tooltip>
              </div>
            )}
          </>
        )}
        {token && (
          <>
            <Tooltip title="AI feature that create notes of the document">
              <FileText onClick={handleNotes} className="hover:text-blue-900" />
            </Tooltip>
            <Tooltip title="AI feature that create quiz questions of the document">
              <Brain onClick={handleQuiz} className="hover:text-blue-900" />
            </Tooltip>
          </>
        )}
        {isOwner && (
          <div>
            <Tooltip title="delete file">
              <Trash className="hover:text-red-500" onClick={handleDelete} />
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoItems;
