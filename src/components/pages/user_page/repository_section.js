'use client'
import { Card } from "@mui/material";
import axios from "axios";
import { FolderClosed, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import Repository from "./repositories";

const RepositorySection = ({handleClickNewRepo, token}) => {
  const [repoData, setRepoData] = useState([])
  // console.log("Token is : ",token)
  useEffect(() => {
    const fetchData = async () => {
      try{
          console.log("token is: ", token)
          const response = await axios.get(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/repo/self",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data)
          setRepoData(response.data)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [token])
  
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
              <button onClick={handleClickNewRepo} className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-400 ">
                <div className="flex items-center gap-2">
                  <Plus />
                  New Repo
                </div>
              </button>
            </div>
            <div className="md:hidden">
              <button onClick={handleClickNewRepo} className="rounded-full bg-green-700 p-0.5 hover:bg-green-400">
                <Plus size={15} className="text-white"/>
              </button>
            </div>
          </div>
          <div className="m-6 flex items-center gap-2 ">
            {/* {repoData.length > 0 ? ( */}
            <div className="max-h-72 w-full overflow-auto">
              <div className="flex flex-col gap-4 w-full overflow-auto">
                  {repoData.map((repo) => (
                    <Repository
                      key={repo.id}
                      repoId={repo.id}
                      repoName={repo.name}
                      repoDescription={repo.description}
                    />
                  ))}
                </div>

            </div>
            {/* ) : (<></>)} */}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RepositorySection;
