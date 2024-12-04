"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth_context";
import axios from "axios";
import { Card } from "@mui/material";
import { Images, MoveLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import RepoItems from "@/components/pages/repo_page/repo_items";
import { timeConverter } from "@/lib/utils";
import { useRouter } from "next/navigation";
import ChildDialog from "@/components/pages/repo_page/new_folder_dialog";
import CircularProgress from "@mui/material/CircularProgress";
import FilePreviewDialog from "@/components/pages/repo_page/file_preview_dialog";
import CommentSection from "@/components/pages/repo_page/comment_section";
import MenuSelect from "@/components/pages/repo_page/menu_select";

const RepoPage = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [states, setStates] = useState({
    isDialogOpen: false,
    formType: "",
  });
  const [repoInfo, setRepoInfo] = useState({
    id: "",
    name: "",
    description: "",
    availability: "",
    parent_folder_id: null,
    repoAuthorId: "",
  });
  const [folderData, setFolderData] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [parentFolderId, setParentFolderId] = useState([]);
  const [parentFolderName, setParentFolderName] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [fileDownloadLoading, setFileDownloadLoading] = useState({});
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isFileDeleted, setIsFileDeleted] = useState(false);

  const [fileURL, setFileURL] = useState("");
  const [formattedName, setFormattedName] = useState("");
  const [isOwner, setIsOwner] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setPageLoading(true);
      try {
        const [repoResponse] = await Promise.all([
          axios.get(
            process.env.NEXT_PUBLIC_BACKEND_URL +
            "/repo/" +
            pathName.replace("/repo/", "")
          ),
        ]);
        setRepoInfo({
          id: repoResponse.data.id,
          name: repoResponse.data.name,
          description: repoResponse.data.description,
          availability: repoResponse.data.availability,
          repoAuthorId: repoResponse.data.user_id,
        });

        if (repoResponse.data.user_id) {
          try {
            const response = await axios.get(
              process.env.NEXT_PUBLIC_BACKEND_URL +
              "/user/" +
              repoResponse.data.user_id
            );
            setFormattedName(response.data.name.replaceAll("%20", " "));
          } catch (err) {

          }
        }

        setPageLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setPageLoading(false);
      }
    };

    fetchData();
  }, []);

  //Fetching folder data
  useEffect(() => {
    const fetchFolderData = async () => {
      setPageLoading(true);
      try {
        const newPath = pathName.replace("/repo/", "");
        const data = {
          repo_id: newPath,
        };
        const response = await axios.post(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/folder/self",
          data
        );
        setFolderData(response.data);
        setPageLoading(false);

      } catch (err) {
        console.error("Error fetching data:", err);
        setPageLoading(false);
      }
    };
    fetchFolderData();
  }, []);

  //Fetching file data
  useEffect(() => {
    const fetchFileData = async () => {
      setPageLoading(true);
      try {
        const newPath = pathName.replace("/repo/", "");
        const data = {
          repo_id: newPath,
        };
        const response = await axios.post(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/file",
          data
        );
        setFileData(response.data);
        setPageLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setPageLoading(false);
      }
    };
    fetchFileData();
  }, []);

  const handleFolderClick = (folderId, folderName) => {
    setParentFolderId([...parentFolderId, folderId]);
    setParentFolderName([...parentFolderName, "/" + folderName]);
  };

  const handleBackButton = () => {
    setParentFolderId((item) => item.slice(0, item.length - 1));
    setParentFolderName((item) => item.slice(0, item.length - 1));
  };

  const handleFilePreview = async (file_id, file_extension) => {
    try {
      setPageLoading(true);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/file/preview",
        { id: file_id }
      );

      setFileURL(response.data.preview);
      setStates({ isDialogOpen: true, formType: "preview" });
      setPageLoading(false);
    } catch (err) {
      ;
    }
  };

  const handleFileDownload = async (file_id, file_name, file_extension) => {
    setFileDownloadLoading((prev) => ({ ...prev, [file_id]: true }));
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/file/download",
        { id: file_id }
      );


      const fileName = file_name + "." + file_extension;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Set the file name (this should match what the backend sends in Content-Disposition)
      link.setAttribute("download", fileName);

      // Append the link to the body and trigger a click to download the file
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the link from the DOM
      document.body.removeChild(link);
    } catch (err) {
      ;
    } finally {
      setFileDownloadLoading((prev) => ({ ...prev, [file_id]: false }));
    }
  };

  const folderNames = parentFolderName.join("");

  return (
    <>
      <div className="min-h-screen w-[99vw] flex flex-col gap-10 items-center mx-2">
        <div className="w-full md:w-3/4 flex flex-col gap-2 ">
          <div className="flex justify-between mx-2">
            <div className="flex gap-2 md:gap-4 items-center">
              {parentFolderId.length > 0 ? (
                <MoveLeft
                  className="cursor-pointer dark:text-white"
                  onClick={handleBackButton}
                />
              ) : (
                <MoveLeft
                  className="cursor-pointer dark:text-white"
                  onClick={() => {
                    router.push("/user-page");
                  }}
                />
              )}
              <h1 className="text-lg md:text-2xl font-bold dark:text-white">
                {repoInfo.name} {parentFolderName.length > 0 && folderNames}
              </h1>
            </div>
          </div>
          <hr className="border-2 " />
        </div>
        {pageLoading ? (
          <div className="flex w-full justify-center items-center">
            <CircularProgress size={50} color="black" />
          </div>
        ) : (
          <>
            {folderData.length == 0 && fileData.length == 0 ? (
              <div className="w-full flex justify-center">
                <p className="dark:text-white">No files available</p>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                <Card className="w-full md:w-3/4">
                  <div className="h-12 py-2 px-6 bg-[#E5E7EB] flex items-center">
                    <h1
                      onClick={() => {
                        router.push("/profile/" + repoInfo.repoAuthorId);
                      }}
                      className="cursor-pointer font-medium text-2xl hover:to-blue-400 hover:underline"
                    >
                      {formattedName}
                    </h1>
                  </div>
                  <div className="w-full">
                    {/* folder Data */}
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
                            handleFolderClick(folder.id, folder.name);
                          }}
                          isOwner={false}
                        />
                      ))}
                    {/* File data */}
                    {fileData
                      .filter(
                        (file) =>
                          file.folder_id ==
                          parentFolderId[parentFolderId.length - 1]
                      )
                      .map((file) => (
                        <RepoItems
                          key={file.id}
                          itemName={file.name + "." + file.extension}
                          itemType={"file"}
                          itemTime={timeConverter(file.created_at)}
                          handleItemClick={() => {
                            handleFilePreview(file.id, file.extension);
                          }}
                          loading={fileDownloadLoading[file.id] || false}
                          handleFileDownload={() => {
                            handleFileDownload(
                              file.id,
                              file.name,
                              file.extension
                            );
                          }}
                          isOwner={false}
                        />
                      ))}
                  </div>
                </Card>
              </div>
            )}
          </>
        )}
        <div className="w-full md:w-3/4">
          {repoInfo.id == "" ? (
            <></>
          ) : (
            <CommentSection repo_id={repoInfo.id} token={null} />
          )}
        </div>
      </div>

      {states.formType == "preview" && (
        <>
          <FilePreviewDialog
            isOpen={states.isDialogOpen}
            onClose={() =>
              setStates((prev) => ({
                isDialogOpen: false,
                formType: "",
              }))
            }
            fileURL={fileURL}
          />
        </>
      )}
    </>
  );
};

export default RepoPage;
