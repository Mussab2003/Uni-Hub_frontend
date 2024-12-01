import { Card, CardContent } from "@/components/ui/card";
import { getColorByRoomType } from "@/lib/utils";
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
                .map((item, index) => (
                  <div key={index}
                    className={`p-4 w-1/2 flex items-center justify-center ${getColorByRoomType(item.room_type)} border-2 border-slate-600`}
                  >
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className={`p-4 col-start-0 row-start-3 row-span-2 ${getColorByRoomType('FR')} border-2 border-slate-600 flex items-center justify-center`}>
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "UL" &&
                    item.room_id == 93
                )
                .map((item, index) => (
                  <div className={``} key={index}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className={`p-4 col-start-0 row-start-5 row-span-2 ${getColorByRoomType('FR')} border-2 border-slate-600 flex items-center justify-center`}>
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "UL" &&
                    item.room_id == 92
                )
                .map((item, index) => (
                  <div key={index} className={``}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className={`p-4 col-start-0 row-start-7 row-span-2 ${getColorByRoomType('FR')} border-2 border-slate-600 flex items-center justify-center`}>
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "UL" &&
                    item.room_id == 91
                )
                .map((item, index) => (
                  <div className={``} key={index}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className={`p-4 col-start-5 row-start-3 row-span-2 ${getColorByRoomType('FR')} border-2 border-slate-600 flex items-center justify-center`}>
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "UL" &&
                    item.room_id == 96
                )
                .map((item, index) => (
                  <div className={``} key={index}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className={`p-4 col-start-5 row-start-5 row-span-2 ${getColorByRoomType('FR')} border-2 border-slate-600 flex items-center justify-center`}>
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "UL" &&
                    item.room_id == 97
                )
                .map((item, index) => (
                  <div key={index} className={``}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className={`p-4 col-start-5 row-start-7 row-span-2 ${getColorByRoomType('FR')} border-2 border-slate-600 flex items-center justify-center`}>
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "UL" &&
                    item.room_id == 98
                )
                .map((item, index) => (
                  <div className={``} key={index}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>

            {/* Lower Left */}
            <div className={`p-4 col-start-0 col-span-3 row-start-9 row-span-2 ${getColorByRoomType('FR')} border-2 border-slate-600 flex items-center justify-center`}>
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "LL" &&
                    item.room_id == 83
                )
                .map((item, index) => (
                  <div className={``} key={index}>
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className={`p-4 col-start-0 col-span-3 row-start-13 row-span-2 ${getColorByRoomType('FR')} border-2 border-slate-600 flex items-center justify-center`}>
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "LL" &&
                    item.room_id == 84
                )
                .map((item, index) => (
                  <div className={``} key={index}>
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
                .map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 w-1/2 flex items-center justify-center ${getColorByRoomType(item.room_type)} border-2 border-slate-600`}
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
                .map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 w-1/2 flex items-center justify-center ${getColorByRoomType(item.room_type)} border-2 border-slate-600`}
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
