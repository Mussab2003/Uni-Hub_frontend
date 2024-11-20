import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const FloorC = ({ data }) => {
  return (
    <Card className=" bg-[#F3F4F6] w-full">
      <CardContent className="p-0">
        <div className="grid grid-cols-7 grid-rows-6 ">
          {/* Upper left */}
          <div className="col-span-3 row-span-2 flex">
            {data
              .filter((item) => item.floor_id == 6 && item.direction == "UL")
              .map((item, index) => (
                <div
                  key={index}
                  className={`w-1/4 flex items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
                >
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
          {/* Upper Mid */}
          <div className="row-span-2 flex items-center justify-center bg-FR border-2 border-slate-600">
            {data
              .filter((item) => item.floor_id == 6 && item.direction == "M")
              .map((item, index) => (
                <div className="" key={index}>
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>

          {/* Upper Right */}
          <div className="col-span-3 row-span-2 col-start-5 flex">
            {data
              .filter((item) => item.floor_id == 6 && item.direction == "UR")
              .map((item, index) => (
                <div
                  key={index}
                  className={`w-1/4 flex items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
                >
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>

          {/* Lower Left */}
          <div className="row-start-5 col-span-3 row-span-2 flex ">
            {data
              .filter((item) => item.floor_id == 6 && item.direction == "LL")
              .map((item, index) => (
                <div
                  key={index}
                  className={`w-1/4 flex items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
                >
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>

          {/* Lower Right */}
          <div className="row-start-5 col-start-5 row-span-2 col-span-3 flex">
            {data
              .filter((item) => item.floor_id == 6 && item.direction == "LR")
              .map((item, index) => (
                <div
                  key={index}
                  className={`w-1/4 flex items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
                >
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FloorC;
