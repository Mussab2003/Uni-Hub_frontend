import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import FloorA from "./floor_A";
import FloorB from "./floor_B";
import FloorC from "./floor_C";
import FloorD from "./floor_D";
import FloorE from "./floor_E";
import FloorARes from "./EE_layout_2/floor_A_responsive";
import FloorBRes from "./EE_layout_2/floor_B_responsive";
import FloorCRes from "./EE_layout_2/floor_C_responsive";
import FloorDRes from "./EE_layout_2/floor_D_responsive";
import FloorERes from "./EE_layout_2/floor_E_responsive";
import Legend from "../legend";

const EEMap = ({ data, floor }) => {
  const floorComponents = {
    A: FloorA,
    B: FloorB,
    C: FloorC,
    D: FloorD,
    E: FloorE,
  };

  const responsiveFloorComponents = {
    A: FloorARes,
    B: FloorBRes,
    C: FloorCRes,
    D: FloorDRes,
    E: FloorERes,
  }

  const SelectedFloorRes = responsiveFloorComponents[floor]  
  if(!SelectedFloorRes) return null;
  const SelectedFloor = floorComponents[floor];
  if (!SelectedFloor) return null;

  console.log(floor);
  console.log(data);
  return (
    <>
      <Card className="m-4 hidden md:block">
        <CardContent className="flex flex-col p-4 items-center gap-10">
          <SelectedFloor data={data} />
          <Legend data={data} floor={floor} />
        </CardContent>
      </Card>
      <div className="md:hidden">
        <SelectedFloorRes data={data} />
      </div>
    </>
  );
};

export default EEMap;
