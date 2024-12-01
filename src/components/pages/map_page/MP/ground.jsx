import { Card } from "@/components/ui/card";
import { getColorByRoomType } from "@/lib/utils";
import { CardContent } from "@mui/material";
import React from "react";

const Ground = ({ data }) => {
  return (
    <Card className=" bg-[#F3F4F6] w-full">
      <CardContent>
        <div className="grid grid-cols-5 grid-rows-5">
          <div className="row-start-3 row-span-2 flex flex-col">
            {data
              .filter(
                (item) =>
                  item.floor_id == 10 &&
                  item.direction == "LL" &&
                  item.room_id >= 150 &&
                  item.room_id <= 151
              )
              .map((item, index) => (
                <div
                  key={index}
                  className={`p-4 w-full flex items-center justify-center  ${getColorByRoomType(
                    item.room_type
                  )} border-2 border-slate-600`}
                >
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
          <div className={`col-start-2 col-span-1 row-start-5 ${getColorByRoomType('WR')} border-2 border-slate-600 flex items-center justify-center`}>
            {data
              .filter(
                (item) =>
                  item.floor_id == 10 &&
                  item.direction == "LL" &&
                  item.room_id == 152
              )
              .map((item, index) => (
                <div className={``} key={index}>
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>

          <div className="col-start-2 col-span-3">
            {data
              .filter((item) => item.floor_id == 10 && item.direction == "M")
              .map((item, index) => (
                <div
                  key={index}
                  className={`p-4 w-full flex items-center justify-center ${getColorByRoomType('AR')} border-2 border-slate-600`}
                >
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>

          <div className="col-start-5 col-span-1">
            {data
              .filter((item) => item.floor_id == 10 && item.direction == "UR")
              .map((item, index) => (
                <div
                  key={index}
                  className={`p-4 w-full flex items-center justify-center  ${getColorByRoomType(
                    item.room_type
                  )} border-2 border-slate-600`}
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

export default Ground;
