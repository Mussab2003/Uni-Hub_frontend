import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const BasementFirst = ({ data }) => {
  return (
    <>
      <Card className=" bg-[#F3F4F6] w-full">
        <CardContent className="p-0">
          <div className="hidden md:grid grid-cols-5 grid-rows-3 ">
            {/* Mid */}
            <div className="p-4 col-start-1 row-start-0 bg-DEP border-2 border-slate-600 flex items-center justify-center">
              {data
                .filter(
                  (item) =>
                    item.floor_id == 0 &&
                    item.direction == "RM" &&
                    item.room_id == 105
                )
                .map((item, index) => (
                  <div className={``} key={index}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className=" col-start-1 row-start-2 x bg-FR border-2 border-slate-600 flex justify-center items-center">
              {data
                .filter(
                  (item) =>
                    item.floor_id == 0 &&
                    item.direction == "RM" &&
                    item.room_id == 106
                )
                .map((item, index) => (
                  <div key={index} className={``}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className="p-4 col-start-1 row-start-3  bg-DEP border-2 border-slate-600 flex items-center justify-center">
              {data
                .filter(
                  (item) =>
                    item.floor_id == 0 &&
                    item.direction == "RM" &&
                    item.room_id == 157
                )
                .map((item, index) => (
                  <div className={``} key={index}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>

            {/* Upper Right */}
            <div className="col-start-3 col-span-3 row-start-3  flex">
              {data
                .filter(
                  (item) =>
                    item.floor_id == 0 &&
                    item.direction == "UR" &&
                    item.room_id >= 107 &&
                    item.room_id <= 109
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 w-1/2 flex items-center justify-center  bg-${item.room_type} border-2 border-slate-600`}
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
    </>
  );
};

export default BasementFirst;
