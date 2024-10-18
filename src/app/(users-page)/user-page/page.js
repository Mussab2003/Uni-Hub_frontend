// app/user/page.js
"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/pages/user_page/hero";
import Repositories from "@/components/pages/user_page/repository_section";
import { useAuth } from "@/context/auth_context";
import LinearProgress from "@mui/material/LinearProgress";
import RepositorySection from "@/components/pages/user_page/repository_section";
import ChildDialog from "@/components/pages/user_page/create_repo_dialog";
import { useRepo } from "@/context/repo_context";
const UserPage = () => {
  const { name, token } = useAuth();
  const {repoName, repoDescription, repoVisibility} = useRepo()
  var formattedName
  if(name){
    formattedName = name.replace("%20", " ")
  } 
  const [states, setStates] = useState({
    isDialogOpen: false,
    formType: "",
  });

  const handleClickNewRepo = () => {
    setStates((prev) => ({ ...prev, isDialogOpen: true, formType: "new" }));
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col gap-10">
        <Hero name={formattedName} />
        <RepositorySection handleClickNewRepo={handleClickNewRepo} token={token}/>
      </div>
      <ChildDialog
        isOpen={states.isDialogOpen}
        onClose={() =>
          setStates((prev) => ({
            ...prev,
            isDialogOpen: false,
          }))
        }
        formType={states.formType}
        
      />
    </>
  );
};

export default UserPage;
