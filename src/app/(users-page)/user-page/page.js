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
  const { name, token, loading, setAuthData } = useAuth();
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);  // Access the query parameters from the URL
    const google_token = urlParams.get('jwt');
    const google_name = urlParams.get('name');
    
    if (google_token && google_name) {
      setAuthData(google_name, google_token, true); 
    } else {
      if (!loading) {
        if (name == null || token == null) {
          window.location.href = "/home";
        }
      }
    }
  }, [loading, name, token, setAuthData]);

  const [states, setStates] = useState({
    isDialogOpen: false,
    formType: "",
  });

  const handleClickNewRepo = () => {
    setStates((prev) => ({...prev, isDialogOpen: true, formType: "new"}));
  };

  if (true) {
    return (
      <>
        <div className="min-h-screen w-full">
          <Hero />
          <section className="pt-14 flex" id="home">
            <RepositorySection handleClickNewRepo={handleClickNewRepo} />
          </section>
        </div>
        <ChildDialog
          isOpen={states.isDialogOpen}
          onClose={() =>
            setStates((prev) => ({ ...prev, isDialogOpen: false, formType: "" }))
          }
          formType={states.formType}
        />
      </>
    );
  }
};

export default UserPage;
