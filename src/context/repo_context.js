"use client";
import { createContext, useContext, useState } from "react";

const RepoContext = createContext();

export const RepoProvider = ({ children }) => {
  const [repoName, setRepoName] = useState(null);
  const [repoDescription, setRepoDescription] = useState(null);
  const [repoAvailibility, setRepoAvailibility] = useState(null);

  const setRepoData = (repoName, repoDescription, repoAvailability) => {
    setRepoName(repoName);
    setRepoDescription(repoDescription);
    setRepoAvailibility(repoAvailability);
  };

  const clearRepoData = () => {
    setRepoName(null);
    setRepoDescription(null);
    setRepoAvailibility(null);
  };

  return (
    <RepoContext.Provider
      value={{
        repoName,
        repoDescription,
        repoAvailibility,
        setRepoData,
        clearRepoData,
      }}
    >
      {children}
    </RepoContext.Provider>
  );
};

export const useRepo = () => {
  return useContext(RepoContext);
};
