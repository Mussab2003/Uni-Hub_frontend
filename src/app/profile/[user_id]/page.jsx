"use client";
import Repository from "@/components/pages/user_page/repositories";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth_context";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserProfilePage = () => {
  const { token } = useAuth();
  const [userData, setUserData] = useState({});
  const [repoData, setRepoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            "/user/" +
            pathName.replace("/profile/", "")
        );
        setUserData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    const fetchRepoData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/repo/user",
          {
            user_id: pathName.replace("/profile/", ""),
          }
        );
        setRepoData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchUserData();
    fetchRepoData();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-8">
          <Avatar className="w-24 h-24">
            <AvatarImage src={"/Assets/user.png"} alt={userData.name} />
            <AvatarFallback>{userData.name}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">{userData.name}</h1>
            <p className="text-muted-foreground">User Profile</p>
          </div>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Repositories</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {repoData.map((repo, index) => (
              <Repository
                key={index}
                repoId={repo.id}
                repoName={repo.name}
                repoDescription={repo.description}
                repoVisibility={repo.visibility}
                repoLikes={repo.likes}
                repoNumOfComments={repo.num_of_comments}
                url={token ? "/user-page/" : "/repo/"}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfilePage;
