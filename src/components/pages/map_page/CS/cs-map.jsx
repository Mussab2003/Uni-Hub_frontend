import React from "react";
import BasementSecond from "./basement_2";
import GroundFloor from "./ground";
import FirstFloor from "./first";
import { Card, CardContent } from "@/components/ui/card";
import Legend from "../legend";

const CSMap = ({ data, floor }) => {
  const floorComponents = {
    Ground: GroundFloor,
    First: FirstFloor,
    "Basement 2": BasementSecond,
  };

  const SelectedFloor = floorComponents[floor];
  if (!SelectedFloor) return null;

  return (
    <Card className="m-4">
      <CardContent className="flex flex-col p-4 items-center  gap-10">
        <SelectedFloor data={data} />
        <Legend />
      </CardContent>
    </Card>
  );
};

export default CSMap;
