// app/user/page.js
"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/pages/user_page/hero";
import Repositories from "@/components/pages/user_page/repository_section";
import { useAuth } from "@/context/auth_context";
import LinearProgress from "@mui/material/LinearProgress";
import RepositorySection from "@/components/pages/user_page/repository_section";
import ChildDialog from "@/components/pages/user_page/create_repo_dialog";
import { useCourses } from "@/context/course_context";
import axios from "axios";
const UserPage = () => {
  const { name, token, isGoogle, loading } = useAuth();
  const {setData} = useCourses()

  const [courseData, setCourseData] = useState([]);
  const [states, setStates] = useState({
    isDialogOpen: false,
    formType: "",
  });

  const handleClickNewRepo = () => {
    setStates((prev) => ({ ...prev, isDialogOpen: true, formType: "new" }));
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!loading) {
        console.log(typeof(Boolean(isGoogle)))
        if (Boolean(isGoogle) == true) {
          console.log("In the function");
          try {
            const response = await axios.get(
              process.env.NEXT_PUBLIC_BACKEND_URL + "/course/refresh",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log("After the respone");
            console.log(response.data);
            setData(response.data)
          } catch (err) {
            console.log(err);
          }
        }
      }
    };
    fetchCourseData();
  }, [loading]);

  return (
    <>
      {name == null ? (
        <LinearProgress />
      ) : (
        <>
          <div className="min-h-screen w-full flex flex-col gap-10 mb-10">
            <Hero name={name} />
            <RepositorySection
              handleClickNewRepo={handleClickNewRepo}
              token={token}
            />
          </div>
          <p>{courseData && courseData.length}</p>
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
