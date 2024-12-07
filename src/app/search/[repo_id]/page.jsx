"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { timeConverter } from "@/lib/utils";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { Clock, Lock, MessageSquare, MoveLeft, Star, Unlock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchRepo = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [repoData, setRepoData] = useState([]);
  const pathName = usePathname();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const repo_id = pathName.replace("search/", "");
      if (repo_id) {
        try {
          const response = await axios.get(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/repo/" + repo_id
          );
          setRepoData(response.data);
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [pathName]);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center">
          <CircularProgress size={50} color="black" />
        </div>
      ) : (
        <div className="container mx-auto px-2 md:px-0 w-full">
          <div className="flex w-full justify-center">
            <Card className="w-full md:w-3/4">
              <CardHeader>
                <div className="flex flex-col gap-2">
                  <div className="flex">
                    <Button variant="ghost" onClick={() => {router.back()}}>
                      <div className="flex items-center gap-2">
                        <MoveLeft
                          size={30}
                          
                        />
                        back
                      </div>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex gap-3 items-center">
                      <Avatar
                        onClick={() => {
                          router.push("/profile/" + repoData.user_id);
                        }}
                        className="cursor-pointer"
                      >
                        <AvatarImage
                          src={"/Assets/user.png"}
                          alt="Profile picture"
                        />
                        <AvatarFallback>user profile</AvatarFallback>
                      </Avatar>
                      <h1 className="text-lg md:text-3xl font-bold ">
                        {repoData.name}
                      </h1>
                    </div>
                    <Badge
                      className={"hidden md:block"}
                      variant={
                        repoData.visibility == "private"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      <div className="flex gap-2 p-1">
                        {repoData.visibility == "private" ? (
                          <Lock className="w-3 h-3 mr-1" />
                        ) : (
                          <Unlock className="w-3 h-3 mr-1" />
                        )}
                        {repoData.visibility}
                      </div>
                    </Badge>
                  </div>
                  <div className="md:hidden flex justify-end w-full">
                    <Badge
                      className={"md:hidden"}
                      variant={
                        repoData.visibility == "private"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {repoData.visibility == "private" ? (
                        <Lock className="w-3 h-3 mr-1" />
                      ) : (
                        <Unlock className="w-3 h-3 mr-1" />
                      )}
                      {repoData.visibility}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="pl-12">
                  {repoData.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {repoData.tags?.length > 0 &&
                    repoData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                </div>
                <div className="flex gap-10">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    <span>{repoData.likes} likes</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-purple-500" />
                    <span>{repoData.num_of_comments} comments</span>
                  </div>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Created {timeConverter(repoData.created_at)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => {
                    router.push("/repo/" + repoData.id);
                  }}
                >
                  View Materials
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchRepo;
