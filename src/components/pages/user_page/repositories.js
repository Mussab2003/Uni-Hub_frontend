// import { CardDescription } from "@/components/ui/div";
import { div, divHeader, Chip } from "@mui/material";
import { Heart, MessageCircle, MessageSquare, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Repository = ({
  repoId,
  repoName,
  repoDescription,
  repoVisibility,
  handleClick,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/user-page/" + repoId);
      }}
      className="w-full p-4 hover:shadow-lg border-2  rounded-lg"
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
            <Star />
            <p>2</p>
          </div>
          <div className="flex gap-1">
            <MessageSquare />
            <p>2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repository;
