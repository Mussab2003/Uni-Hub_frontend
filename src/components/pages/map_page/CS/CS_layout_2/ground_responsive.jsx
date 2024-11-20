import { MoveLeft } from "lucide-react";
import React, { useState } from "react";
import Legend from "../../legend";

const GroundRes = ({ data }) => {
  const [screen, setScreen] = useState(0);
  console.log("In this comp");
  const segmentName = {
    1: "Upper Left",
    3: "Upper Right",
    4: "Lower Left",
    5: "Lower Right",
  };
  return (
    <div className="hmd:hidden">
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
        <div className="bg-[#F3F4F6] md:hidden grid grid-cols-8 grid-rows-10 w-full h-full">
          <div
            onClick={() => {
              setScreen(1);
            }}
            className="p-4 bg-Adm col-span-3 row-span-4 flex items-center justify-center border-2 border-slate-600"
          >
            <span className="text-sm text-center font-medium">Upper Left</span>
          </div>
          <div
            onClick={() => {
              setScreen(3);
            }}
            className="p-4 bg-OC col-span-3 col-start-6 row-span-4 flex items-center justify-center border-2 border-slate-600"
          >
            <span className="text-sm text-center font-medium">Upper Right</span>
          </div>
          <div
            onClick={() => {
              setScreen(4);
            }}
            className="p-4 bg-HO row-start-7 col-span-3 row-span-4 flex items-center justify-center border-2 border-slate-600"
          >
            <span className="text-sm text-center font-medium">Lower Left</span>
          </div>
          <div
            onClick={() => {
              setScreen(5);
            }}
            className="p-4 bg-GR row-start-7 col-start-6 col-span-3 row-span-4  flex items-center justify-center border-2 border-slate-600"
          >
            <span className="text-sm text-center font-medium">Lower Right</span>
          </div>
        </div>
      )}
      <div className="w-full bg-[#F3F4F6]">
        {screen == 1 && (
          <div className="flex flex-col items-center justify-center">
            {data
              .filter((item) => item.floor_id == 2 && item.direction == "UL")
              .map((item, index) => (
                <div
                  key={index}
                  className={`w-3/4 h-16 flex flex-col items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
                >
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
        )}
        {screen == 2 && (
          <div className="flex flex-col items-center justify-center">
            {data
              .filter((item) => item.floor_id == 2 && item.direction == "M")
              .map((item, index) => (
                <div
                  key={index}
                  className={`w-3/4 h-16 flex flex-col items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
                >
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
        )}
        {screen == 3 && (
          <div className="flex flex-col items-center justify-center">
            {data
              .filter((item) => item.floor_id == 2 && item.direction == "UR")
              .map((item, index) => (
                <div
                  key={index}
                  className={`w-3/4 h-16 flex flex-col items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
                >
                  <span className="text-sm text-center font-medium">
                    {item.room_name}
                  </span>
                </div>
              ))}
          </div>
        )}
        {screen == 4 && (
          <div className="flex flex-col items-center justify-center">
            {data
              .filter((item) => item.floor_id == 2 && item.direction == "LL")
              .map((item, index) => (
                <div
                  key={index}
                  className={`w-3/4 h-16 flex flex-col items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
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
                  className={`w-3/4 h-16 flex flex-col items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
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
        {screen != 0 && <Legend data={data} floor={"Ground"} />}
      </div>
    </div>
  );
};

export default GroundRes;
