import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const FloorD = ({ data }) => {
  return (
    <Card className=" bg-[#F3F4F6]">
      <CardContent className="p-0">
        <div className="grid grid-cols-7 grid-rows-6 h-[35vh] w-[85vw] ">
          {/* Upper left */}
          <div className="col-span-3 row-span-2 flex">
            {data
              .filter((item) => item.floor_id == 7 && item.direction == "UL")
              .map((item) => (
                <div className={`w-1/3 flex items-center justify-center bg-${item.room_type} border-2 border-slate-600`}>
                  <span className="text-sm text-center font-medium">{item.room_name}</span>
                </div>
              ))}
          </div>

          {/* Upper Right */}
          <div className="col-span-3 row-span-2 col-start-5 flex">
            {data
              .filter((item) => item.floor_id == 7 && item.direction == "UR")
              .map((item) => (
                <div className={`w-1/4 flex items-center justify-center bg-${item.room_type} border-2 border-slate-600`}>
                  <span className="text-sm text-center font-medium">{item.room_name}</span>
                </div>
              ))}
          </div>

          {/* Lower Left */}
          <div className="row-start-5 col-span-3 row-span-2 flex ">
            {data
              .filter((item) => item.floor_id == 7 && item.direction == "LL")
              .map((item) => (
                <div className={`w-1/4 flex items-center justify-center bg-${item.room_type} border-2 border-slate-600`}>
                  <span className="text-sm text-center font-medium">{item.room_name}</span>
                </div>
              ))}
          </div>

          {/* Lower Right */}
          <div className="row-start-5 col-start-5 row-span-2 col-span-3 flex">
            {data
              .filter((item) => item.floor_id == 7 && item.direction == "LR")
              .map((item) => (
                <div className={`w-1/4 flex items-center justify-center bg-${item.room_type} border-2 border-slate-600`}>
                  <span className="text-sm text-center font-medium">{item.room_name}</span>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FloorD;
