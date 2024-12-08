"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/pages/user_page/hero";
import { useAuth } from "@/context/auth_context";
import LinearProgress from "@mui/material/LinearProgress";
import RepositorySection from "@/components/pages/user_page/repository_section";
import ChildDialog from "@/components/pages/user_page/create_repo_dialog";
import { useCourses } from "@/context/course_context";

const UserPage = () => {
  const { name, token, isGoogle, loading } = useAuth();
  const { courseData, clearData, fetchData } = useCourses();
  

  const [states, setStates] = useState({
    isDialogOpen: false,
    formType: "",
  });

  const handleClickNewRepo = () => {
    setStates((prev) => ({ ...prev, isDialogOpen: true, formType: "new" }));
  };

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    clearData();
    const fetchCourseData = async () => {
      if (!loading) {
        if (isGoogle == "true") {
          if(courseData.length == 0){
            await fetchData(token, true)
          }
        }
      }
    };
    fetchCourseData();
  }, [loading, token]);



  return (
    <>
      {name == null ? (
        <LinearProgress />
      ) : (
        <>
          <div className="min-h-screen w-full flex flex-col gap-10 mb-10 px-2">
            <Hero name={name} token={token} />
            <RepositorySection
              handleClickNewRepo={handleClickNewRepo}
              token={token}
            />
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
      )}
    </>
  );
};

export default UserPage;
