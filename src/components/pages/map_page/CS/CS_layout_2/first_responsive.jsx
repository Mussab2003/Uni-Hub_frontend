import { MoveLeft } from "lucide-react";
import React, { useState } from "react";
import Legend from "../../legend";
import { getColorByRoomType } from "@/lib/utils";

const FirstRes = ({ data }) => {
  const [screen, setScreen] = useState(0);
  
  const segmentName = {
    1: "Left 1",
    2: "Left 2",
    3: "Right 1",
    4: "Right 2",
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
        <div className="bg-[#F3F4F6] md:hidden grid grid-cols-9 grid-rows-7 w-full h-full">
          <div
            onClick={() => {
              setScreen(1);
            }}
            className={`p-4 ${getColorByRoomType('Adm')} col-span-1 row-span-4 flex items-center justify-center border-2 border-slate-600`}
          >
            <span className="text-sm text-center font-medium">
              {segmentName[1]}
            </span>
          </div>
          <div
            onClick={() => {
              setScreen(4);
            }}
            className={`p-4 ${getColorByRoomType('OC')} col-span-1 col-start-9 row-span-4 flex items-center justify-center border-2 border-slate-600`}
          >
            <span className="text-sm text-center font-medium">
              {segmentName[4]}
            </span>
          </div>
          <div
            onClick={() => {
              setScreen(2);
            }}
            className={`p-2 ${getColorByRoomType('HO')} col-start-3 row-start-3 col-span-2 row-end-10 flex items-center justify-center border-2 border-slate-600`}
          >
            <span className="text-sm text-center font-medium">
              {segmentName[2]}
            </span>
          </div>
          <div
            onClick={() => {
              setScreen(3);
            }}
            className={`p-2 ${getColorByRoomType('GR')} row-start-3 col-start-6 col-span-2 row-span-7  flex items-center justify-center border-2 border-slate-600`}
          >
            <span className="text-sm text-center font-medium">
              {segmentName[3]}
            </span>
          </div>
        </div>
      )}
      <div className="w-full bg-[#F3F4F6]">
        {screen == 1 && (
          <div className="-rotate-90 flex flex-col items-center justify-center">
            {data
              .filter(
                (item) =>
                  item.floor_id == 3 &&
                  item.room_id >= 128 &&
                  item.room_id <= 130 &&
                  item.direction == "UL"
              )
              .map((item, index) => (
                <div
                  key={index}
                  className={`w-4/6 h-16 flex flex-col items-center justify-center ${getColorByRoomType(
                    item.room_type
                  )} border-2 border-slate-600`}
                >
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
        )}
        {screen == 2 && (
          <div className=" flex items-center justify-center">
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
                  className={`w-1/4 h-24 flex flex-col items-center justify-center ${getColorByRoomType(
                    item.room_type
                  )} border-2 border-slate-600`}
                >
                  <span className=" text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
        )}
        {screen == 3 && (
          <div className="flex items-center justify-center">
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
                  className={`w-3/4 h-24 flex flex-col items-center justify-center ${getColorByRoomType(
                    item.room_type
                  )} border-2 border-slate-600`}
                >
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
        )}
        {screen == 4 && (
          <div className="-rotate-90 flex flex-col items-center justify-center">
            {data
              .filter(
                (item) =>
                  item.floor_id == 3 &&
                  item.room_id >= 139 &&
                  item.room_id <= 141 &&
                  item.direction == "UR"
              )
              .map((item, index) => (
                <div
                  key={index}
                  className={`w-4/6 h-16 flex flex-col items-center justify-center ${getColorByRoomType(
                    item.room_type
                  )} border-2 border-slate-600`}
                >
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
        )}
        {screen == 5 && (
          <div className="flex flex-col items-center justify-center">
            {data
              .filter((item) => item.floor_id == 2 && item.direction == "LR")
              .map((item, index) => (
                <div
                  key={index}
                  className={`w-3/4 h-16 flex flex-col items-center justify-center ${getColorByRoomType(
                    item.room_type
                  )} border-2 border-slate-600`}
                >
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="my-4">
        {screen != 0 && <Legend data={data} floor={"First"} />}
      </div>
    </div>
  );
};

export default FirstRes;
