"use client";
import { Button, Card, TextareaAutosize } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from "./comment";
import { timeConverter } from "@/lib/utils";
import CircularProgress from "@mui/material/CircularProgress";

const CommentSection = ({ repo_id, token }) => {
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/comment/repo",
          {
            repo_id: repo_id,
          }
        );
        setCommentData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [loading]);

  const submitComment = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/comment/create",
        {
          repo_id: repo_id,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContent("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const [content, setContent] = useState("");
  return (
    <Card>
      <div className="flex flex-col px-4 gap-3">
        <div className="flex items-center justify-between py-2 md:py-4">
          <div className="flex items-center gap-1 md:gap-4">
            <h1 className="text-xl md:text-2xl text-slate-700 font-bold ">
              Comments
            </h1>
          </div>
        </div>
        {token && (
          <>
            <TextareaAutosize
              className="border-2 border-primary rounded-lg p-2"
              placeholder="Write a comment..."
              value={content}
              minRows={5}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex justify-end">
              {!loading ? (
                <>
                  <Button
                    className="bg-black"
                    variant="contained"
                    disabled={content == ""}
                    onClick={submitComment}
                  >
                    Post Comment
                  </Button>
                </>
              ) : (
                <CircularProgress color="black" />
              )}
            </div>
          </>
        )}
        <div>
          {commentData.map((comment, index) => (
            <Comment
              key={index}
              name={comment.username}
              content={comment.content}
              time={timeConverter(comment.created_at)}
            />
          ))}
          {commentData.length == 0 && (
            <div className="flex justify-center pb-8">

              <p className="text-xl font-medium dark:text-white">No Comments</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CommentSection;
