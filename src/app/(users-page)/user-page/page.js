// app/user/page.js
"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/pages/user_page/hero";
import Repositories from "@/components/pages/user_page/repository_section";
import { useAuth } from "@/context/auth_context";
import LinearProgress from "@mui/material/LinearProgress";
import RepositorySection from "@/components/pages/user_page/repository_section";
import ChildDialog from "@/components/pages/user_page/create_repo_dialog";

const UserPage = () => {
  const { name, token, loading } = useAuth();
  const [states, setStates] = useState({
    isDialogOpen: false,
    formType: "",
  })

  useEffect(() => {
    if (!loading && (name == null || token == null)) {
      window.location.href = "/home";
    }
  }, [loading, name, token]);

  const handleClickNewRepo = () => {
    setStates((prev) => ({...prev, isDialogOpen: true, formType: "new"}))
  }

  // Show a progress bar while loading
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LinearProgress />
      </div>
    );
  }

  if(token && name){

    return (
      <>
        <div className="min-h-screen w-full">
          
            <Hero />
    
          <section className="pt-14  flex" id="home">
            <RepositorySection handleClickNewRepo={handleClickNewRepo} />
          </section>
        </div>
        <ChildDialog
        isOpen={states.isDialogOpen}
        onClose={() =>
          setStates((prev) => ({ ...prev, isDialogOpen: false, formType: "" }))
        }
        formType={states.formType}
        //switchForm={handleSwitchForm}
      />
      </>

    );
  }
};

export default UserPage;
