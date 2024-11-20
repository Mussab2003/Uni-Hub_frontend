"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Building from "@/components/pages/map_page/building"; 
import { MoveLeft } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import { CircularProgress } from "@mui/material";

const MapPage = () => {
  const [data, setData] = useState([]);
  const [screen, setScreen] = useState(0);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [loading, setLoading] = useState(false);

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
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const EEData = data.filter((item) => item.building_id == 2);
  const CSData = data.filter((item) => item.building_id == 1);
  const MPData = data.filter((item) => item.building_id == 3);

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
      <Card className="my-2 mx-10 ">
        <CardContent className='h-[80vh]'>
          <div className="flex flex-col gap-3 m-5">
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
                {screen == 0 && "University Map"}
                {screen == 1 && "CS Building"}
                {screen == 2 && "EE Building"}
                {screen == 3 && "Multipurpose Building"}
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
          </div>
          {loading ? (
            <div className="flex justify-center items-center">
              <CircularProgress size={50} color="black" />
            </div>
          ) : (
            <>
              {screen == 0 && (
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
          {screen == 1 && <CSMap data={CSData} floor={selectedFloor} />}
          {screen == 2 && <EEMap data={EEData} floor={selectedFloor} />}
          {screen== 3 && <MultipurposeMap data={MPData} floor={selectedFloor} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default MapPage;