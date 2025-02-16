"use client";
import React, { useEffect, useState } from "react";
import { Search, ScanSearch } from "lucide-react";
import {
  InstantSearch,
  SearchBox,
  Hits,
  useSearchBox,
} from "react-instantsearch";
import { InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { algoliasearch } from "algoliasearch";
import { ScrollArea } from "@/components/ui/scroll-area";
import Repository from "./repositories";
import { useRouter } from "next/navigation";

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

function Hit({ hit }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/user-page/search/" + hit.objectID);
      }}
      className="my-1 p-1 md:my-2 md:p-3 flex items-center gap-3 hover:bg-gray-200 rounded-r-xl rounded-l-xl"
    >
      <Search size={20} />
      <h1 className="text-xs md:text-md">{hit.name}</h1>
    </div>
  );
}

const CustomSearchBox = () => {
  const { refine, query } = useSearchBox(); // Hook to manage search query
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search for repositories..."
      value={query || ""} // Add a fallback value to avoid undefined
      onChange={(e) => refine(e.target.value)} // Update query in Algolia
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

const ConditionalHits = () => {
  const { query } = useSearchBox(); // Get the current query

  return query && query.trim() !== "" ? (
    <div className="">
      <ScrollArea className="h-44 w-full rounded-md border p-4">
        <Hits hitComponent={Hit} />
      </ScrollArea>
    </div>
  ) : null; // Show results only if query is non-empty
};

const Hero = ({ name, token }) => {
  const formattedName = name.replaceAll("%20", " ");
  return (
    <div className="px-2 md:px-4 flex md:justify-center h-full w-full">
      <Card className="w-full md:w-3/4 h-full overflow-hidden">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 bg-[#E5E7EB] dark:bg-[#2E236C]  md:p-4">
            <h1 className="px-1 text-md text-slate-700 dark:text-[#C8ACD6] md:text-3xl py-2 md:py-0 font-bold ">
              Welcome back, {formattedName}!
            </h1>
          </div>
          <div className="m-2 md:m-6 flex md:flex-row items-center gap-2">
            <InstantSearch
              searchClient={searchClient}
              indexName="repo_index"
            >
              <div className="flex flex-col w-full">
                <CustomSearchBox />
                <ConditionalHits />
              </div>
            </InstantSearch>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Hero;
