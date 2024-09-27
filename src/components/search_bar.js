import { Input } from "@material-tailwind/react";
import React from "react";

const SearchBar = () => {
  return <div className="w-full">
    <Input
        type="text"
        size="lg"
        variant="outlined"
        placeholder="Search for repositories"
        color="black"
        className="text-black  dark:bg-white w-full"
    />
  </div>;
};

export default SearchBar;
