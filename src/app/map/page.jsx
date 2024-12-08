"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Building from "@/components/pages/map_page/building";
import { MoveLeft, Search } from "lucide-react";
import EEMap from "@/components/pages/map_page/EE/ee-map";
import CSMap from "@/components/pages/map_page/CS/cs-map";
import MultipurposeMap from "@/components/pages/map_page/MP/mp-map";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { extractBuildingData } from "@/lib/utils";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import { Hits, InstantSearch, useSearchBox } from "react-instantsearch";
import { searchClient } from "@/components/pages/user_page/hero";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const MapPage = () => {
  const [data, setData] = useState([]);
  const [screen, setScreen] = useState(0);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [facultyInfo, setFacultyInfo] = useState(null);
  const [roomInfo, setRoomInfo] = useState(null);
  const [searchType, setSearchType] = useState("faculty");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/map"
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        err;
      }
    };
    fetchData();
  }, []);

  const EEData = data.filter((item) => item.building_id == 2);
  const CSData = data.filter((item) => item.building_id == 1);
  const MPData = data.filter((item) => item.building_id == 3);

  const CustomSearchBox = () => {
    const { refine, query } = useSearchBox(); // Hook to manage search query
    return (
      <TextField
        fullWidth
        variant="outlined"
        placeholder={searchType == 'faculty' ? "Search Faculty" : "Search Room"}
        value={query || ""} // Add a fallback value to avoid undefined
        onChange={(e) => refine(e.target.value)} // Update query in Algolia
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Select
                value={searchType}
                onValueChange={(value) => {
                  setSearchType(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Search Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"faculty"}>Faculty</SelectItem>
                  <SelectItem value={"room"}>Room</SelectItem>
                </SelectContent>
              </Select>
            </InputAdornment>
          ),
        }}
      />
    );
  };

  const ConditionalFacultyHits = () => {
    const { query } = useSearchBox(); // Get the current query

    return query.trim() !== "" ? (
      <div className="">
        <ScrollArea className="h-44 w-full rounded-md border p-4">
          <Hits hitComponent={FacultyHit} />
        </ScrollArea>
      </div>
    ) : null; // Show results only if query is non-empty
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

  function FacultyHit({ hit }) {
    return (
      <div
        onClick={() => {
          setFacultyInfo(hit);
        }}
        className="my-2 p-3 flex items-center gap-3 hover:bg-gray-200 rounded-r-xl rounded-l-xl"
      >
        <Search size={20} />
        <h1>{hit.name}</h1>
      </div>
    );
  }

  function RoomHit({ hit }) {
    hit;
    return (
      <div
        onClick={() => {
          setRoomInfo(hit);
        }}
        className="my-2 p-3 flex items-center gap-3  hover:bg-gray-200 rounded-r-xl rounded-l-xl"
      >
        <Search size={20} />
        <h1>{hit.room_name}</h1>
      </div>
    );
  }

  const handleBuildingClick = (building_id) => {
    setScreen(Number(building_id));
  };

  const handleFloorChange = (value) => {
    setSelectedFloor(value);
  };

  const selectedBuilding = extractBuildingData(data).find(
    (building) => building.building_id == screen
  );
  const floors = selectedBuilding?.floor_names || [];

  useEffect(() => {
    if (floors.length > 0 && selectedFloor == null) {
      handleFloorChange(floors[0]);
    }
  }, [floors]);

  return (
    <div className="container mx-auto">
      <Card className="my-2 mx-5 md:mx-10 ">
        <CardContent className="">
          <div className="flex flex-col gap-3 my-5">
            <div className="flex items-center gap-3">
              {screen != 0 && (
                <MoveLeft
                  size={40}
                  onClick={() => {
                    setScreen(0);
                    setSelectedFloor(null);
                  }}
                  className="cursor-pointer"
                />
              )}
              <h1 className="font-bold text-xl md:text-2xl underline">
                {screen == 0 && roomInfo == null && facultyInfo == null && "University Map"}
                {screen == 1 && roomInfo == null && facultyInfo == null && "CS Building"}
                {screen == 2 && roomInfo == null && facultyInfo == null && "EE Building"}
                {screen == 3 && roomInfo == null && facultyInfo == null && "Multipurpose Building"}
                {facultyInfo && facultyInfo.building_name == "Computer Science" && "CS Building"}
                {facultyInfo && facultyInfo.building_name == "Electrical Engineering" && "EE Building"}
                {facultyInfo && facultyInfo.building_name == "Multipurpose" && "Multipurpose Building"}
                {roomInfo && roomInfo.building_name == "Computer Science" && "CS Building"}
                {roomInfo && roomInfo.building_name == "Electrical Engineering" && "EE Building"}
                {roomInfo && roomInfo.building_name == "Multipurpose" && "Multipurpose Building"}
              </h1>
            </div>
            {screen != 0 && (
              <div className="md:w-1/6">
                <Select
                  value={selectedFloor}
                  onValueChange={(value) => {
                    handleFloorChange(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a floor" />
                  </SelectTrigger>
                  <SelectContent>
                    {floors.map((floor, index) => (
                      <SelectItem key={index} value={floor}>
                        {floor + " Floor"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="w-full m-0 p-0">
              <InstantSearch
                searchClient={searchClient}
                indexName={
                  searchType == "faculty" ? "faculty_index" : "room_index"
                }
              >
                <div className="flex flex-col  md:w-1/2 md:mx-auto">
                  <CustomSearchBox />
                  {searchType == "room" ? (
                    <ConditionalRoomHits />
                  ) : (
                    <ConditionalFacultyHits />
                  )}
                </div>
              </InstantSearch>
            </div>
            {facultyInfo && (
              <Card className="my-2 p-2 md:p-4 w-full md:w-1/2 md:mx-auto">
                <CardTitle>
                  <div className="flex justify-between items-center">
                    <h1 className="text-md md:text-2xl font-semibold">
                      {facultyInfo.name}
                    </h1>
                    <Button
                      onClick={() => {
                        setFacultyInfo(null);
                      }}
                      variant="destructive"
                      className="rounded-full"
                    >
                      Clear
                    </Button>
                  </div>
                </CardTitle>
                <CardContent className="p-0">
                  <p>{facultyInfo.room_name}</p>
                  <p>
                    {`${facultyInfo.building_name} Building (Floor ${facultyInfo.floor_name})`}
                  </p>
                </CardContent>
              </Card>
            )}
            {roomInfo && (
              <Card className="my-2 p-2 md:p-4 w-full md:w-1/2 md:mx-auto">
                <CardTitle>
                  <div className="flex justify-between items-center">
                    <h1 className="text-md md:text-2xl font-semibold">
                      {roomInfo.room_name}
                    </h1>
                    <Button
                      onClick={() => {
                        setRoomInfo(null);
                      }}
                      variant="destructive"
                      className="rounded-full"
                    >
                      Clear
                    </Button>
                  </div>
                </CardTitle>
                <CardContent className="p-0">
                  <p>Room Type: {roomInfo.room_type_name}</p>
                  <p>
                    {`${roomInfo.building_name} Building (Floor ${roomInfo.floor_name})`}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
          {loading ? (
            <div className="flex justify-center items-center">
              <CircularProgress size={50} color="black" />
            </div>
          ) : (
            <>
              {screen == 0 && facultyInfo == null && roomInfo == null && (
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full h-full">
                  {extractBuildingData(data).map((building) => (
                    <Building
                      key={building.building_id}
                      floors={building.number_of_floors}
                      name={building.building_name}
                      handleClick={() => {
                        handleBuildingClick(building.building_id);
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {screen == 1 && facultyInfo == null && roomInfo == null && (
            <CSMap data={CSData} floor={selectedFloor} />
          )}
          {screen == 2 && facultyInfo == null && roomInfo == null && (
            <EEMap data={EEData} floor={selectedFloor} />
          )}
          {screen == 3 && facultyInfo == null && roomInfo == null && (
            <MultipurposeMap data={MPData} floor={selectedFloor} />
          )}

          {facultyInfo && facultyInfo.building_name == "Computer Science" && (
            <CSMap data={CSData} floor={facultyInfo.floor_name} />
          )}
          {facultyInfo &&
            facultyInfo.building_name == "Electrical Engineering" && (
              <EEMap data={EEData} floor={facultyInfo.floor_name} />
            )}
          {facultyInfo && facultyInfo.building_name == "Multipurpose" && (
            <MultipurposeMap data={MPData} floor={facultyInfo.floor_name} />
          )}

          {roomInfo && roomInfo.building_name == "Computer Science" && (
            <CSMap data={CSData} floor={roomInfo.floor_name} />
          )}
          {roomInfo && roomInfo.building_name == "Electrical Engineering" && (
            <EEMap data={EEData} floor={roomInfo.floor_name} />
          )}
          {roomInfo && roomInfo.building_name == "Multi-purpose" && (
            <MultipurposeMap data={MPData} floor={roomInfo.floor_name} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MapPage;
