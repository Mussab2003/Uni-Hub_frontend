// import { CardDescription } from "@/components/ui/div";
import { div, divHeader, Chip } from "@mui/material";
import axios from "axios";
import { Heart, MessageCircle, MessageSquare, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Repository = ({
  repoId,
  repoName,
  repoDescription,
  repoVisibility,
  repoLikes,
  repoNumOfComments,
  url,
  liked,
  token,
}) => {
  const router = useRouter();
  const [repoLiked, setRepoLiked] = useState(liked == null ? false : liked);
  const [numLikes, setNumLikes] = useState(repoLikes);
  const handleLike = async (event) => {
    try {
      event.stopPropagation()
      if (token) {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/repo/like",
          {
            id: repoId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setRepoLiked(!repoLiked);
        setNumLikes(response.data.likes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      onClick={() => {
        router.push(url + repoId);
      }}
      className="cursor-pointer w-full p-4 hover:shadow-lg border-2  rounded-lg"
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <h1 className="text-md md:text-2xl font-semibold">{repoName}</h1>
          <Chip
            label={<h1 className="font-semibold">{repoVisibility}</h1>}
            variant="outlined"
          />
        </div>
        <div>
          <p>{repoDescription}</p>
        </div>
        <div className="flex gap-3">
          <div className="flex gap-1">
            {repoLiked == true ? (
              <Star
                onClick={handleLike}
                className={"fill-yellow-400 text-yellow-400 cursor-pointer"}
              />
            ) : (
              <Star
                onClick={handleLike}
                className={"fill-white text-black cursor-pointer"}
              />
            )}
            <p>{numLikes || 0}</p>
          </div>
          <div className="flex gap-1">
            <MessageSquare />
            <p>{repoNumOfComments || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repository;
