'use client';
import { searchClient } from "@/components/pages/user_page/hero";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InputAdornment, TextField } from "@mui/material";
import { Search } from "lucide-react";
import React from "react";
import { Hits, InstantSearch, useSearchBox } from "react-instantsearch";

const Page = () => {
  const CustomSearchBox = () => {
    const { refine, query } = useSearchBox(); // Hook to manage search query
    
    return (
      <TextField
        fullWidth
        variant="outlined"
        placeholder={"Search Faculty"}
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

  const ConditionalRoomHits = () => {
    const { query } = useSearchBox(); // Get the current query
    query;
    return query.trim() !== "" ? (
      <div className="">
        <ScrollArea className="h-44 w-full rounded-md border p-4">
          <Hits hitComponent={RoomHit} />
        </ScrollArea>
      </div>
    ) : null; // Show results only if query is non-empty
  };
  function RoomHit({ hit }) {
    return (
      <div
        onClick={() => {
          setRoomInfo(hit);
        }}
        className="my-2 p-3 flex items-center gap-3  hover:bg-gray-200 rounded-r-xl rounded-l-xl"
      >
        <Search size={20} />
        <h1>{hit.room_id}</h1>
      </div>
    );
  }
  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName={"room_index"}>
        <div className="flex flex-col  md:w-1/2 md:mx-auto">
          <CustomSearchBox />
          <ConditionalRoomHits />
        </div>
      </InstantSearch>
    </div>
  );
};

export default Page;
