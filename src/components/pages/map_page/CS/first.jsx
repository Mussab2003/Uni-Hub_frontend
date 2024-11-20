import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const FirstFloor = ({ data }) => {
  return (
    <Card className=" bg-[#F3F4F6]">
      <CardContent className="p-0">
        <div className="grid grid-cols-8 grid-rows-10 ">
          <div className="row-span-2 w-1/2 flex items-center justify-center bg-SR border-2 border-slate-600">
            {data
              .filter((item) => item.room_id == 128)
              .map((item, index) => (
                <div key={index} className={""}>
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
          <div className="w-1/2 row-span-2 row-start-3 flex items-center justify-center bg-SR border-2 border-slate-600">
            {data
              .filter((item) => item.room_id == 129)
              .map((item, index) => (
                <div key={index} className={``}>
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
          <div className="w-1/2 row-span-2 row-start-5 flex items-center justify-center bg-SR border-2 border-slate-600">
            {data
              .filter((item) => item.room_id == 130)
              .map((item, index) => (
                <div key={index} className={``}>
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
          {/* Upper left */}
          <div className="col-span-3 col-start-2  col-end-4 row-span-2 row-start-5 flex">
            {data
              .filter(
                (item) =>
                  item.floor_id == 3 &&
                  item.direction == "UL" &&
                  item.room_id != 128 &&
                  item.room_id != 129 &&
                  item.room_id != 130
              )
              .map((item, index) => (
                <div
                  key={index}
                  className={`w-1/4 flex items-center justify-center  bg-${item.room_type} border-2 border-slate-600`}
                >
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>

          {/* Upper Right */}
          <div className="col-span-3 row-span-2 col-start-5 row-start-5 flex">
            {data
              .filter(
                (item) =>
                  item.floor_id == 3 &&
                  item.direction == "UR" &&
                  item.room_id != 140 &&
                  item.room_id != 141 &&
                  item.room_id != 139
              )
              .map((item, index) => (
                <div
                  key={index}
                  className={`w-1/3 flex items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
                >
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
          <div className=" row-span-2 col-span-1 col-start-8  w-1/2 mx-24  flex items-center justify-center bg-SR border-2 border-slate-600">
            {data
              .filter((item) => item.room_id == 139)
              .map((item, index) => (
                <div className={""} key={index}>
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
          <div className=" row-span-2 col-span-1 col-start-8  w-1/2 mx-24  flex items-center justify-center bg-SR border-2 border-slate-600">
            {data
              .filter((item) => item.room_id == 141)
              .map((item, index) => (
                <div className={""} key={index}>
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
          <div className="row-span-2 row-start-3 col-start-8 w-1/2 mx-24 flex items-center justify-center bg-SR border-2 border-slate-600">
            {data
              .filter((item) => item.room_id == 140)
              .map((item, index) => (
                <div key={index} className={``}>
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
          {/* Lower Left */}
          <div className="row-start-9 col-start-2 col-end-4 row-span-2 flex ">
            {data
              .filter((item) => item.floor_id == 3 && item.direction == "LL")
              .map((item, index) => (
                <div
                  key={index}
                  className={`w-1/2 flex items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
                >
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>

          {/* Lower Right */}
          <div className="row-start-9 col-start-5 row-span-2 col-span-3 flex">
            {data
              .filter((item) => item.floor_id == 3 && item.direction == "LR")
              .map((item, index) => (
                <div
                  key={index}
                  className={`w-1/3 flex items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
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

export default FirstFloor;
