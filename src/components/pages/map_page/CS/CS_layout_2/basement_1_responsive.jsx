import { MoveLeft } from "lucide-react";
import React, { useState } from "react";
import Legend from "../../legend";

const BasementOneRes = ({ data }) => {
  const [screen, setScreen] = useState(0);
  const segmentName = {
    1: "Mid",
    2: "Right",
  };
  return (
    <div className="md:hidden">
      {screen != 0 && (
        <div className="flex gap-3 items-center my-3">
          <MoveLeft
            onClick={() => {
              setScreen(0);
            }}
            size={30}
          />
          <span className="text-md text-center font-medium">
            {segmentName[screen]}
          </span>
        </div>
      )}
      {screen == 0 && (
        <div className="bg-[#F3F4F6] md:hidden grid grid-cols-8 grid-rows-1 w-full h-full">
          <div
            onClick={() => {
              setScreen(1);
            }}
            className="bg-Adm col-span-4 p-4 flex items-center justify-center border-2 border-slate-600"
          >
            <span className="text-sm text-center font-medium">Mid</span>
          </div>
          <div
            onClick={() => {
              setScreen(2);
            }}
            className="bg-WR col-start-5 col-span-4 p-4 flex items-center justify-center border-2 border-slate-600"
          >
            <span className="text-sm text-center font-medium">Right</span>
          </div>
        </div>
      )}
      {screen == 1 && (
        <div className="flex flex-col ">
          {data
            .filter(
              (item) =>
                item.floor_id == 0 &&
                item.direction == "RM" &&
                item.room_id == 105
            )
            .map((item, index) => (
              <div
                className={`p-4 bg-DEP border-2 border-slate-600`}
                key={index}
              >
                <span className="text-sm text-center font-medium">
                  {item.room_name}
                </span>
              </div>
            ))}
          {data
            .filter(
              (item) =>
                item.floor_id == 0 &&
                item.direction == "RM" &&
                item.room_id == 106
            )
            .map((item, index) => (
              <div
                key={index}
                className={`p-4 bg-FR border-2 border-slate-600`}
              >
                <span className="text-sm text-center font-medium">
                  {item.room_name}
                </span>
              </div>
            ))}
          {data
            .filter(
              (item) =>
                item.floor_id == 0 &&
                item.direction == "RM" &&
                item.room_id == 157
            )
            .map((item, index) => (
              <div
                className={`p-4 bg-DEP border-2 border-slate-600`}
                key={index}
              >
                <span className="text-sm text-center font-medium">
                  {item.room_name}
                </span>
              </div>
            ))}
        </div>
      )}
      {screen == 2 && (
        <div className="flex">
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
                className={`p-4 w-1/3 flex items-center justify-center  bg-${item.room_type} border-2 border-slate-600`}
              >
                <span className="text-sm text-center font-medium">
                  {item.room_name}
                </span>
              </div>
            ))}
        </div>
      )}
      <div className="my-4">
        {screen != 0 && <Legend data={data} floor={"Basement 1"} />}
      </div>
    </div>
  );
};

export default BasementOneRes;
