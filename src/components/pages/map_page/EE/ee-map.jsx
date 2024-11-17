import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import FloorA from "./floor_A";
import FloorB from "./floor_B";
import FloorC from "./floor_C";
import FloorD from "./floor_D";
import FloorE from "./floor_E";
import Legend from "../legend";

const EEMap = ({ data, floor }) => {
  const floorComponents = {
    A: FloorA,
    B: FloorB,
    C: FloorC,
    D: FloorD,
    E: FloorE,
  };

  const SelectedFloor = floorComponents[floor];
  if (!SelectedFloor) return null;

  console.log(floor);
  console.log(data);
  return (
    <Card className="m-4">
      <CardContent className="flex flex-col p-4 items-center  gap-10">
        <SelectedFloor data={data} />
        <Legend />
      </CardContent>
    </Card>
  );
};

export default EEMap;
