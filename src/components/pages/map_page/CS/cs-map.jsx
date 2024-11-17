import React from "react";
import BasementFloor from "./basement";
import GroundFloor from "./ground";
import FirstFloor from "./first";
import { Card, CardContent } from "@/components/ui/card";
import Legend from "../legend";

const CSMap = ({ data, floor }) => {
  const floorComponents = {
    Basement: BasementFloor,
    Ground: GroundFloor,
    First: FirstFloor,
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
