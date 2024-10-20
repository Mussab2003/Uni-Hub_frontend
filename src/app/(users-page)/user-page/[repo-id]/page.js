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
import CircularProgress from "@mui/material/CircularProgress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [fileData, setFileData] = useState([]);
  const [parentFolderId, setParentFolderId] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  useEffect(() => {
    const fetchRepoInfoData = async () => {
      setPageLoading(true);
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
          setPageLoading(false);
        } catch (err) {
          console.error("Error fetching data:", err);
          setPageLoading(false);
        }
      }
    };

    fetchRepoInfoData();
  }, [loading, token, pathName]);

  //Fetching folder data
  useEffect(() => {
    const fetchFolderData = async () => {
      setPageLoading(true);
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
          setFolderData(response.data);
          setPageLoading(false);
        } catch (err) {
          console.error("Error fetching data:", err);
          setPageLoading(false);
        }
      }
    };
    fetchFolderData();
  }, [loading, token, pathName, states.isDialogOpen]);

  //Fetching file data
  useEffect(() => {
    const fetchFileData = async () => {
      setPageLoading(true);
      console.log("Fetching file data");
      if (!loading && token) {
        console.log("Fetching file data inside");
        try {
          console.log(pathName);
          const newPath = pathName.replace("/user-page/", "");
          const data = {
            repo_id: newPath,
          };
          const response = await axios.post(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/file",
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          setFileData(response.data);
          setPageLoading(false);
        } catch (err) {
          console.error("Error fetching data:", err);
          setPageLoading(false);
        }
      }
    };
    fetchFileData();
  }, [loading, token, pathName, isFileUploaded]);

  const handleFolderClick = (folderId) => {
    setParentFolderId([...parentFolderId, folderId]);
  };

  const handleBackButton = () => {
    setParentFolderId((item) => item.slice(0, item.length - 1));
  };

  const handleFileUpload = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = async (event) => {
    setPageLoading(true);
    const files = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        console.log(parentFolderId[parentFolderId.length - 1]);
        const formData = new FormData();
        formData.append("document", files[i]);
        formData.append("repo_id", repoInfo.id);
        formData.append("folder_id", parentFolderId[parentFolderId.length - 1]);

        try {
          const response = await axios.post(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/file/create",
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(response.data);
          setIsFileUploaded(true);
        } catch (err) {
          console.log(err);
        }
      }
    }
    console.log(files.length);
    console.log(files);
    setPageLoading(false);
  };
  return (
    <>
      <div className="min-h-screen w-full flex flex-col gap-10 items-center mx-2">
        <div className="w-full md:w-3/4 pt-28 flex flex-col gap-2">
          <div className="flex justify-between mx-2">
            <div className="flex gap-2 md:gap-4 items-center">
              {parentFolderId.length > 0 ? (
                <MoveLeft onClick={handleBackButton} />
              ) : (
                <MoveLeft
                  onClick={() => {
                    router.push("/user-page");
                  }}
                />
              )}
              <h1 className="text-lg md:text-2xl font-bold">{repoInfo.name}</h1>
            </div>
            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="md:block">
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
                    onClick={() => {
                      setStates({ isDialogOpen: true, formType: "new" });
                    }}
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
          </div>
          <hr className="border-2 " />
        </div>
        {pageLoading ? (
          <div className="flex w-full justify-center items-center">
            <CircularProgress size={50} />
          </div>
        ) : (
          <>
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
                <Card className="w-full md:w-3/4 h-[50vh]">
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
                  <div className="">

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
                    {fileData
                      .filter(
                        (file) =>
                          file.folder_id ==
                          parentFolderId[parentFolderId.length - 1]
                      )
                      .map((file) => (
                        <RepoItems
                          key={file.id}
                          itemName={file.name}
                          itemType={"file"}
                          itemTime={timeConverter(file.created_at)}
                        />
                      ))}
                  </div>
                </Card>
              </div>
            )}
          </>
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
