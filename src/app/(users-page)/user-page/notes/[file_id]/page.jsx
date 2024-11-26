"use client";
import { LoadingState } from "@/components/loading_dots";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth_context";
import { CardContent, CircularProgress } from "@mui/material";
import axios from "axios";
import { Download, MoveLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";

const NotesPage = () => {
  const router = useRouter();
    const { token, loading } = useAuth();
  const [notesData, setNotesData] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    const handleGenerateNote = async () => {
      setLocalLoading(true);
      const file_id = pathName.replace("/user-page/notes/", "");
      console.log(pathName);
      console.log(token);
      try {
        if (token) {
          const res = await axios.post(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/gemini/notes",
            {
              id: file_id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setNotesData(res.data);
          console.log(res.data);
          setLocalLoading(false);
        }
      } catch (err) {
        setLocalLoading(false);
        console.log(err);
      }
    };
    handleGenerateNote();
  }, [token]);

  const handleDownloadNotes = async () => {
    const blob = new Blob([notesData?.notes], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notes.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col mx-5">
          <Card>
            {localLoading ? (
              <div className="flex justify-center items-center">
                <LoadingState />
              </div>
            ) : (
              <>
                <CardTitle className="m-3">
                  <div className="flex justify-between">
                    <div className="flex w-full gap-5 items-center">
                      <MoveLeft
                        className="cursor-pointer"
                        onClick={() => {
                          router.back();
                        }}
                        size={30}
                      />
                      <h1 className="text-md md:text-2xl font-bold">
                        Generate Notes
                      </h1>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <Button
                        onClick={handleDownloadNotes}
                        className="hidden md:flex"
                      >
                        <Download className="mr-2" />
                        Download
                      </Button>

                      <Download
                        onClick={handleDownloadNotes}
                        className="mr-2 md:hidden"
                      />
                    </div>
                  </div>
                </CardTitle>
                <CardContent>
                  <Markdown>{notesData?.notes}</Markdown>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default NotesPage;
