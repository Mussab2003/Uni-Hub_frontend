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

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

function Hit({ hit }) {
  return (
    // <article>
    //   <h1>{hit.name}</h1>
    //   <p>{hit.description}</p>
    // </article>
    <div className="my-2">
      <Repository
        key={hit.objectID}
        repoId={hit.objectID}
        repoName={hit.name}
        repoDescription={hit.description}
        repoVisibility={hit.visibility}
        repoLikes={hit.likes}
        repoNumOfComments={hit.numOfComments}
      />

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
        endAdornment: (
          <InputAdornment position="end">
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
        <Hits hitComponent={Hit}/>
      </ScrollArea>
    </div>
  ) : null; // Show results only if query is non-empty
};

const Hero = ({ name, token }) => {
  const formattedName = name.replaceAll("%20", " ");
  return (
    <div className="md:px-4 flex justify-center pt-28 w-full h-full ">
      <Card className="w-3/4 h-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4 bg-[#E5E7EB] dark:bg-[#2E236C]  p-4">
            <h1 className="text-md text-slate-700 dark:text-[#C8ACD6] md:text-3xl  font-bold ">
              Welcome back, {formattedName}!
            </h1>
          </div>
          <div className="m-3 md:m-6 flex md:flex-row items-center gap-2">
            <InstantSearch
              searchClient={searchClient}
              indexName="import_all_objects"
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
