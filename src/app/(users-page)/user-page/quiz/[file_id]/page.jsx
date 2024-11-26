"use client";
import QuizDialog from "@/components/pages/quiz_page/quiz_dialog";
import { useAuth } from "@/context/auth_context";
import { CircularProgress } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const QuizPage = () => {
  const pathName = usePathname();
  const file_id = pathName.replace("/user-page/quiz/", "");
  const { token, loading } = useAuth();
  return (
    <>
      {(!loading && !token ) ? (
        <div>
            <CircularProgress size={50} color="black"/>
        </div>
      ) : (
        <div className="container mx-auto">
          <div className="flex flex-col mx-5">
            <QuizDialog file_id={file_id} token={token}/>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizPage;
