"use client";
import { Card, CircularProgress } from "@mui/material";
import axios from "axios";
import { FolderClosed, FolderPlus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import Repository from "./repositories";

const RepositorySection = ({ handleClickNewRepo, token }) => {
  const [repoData, setRepoData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/repo/self",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRepoData(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="md:px-4 flex justify-center w-full h-full">
      <Card className="w-3/4 h-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between p-2 md:p-4">
            <div className="flex items-center gap-1 md:gap-4">
              <FolderClosed
                size={25}
                className="text-black dark:text-[#C8ACD6]"
              />
              <h1 className="text-sm md:text-2xl text-slate-700 dark:text-[#C8ACD6]   font-bold ">
                Your Repositories
              </h1>
            </div>
            <div className="hidden md:block">
              <button
                onClick={handleClickNewRepo}
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-900 "
              >
                <div className="flex items-center gap-2">
                  <Plus />
                  New Repo
                </div>
              </button>
            </div>
            <div className="md:hidden">
              <button
                onClick={handleClickNewRepo}
                className="rounded-full bg-black p-0.5 hover:bg-slate-900"
              >
                <Plus size={15} className="text-white" />
              </button>
            </div>
          </div>
          <div className="m-6 flex items-center gap-2">
            {loading ? (
              <div className="flex justify-center items-center w-full">
                <CircularProgress size={50} />
              </div>
            ) : (
              <>
                {repoData.length > 0 ? (
                  <div className="max-h-96 w-full overflow-auto">
                    <div className="flex flex-col gap-4 w-full ">
                      {repoData.map((repo) => (
                        <Repository
                          key={repo.id}
                          repoId={repo.id}
                          repoName={repo.name}
                          repoDescription={repo.description}
                          repoVisibility={repo.visibility}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 w-full">
                    <FolderPlus size={50} />
                    <div className="flex flex-col items-center justify-center ">
                      <h1 className="text-md md:text-2xl font-semibold">
                        Repository list is empty
                      </h1>
                      <p>Let's create your first repository!</p>
                    </div>
                    <button
                      onClick={handleClickNewRepo}
                      className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-900 "
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RepositorySection;
