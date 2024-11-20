import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import BasementSecond from "./basement_2";
import GroundFloor from "./ground";
import FirstFloor from "./first";
import BasementOneRes from "./CS_layout_2/basement_1_responsive";
import BasementSecondRes from "./CS_layout_2/basement_2_responsive";
import FirstRes from "./CS_layout_2/first_responsive";
import GroundRes from "./CS_layout_2/ground_responsive";
import Legend from "../legend";
import BasementFirst from "./basement_1";

const CSMap = ({ data, floor }) => {
  console.log(floor);
  const floorComponents = {
    Ground: GroundFloor,
    First: FirstFloor,
    "Basement 2": BasementSecond,
    "Basement 1": BasementFirst,
  };

  const responsiveFloorComponents = {
    Ground: GroundRes,
    First: FirstRes,
    "Basement 2": BasementSecondRes,
    "Basement 1": BasementOneRes,
  };

  const SelectedFloorRes = responsiveFloorComponents[floor];
  if (!SelectedFloorRes) return null;
  const SelectedFloor = floorComponents[floor];
  if (!SelectedFloor) return null;

  return (

    <>
      <Card className="m-4 hidden md:block">
        <CardContent className="flex flex-col p-4 items-center  gap-10">
          <SelectedFloor data={data} />
          <Legend data={data} floor={floor}/>
        </CardContent>
      </Card>
      <SelectedFloorRes data={data} />
    </>

    <Card className="m-4">
      <CardContent className="flex flex-col p-4 items-center  w-full  gap-10">
        <SelectedFloor data={data} />
        <Legend />
      </CardContent>
    </Card>

  );
};

export default CSMap;
