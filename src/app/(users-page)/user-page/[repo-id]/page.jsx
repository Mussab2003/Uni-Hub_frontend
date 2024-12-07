"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth_context";
import axios from "axios";
import { Card } from "@mui/material";
import { Images, MoveLeft, Plus, Settings, Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import RepoItems from "@/components/pages/repo_page/repo_items";
import { timeConverter } from "@/lib/utils";
import { useRouter } from "next/navigation";
import ChildDialog from "@/components/pages/repo_page/new_folder_dialog";
import CircularProgress from "@mui/material/CircularProgress";
import FilePreviewDialog from "@/components/pages/repo_page/file_preview_dialog";
import CommentSection from "@/components/pages/repo_page/comment_section";
import MenuSelect from "@/components/pages/repo_page/menu_select";
import SettingSelect from "@/components/pages/repo_page/settings_select";
import { DeleteRepoDialog } from "@/components/pages/repo_page/delete_dialog";
import RepoDialog from "@/components/pages/user_page/create_repo_dialog";

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
    visibility: "",
    parent_folder_id: null,
    repoAuthorId: "",
    repoLiked: null,
  });
  const [ownerInfo, setOwnerInfo] = useState({});
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
    if (!loading && token) {
      fetchData();
    }
  }, [loading, token, pathName]);

  //Fetching folder data
  useEffect(() => {
    fetchFolderData();
  }, [loading, token, pathName]);

  //Fetching file data
  useEffect(() => {
    fetchFileData();
  }, [loading, token, pathName]);

  const fetchData = async () => {
    setPageLoading(true);
    try {
      const [userResponse, repoResponse] = await Promise.all([
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + "/user/self", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            "/repo/" +
            pathName.replace("/user-page/", ""),
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
      ]);

      console.log(repoResponse.data);

      setRepoInfo({
        id: repoResponse.data.id,
        name: repoResponse.data.name,
        description: repoResponse.data.description,
        visibility: repoResponse.data.visibility,
        repoAuthorId: repoResponse.data.user_id,
        repoLiked: repoResponse.data.liked,
      });

      // Check ownership after both responses are received
      if (userResponse.data.id === repoResponse.data.user_id) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }

      if (repoResponse.data.user_id) {
        try {
          const response = await axios.get(
            process.env.NEXT_PUBLIC_BACKEND_URL +
              "/user/" +
              repoResponse.data.user_id
          );
          setOwnerInfo(response.data);
          setFormattedName(response.data.name.replaceAll("%20", " "));
        } catch (err) {}
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setPageLoading(false);
    }
  };

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
        setPageLoading(false);
      }
    }
  };

  const fetchFileData = async () => {
    setPageLoading(true);
    if (!loading && token) {
      try {
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
        setFileData(response.data);
        setPageLoading(false);
      } catch (err) {
        setPageLoading(false);
      }
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/repo/like",
        {
          id: repoInfo.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRepoInfo((prev) => {
        return {
          ...prev,
          repoLiked: !prev.repoLiked,
        };
      });
    } catch (err) {}
  };

  const handleFolderClick = (folderId, folderName) => {
    setParentFolderId([...parentFolderId, folderId]);
    setParentFolderName([...parentFolderName, "/" + folderName]);
  };

  const handleBackButton = () => {
    setParentFolderId((item) => item.slice(0, item.length - 1));
    setParentFolderName((item) => item.slice(0, item.length - 1));
  };

  const handleFileUpload = () => {
    document.getElementById("fileInput").click();
  };

  const handleFilePreview = async (file_id, file_extension) => {
    try {
      setPageLoading(true);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/file/preview",
        { id: file_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFileURL(response.data.preview);
      setStates({ isDialogOpen: true, formType: "preview" });
      setPageLoading(false);
    } catch (err) {}
  };

  const handleFileDownload = async (file_id, file_name, file_extension) => {
    setFileDownloadLoading((prev) => ({ ...prev, [file_id]: true }));
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/file/download",
        { id: file_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
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
    } finally {
      setFileDownloadLoading((prev) => ({ ...prev, [file_id]: false }));
    }
  };

  const handleFileDelete = async (file_id) => {
    try {
      setPageLoading(true);
      const response = await axios.delete(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/file/delete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            id: file_id,
          },
        }
      );
      if (response.status === 200) {
        fetchFileData();
      }
    } catch (err) {}
  };

  const handleFolderDelete = async (folder_id) => {
    try {
      const response = await axios.delete(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/folder/delete",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            id: folder_id,
          },
        }
      );
      if (response.status === 200) {
        fetchFolderData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = async (event) => {
    setPageLoading(true);
    const files = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("document", files[i]);
        formData.append("repo_id", repoInfo.id);
        if (parentFolderId.length > 0) {
          formData.append(
            "folder_id",
            parentFolderId[parentFolderId.length - 1]
          );
        }

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
        } catch (err) {}
      }
      fetchFileData();
    }
  };

  const handleQuiz = (file_id) => {
    router.push("/user-page/quiz/" + file_id);
  };

  const handleNotes = (file_id) => {
    router.push("/user-page/notes/" + file_id);
  };

  const handleRepoDelete = () => {
    setStates({ isDialogOpen: true, formType: "delete" });
  };

  const handleRepoEdit = () => {
    setStates({ isDialogOpen: true, formType: "edit" });
  };

  const folderNames = parentFolderName.join("");

  return (
    <>
      <div className="min-h-screen w-[99vw] flex flex-col gap-10 items-center">
        <div className="px-2 w-full md:w-3/4 flex flex-col gap-2 ">
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
              <div className="hidden md:block">
                {Boolean(repoInfo.repoLiked) ? (
                  <Button variant="outline" onClick={handleLike}>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className={"fill-black"} />
                      <p className="font-bold">liked</p>
                    </div>
                  </Button>
                ) : (
                  <Button variant="outline" onClick={handleLike}>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className={"fill-white"} />
                      <p className="">like</p>
                    </div>
                  </Button>
                )}
              </div>
            </div>
            <div className="flex gap-2 items-center ">
              {isOwner && (
                <>
                  <MenuSelect
                    properties={"hidden md:block"}
                    handleFileChange={handleFileChange}
                    handleFileUpload={handleFileUpload}
                    handleFolderDialog={() => {
                      setStates({ isDialogOpen: true, formType: "new" });
                    }}
                  />
                  <SettingSelect
                    properties={"hidden md:block"}
                    handleDeleteRepo={handleRepoDelete}
                    handleEditRepo={handleRepoEdit}
                  />
                </>
              )}
            </div>
          </div>
          <hr className="border-2 " />
        </div>
        <div className="flex md:hidden gap-1">
          <div className="md:hidden">
            {Boolean(repoInfo.repoLiked) ? (
              <Button variant="outline" onClick={handleLike}>
                <div className="flex items-center gap-2">
                  <ThumbsUp className={"fill-black"} />
                  <p className="font-bold">liked</p>
                </div>
              </Button>
            ) : (
              <Button variant="outline" onClick={handleLike}>
                <div className="flex items-center gap-2">
                  <ThumbsUp className={"fill-white"} />
                  <p className="">like</p>
                </div>
              </Button>
            )}
          </div>
          <div className="flex gap-2 items-center ">
            {isOwner && (
              <>
                <MenuSelect
                  properties={"md:hidden"}
                  handleFileChange={handleFileChange}
                  handleFileUpload={handleFileUpload}
                  handleFolderDialog={() => {
                    setStates({ isDialogOpen: true, formType: "new" });
                  }}
                />
                <SettingSelect
                  properties={"md:hidden"}
                  handleDeleteRepo={handleRepoDelete}
                  handleEditRepo={handleRepoEdit}
                />
              </>
            )}
          </div>
        </div>
        {pageLoading || formattedName == "" ? (
          <div className="flex w-full justify-center items-center">
            <CircularProgress size={50} color="black" />
          </div>
        ) : (
          <div className="px-2 w-full">
            <div className="w-full flex justify-center">
              <Card className="w-full md:w-3/4">
                <div className="h-12 py-2 px-6 bg-[#E5E7EB] flex items-center">
                  <h1
                    onClick={() => {
                      router.push("/profile/" + repoInfo.repoAuthorId);
                    }}
                    className="cursor-pointer font-medium text-2xl hover:text-blue-600 hover:underline"
                  >
                    {formattedName}
                  </h1>
                </div>
                {folderData.length == 0 && fileData.length == 0 ? (
                  <div className="w-full flex justify-center">
                    {isOwner ? (
                      <div className="m-2 border-dotted border-2 border-black dark:border-white flex flex-col gap-4 justify-center items-center p-2 w-[70vw] h-[50vh]">
                        <Images size={50} className="dark:text-white" />
                        <div className="flex justify-center items-center gap-4">
                          <Button onClick={handleFileUpload}>
                            Upload Files
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p>No files available</p>
                    )}
                  </div>
                ) : (
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
                          handleDelete={() => {
                            handleFolderDelete(folder.id);
                          }}
                          isOwner={isOwner}
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
                          handleDelete={() => {
                            handleFileDelete(file.id);
                          }}
                          handleNotes={() => {
                            handleNotes(file.id);
                          }}
                          handleQuiz={() => {
                            handleQuiz(file.id);
                          }}
                          isOwner={isOwner}
                          token={token}
                        />
                      ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
        )}
        <div className="w-full md:w-3/4">
          {repoInfo.id == "" || !token ? (
            <></>
          ) : (
            <CommentSection repo_id={repoInfo.id} token={token} />
          )}
        </div>
      </div>
      {states.formType == "new" && (
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
          afterSubmit={() => {
            fetchFolderData();
          }}
        />
      )}

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
      {states.formType == "delete" && (
        <>
          <DeleteRepoDialog
            isOpen={states.isDialogOpen}
            onClose={() =>
              setStates((prev) => ({
                isDialogOpen: false,
                formType: "",
              }))
            }
            repoName={repoInfo.name}
            token={token}
            repoId={repoInfo.id}
          />
        </>
      )}

      {states.formType == "edit" && (
        <>
          <RepoDialog
            isOpen={states.isDialogOpen}
            onClose={() =>
              setStates((prev) => ({
                isDialogOpen: false,
                formType: "",
              }))
            }
            defaultValue={repoInfo}
            token={token}
            formType={states.formType}
            afterSubmit={() => {
              fetchData();
            }}
          />
        </>
      )}
    </>
  );
};

export default RepoPage;
