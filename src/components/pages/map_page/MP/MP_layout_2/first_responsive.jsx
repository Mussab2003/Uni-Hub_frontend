import { MoveLeft } from "lucide-react";
import React, { useState } from "react";
import Legend from "../../legend";
import { getColorByRoomType } from "@/lib/utils";

const FirstRes = ({ data }) => {
  const [screen, setScreen] = useState(0);
  const segmentName = {
    1: "Upper Part",
    2: "Lower Part",
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
        <div className="bg-[#F3F4F6] md:hidden grid grid-cols-8 grid-rows-2 w-full h-full">
          <div
            onClick={() => {
              setScreen(1);
            }}
            className={`${getColorByRoomType(
              "Adm"
            )} col-span-8 p-4 flex items-center justify-center border-2 border-slate-600`}
          >
            <span className="text-sm text-center font-medium">
              {segmentName[1]}
            </span>
          </div>
          <div
            onClick={() => {
              setScreen(2);
            }}
            className={`${getColorByRoomType(
              "WR"
            )} row-start-2 col-span-8 p-4 flex items-center justify-center border-2 border-slate-600`}
          >
            <span className="text-sm text-center font-medium">
              {segmentName[2]}
            </span>
          </div>
        </div>
      )}
      {screen == 1 && (
        <div
          className={`p-4 ${getColorByRoomType(
            "Cafe"
          )} border-2 border-slate-600 flex items-center justify-center`}
        >
          {data
            .filter((item) => item.floor_id == 11 && item.direction == "M")
            .map((item, index) => (
              <div className={``} key={index}>
                <span className="text-sm text-center font-medium">
                  {item.room_name}
                </span>
              </div>
            ))}
        </div>
      )}
      {screen == 2 && (
        <div className="grid grid-cols-2 grid-rows-2">
          <div
            className={`p-4 ${getColorByRoomType(
              "WR"
            )} border-2 border-slate-600 flex justify-center items-center`}
          >
            {data
              .filter(
                (item) =>
                  item.floor_id == 11 &&
                  item.direction == "LL" &&
                  item.room_id == 154
              )
              .map((item, index) => (
                <div className={``} key={index}>
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
          <div
            className={`col-start-2 row-start-2 p-4 ${getColorByRoomType(
              "WR"
            )} border-2 border-slate-600 flex justify-center items-center`}
          >
            {data
              .filter(
                (item) =>
                  item.floor_id == 11 &&
                  item.direction == "LL" &&
                  item.room_id == 155
              )
              .map((item, index) => (
                <div className={``} key={index}>
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="my-4">
        {screen != 0 && <Legend data={data} floor={"First"} />}
      </div>
    </div>
  );
};

export default FirstRes;
