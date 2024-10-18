import { CardDescription } from "@/components/ui/card";
import { Card, CardHeader } from "@mui/material";
import { Heart, MessageCircle, MessageSquare, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Repository = ({ repoId, repoName, repoDescription, handleClick }) => {
    const router = useRouter()
    return (
    <Card onClick={() => {
        router.push('/user-page/' + repoId)
    }} className="w-full p-4 hover:shadow-lg">
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-md md:text-2xl font-semibold">{repoName}</h1>
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
    </Card>
  );
};

export default Repository;
