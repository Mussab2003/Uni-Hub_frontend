import React from "react";

const Comment = ({
  name,
  time,
  content,
}) => {
  return (
    <div className="flex flex-col p-2">
      <div className="flex gap-3 items-center">
        <h1 className="font-bold text-md ">@{name}</h1>
        <p>{time}</p>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
