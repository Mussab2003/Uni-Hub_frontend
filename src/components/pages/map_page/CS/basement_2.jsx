import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const BasementSecond = ({ data }) => {
  return (
    <>
      <Card className=" bg-[#F3F4F6] w-full">
        <CardContent className="p-0">
          <div className="hidden md:grid grid-cols-10 grid-rows-15 ">
            {/* Upper left */}
            <div className="col-start-2 col-span-2 row-span-2 flex">
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "UL" &&
                    item.room_id >= 94 &&
                    item.room_id <= 95
                )
                .map((item) => (
                  <div
                    className={`p-4 w-1/2 flex items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
                  >
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className="p-4 col-start-0 row-start-3 row-span-2 bg-FR border-2 border-slate-600 flex items-center justify-center">
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "UL" &&
                    item.room_id == 93
                )
                .map((item) => (
                  <div className={``}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className="p-4 col-start-0 row-start-5 row-span-2 bg-FR border-2 border-slate-600 flex items-center justify-center">
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "UL" &&
                    item.room_id == 92
                )
                .map((item) => (
                  <div className={``}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className="p-4 col-start-0 row-start-7 row-span-2 bg-FR border-2 border-slate-600 flex items-center justify-center">
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "UL" &&
                    item.room_id == 91
                )
                .map((item) => (
                  <div className={``}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className="p-4 col-start-5 row-start-3 row-span-2 bg-FR border-2 border-slate-600 flex items-center justify-center">
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "UL" &&
                    item.room_id == 96
                )
                .map((item) => (
                  <div className={``}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className="p-4 col-start-5 row-start-5 row-span-2 bg-FR border-2 border-slate-600 flex items-center justify-center">
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "UL" &&
                    item.room_id == 97
                )
                .map((item) => (
                  <div className={``}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className="p-4 col-start-5 row-start-7 row-span-2 bg-FR border-2 border-slate-600 flex items-center justify-center">
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "UL" &&
                    item.room_id == 98
                )
                .map((item) => (
                  <div className={``}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>

            {/* Lower Left */}
            <div className="p-4 col-start-0 col-span-3 row-start-9 row-span-2 bg-FR border-2 border-slate-600 flex items-center justify-center">
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "LL" &&
                    item.room_id == 83
                )
                .map((item) => (
                  <div className={``}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className="p-4 col-start-0 col-span-3 row-start-13 row-span-2 bg-FR border-2 border-slate-600 flex items-center justify-center">
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "LL" &&
                    item.room_id == 84
                )
                .map((item) => (
                  <div className={``}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>

            {/* Mid */}
            <div className="col-start-5 col-span-2 row-start-9 row-span-2 flex">
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "LM" &&
                    item.room_id >= 99 &&
                    item.room_id <= 100
                )
                .map((item) => (
                  <div
                    className={`p-4 w-1/2 flex items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
                  >
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className="col-start-7 col-span-4 row-start-11 row-span-2 flex">
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "LM" &&
                    item.room_id >= 101 &&
                    item.room_id <= 104
                )
                .map((item) => (
                  <div
                    className={`p-4 w-1/2 flex items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
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

export default BasementSecond;
