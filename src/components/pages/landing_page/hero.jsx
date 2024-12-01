import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ScanSearch } from "lucide-react";
import { InstantSearch, Hits, useSearchBox } from "react-instantsearch";
import { searchClient } from "../user_page/hero";
import { InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChildDialog from "../auth_page/auth_form";

const Hero = () => {
  const [states, setStates] = useState({
    isDialogOpen: false,
    formType: "",
  });

  const handleDialogSignUpToggle = () => {
    setStates((prev) => ({
      ...prev,
      isDialogOpen: true,
      formType: "S",
    }));
  };

  const handleSwitchForm = () => {
    setStates({ ...states, formType: states.formType == "L" ? "S" : "L" });
  };

  const CustomSearchBox = () => {
    const { refine, query } = useSearchBox(); // Hook to manage search query
    return (
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for repositories..."
        value={query || ""} // Add a fallback value to avoid undefined
        onChange={(e) => refine(e.target.value)} // Update query in Algolia
        className="dark:bg-white"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    );
  };

  function Hit({ hit }) {
    const router = useRouter();
    return (
      <div
        onClick={() => {
          router.push("/search/" + hit.objectID);
        }}
        className="my-1 p-2 md:my-2 md:p-3 flex items-center gap-3 hover:bg-gray-200 rounded-r-xl rounded-l-xl"
      >
        <Search size={20} />
        <h1 className="text-xs md:text-md">{hit.name}</h1>
      </div>
    );
  }

  const ConditionalHits = () => {
    const { query } = useSearchBox(); // Get the current query

    return query && query.trim() !== "" ? (
      <div className="bg-white">
        <ScrollArea className="h-44 w-full rounded-md border p-4">
          <Hits hitComponent={Hit} />
        </ScrollArea>
      </div>
    ) : null; // Show results only if query is non-empty
  };
  return (
    <>
      <div className="container  mx-auto px-4 justify-center items-center ">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl dark:text-[#C8ACD6] md:text-5xl font-bold mb-6">
            View and Discover Student Repositories
          </h1>
          <div className="mb-6 flex justify-center items-center gap-1">
            <InstantSearch searchClient={searchClient} indexName="repo_index">
              <div className="flex flex-col w-full">
                <CustomSearchBox />
                <ConditionalHits />
              </div>
            </InstantSearch>
          </div>
          <p className="text-lg md:text-2xl text-gray-600 dark:text-[#C8ACD6] mb-8">
            Explore a variety of student-contributed resources, including course
            materials, past papers, and projects.
          </p>
          <Button
            className="dark:bg-[#2E236C] dark:hover:bg-[#433D8B]"
            size="lg"
            onClick={handleDialogSignUpToggle}
          >
            Get Started
          </Button>
        </div>
      </div>
      <ChildDialog
        isOpen={states.isDialogOpen}
        onClose={() =>
          setStates((prev) => ({ ...prev, isDialogOpen: false, formType: "" }))
        }
        formType={states.formType}
        switchForm={handleSwitchForm}
      />
    </>
  );
};

export default Hero;
