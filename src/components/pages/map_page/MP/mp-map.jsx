import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import BasementFloor from "./basement";
import GroundFloor from "./ground";
import FirstFloor from "./first";
import GroundRes from "./MP_layout_2/ground_responsive";
import FirstRes from "./MP_layout_2/first_responsive";
import Legend from "../legend";

const MultipurposeMap = ({ data, floor }) => {
  const floorComponents = {
    Ground: GroundFloor,
    First: FirstFloor,
    Basement: BasementFloor,
  };

  const responsiveFloorComponents = {
    Ground: GroundRes,
    First: FirstRes,
    Basement: BasementFloor,
  };

  const SelectedFloorRes = responsiveFloorComponents[floor];
  if (!SelectedFloorRes) return null;
  const SelectedFloor = floorComponents[floor];
  if (!SelectedFloor) return null;

  return (
    <>
      <Card className="m-4 hidden md:block ">
        <CardContent className="flex flex-col p-4 items-center  gap-10">
          <SelectedFloor data={data} />
          <Legend data={data} floor={floor}/>
        </CardContent>
      </Card>
      <div className="md:hidden">
        <SelectedFloorRes data={data} />

      </div>
    </>
  );
};

export default MultipurposeMap;
