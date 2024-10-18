"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth_context";
import axios from "axios";
import { Card } from "@mui/material";
import { Images, MoveLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUploader } from "react-drag-drop-files";
import RepoItems from "@/components/pages/repo_page/repo_items";
import { timeConverter } from "@/lib/utils";
import { useRouter } from "next/navigation";
import ChildDialog from "@/components/pages/repo_page/new_folder_dialog";

const RepoPage = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [states, setStates] = useState({
    isDialogOpen: false,
    formType: "",
  });
  const { name, token, loading } = useAuth();
  const [repoInfo, setRepoInfo] = useState({
    id: "",
    name: "",
    description: "",
    availability: "",
    parent_folder_id: null,
  });
  const [folderData, setFolderData] = useState([]);
  const [parentFolderId, setParentFolderId] = useState([]);

  useEffect(() => {
    const fetchRepoInfoData = async () => {
      if (!loading && token) {
        try {
          const newPath = pathName.replace("/user-page/", "");
          const response = await axios.get(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/repo/" + newPath,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setRepoInfo({
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            availability: response.data.availability,
          });
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      }
    };
    const fetchFolderData = async () => {
      if (!loading && token) {
        try {
          const newPath = pathName.replace("/user-page/", "");
          const data = {
            repo_id: newPath,
          };
          const response = await axios.post(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/folder/self",
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          setFolderData(response.data);
          console.log(folderData);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      }
    };
    fetchRepoInfoData();
    fetchFolderData();
  }, [loading, token, pathName, states.isDialogOpen]);

  const handleFolderClick = (folderId) => {
    setParentFolderId([...parentFolderId, folderId]);
  };

  const handleBackButton = () => {
    setParentFolderId((item) => item.slice(0, item.length - 1));
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col gap-10 items-center">
        <div className="w-full md:w-3/4 pt-28 flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              {parentFolderId.length > 0 && (
                <MoveLeft onClick={handleBackButton} />
              )}
              <h1 className="text-lg md:text-2xl font-bold">{repoInfo.name}</h1>
            </div>
            <div className="flex gap-3">
              <Button>
                <Plus />
                Upload File
              </Button>
              <Button
                onClick={() => {
                  setStates({ isDialogOpen: true, formType: "new" });
                }}
              >
                <Plus />
                New Folder
              </Button>
            </div>
          </div>
          <hr className="border-2 " />
        </div>
        {folderData.length == 0 ? (
          <div className="w-full flex justify-center">
            <FileUploader
              multiple={true}
              label="Drag and drop files and folders"
              onDrop={(files) => console.log(files)}
              className="w-full"
            >
              <div className="border-dotted border-2 border-black flex flex-col gap-4 justify-center items-center p-2 w-[70vw] h-[50vh]">
                <Images size={50} />
                <div>
                  <p>Drag & drop</p>
                  <p>or browse</p>
                </div>
              </div>
            </FileUploader>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <Card className="w-full  md:w-3/4 h-[50vh]">
              <div className="h-12 py-2 px-6 bg-[#E5E7EB] flex items-center">
                <h1
                  onClick={() => {
                    router.push("/user-page");
                  }}
                  className="font-medium text-2xl"
                >
                  {name}
                </h1>
              </div>
              {folderData
                .filter(
                  (folder) =>
                    folder.parent_id ==
                    parentFolderId[parentFolderId.length - 1]
                )
                .map((folder) => (
                  <RepoItems
                    key={folder.id}
                    itemName={folder.name}
                    itemType={"folder"}
                    itemTime={timeConverter(folder.created_at)}
                    handleItemClick={() => {
                      handleFolderClick(folder.id);
                    }}
                  />
                ))}
            </Card>
          </div>
        )}
      </div>
      <ChildDialog
        isOpen={states.isDialogOpen}
        onClose={() =>
          setStates((prev) => ({
            ...prev,
            isDialogOpen: false,
          }))
        }
        formType={states.formType}
        repo_id={repoInfo.id}
        parent_folder_id={
          parentFolderId.length > 0
            ? parentFolderId[parentFolderId.length - 1]
            : null
        }
      />
    </>
  );
};

export default RepoPage;
