"use client";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Repository from "../user_page/repositories";

const PopularRepoList = () => {
  const [repoData, setRepoData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/repo/popular"
        );
        const data = await response.json();
        setRepoData(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <ScrollArea className=" h-96 w-full rounded-md p-4 dark:bg-[#2E236C]">
        {loading ? (
          <div className="items-center justify-center">
            <CircularProgress size={50} color="black"/>
          </div>
        ) : (
          <div>
            {repoData.map((repo) => (
              <div className="bg-white my-2">
                <Repository
                  key={repo.id}
                  repoId={repo.id}
                  repoName={repo.name}
                  repoDescription={repo.description}
                  repoVisibility={repo.visibility}
                  repoLikes={repo.likes}
                  repoNumOfComments={repo.num_of_comments}
                  url={'/repo/'}
                />
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default PopularRepoList;
