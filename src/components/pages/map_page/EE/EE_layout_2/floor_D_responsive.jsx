import { MoveLeft } from "lucide-react";
import React, { useState } from "react";

const FloorDRes = ({ data }) => {
  const [screen, setScreen] = useState(0);
  const segmentName = {
    1: "Upper Left",
    2: "Mid",
    3: "Upper Right",
    4: "Lower Left",
    5: "Lower Right",
  };
  console.log("In this comp");
  return (
    <div className="h-[50vh] md:hidden">
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
            className="bg-ADM col-span-3 row-span-4 flex items-center justify-center border-2 border-slate-600"
          >
            <span className="text-sm text-center font-medium">Upper Left</span>
          </div>
          <div
            onClick={() => {
              setScreen(3);
            }}
            className="bg-OC col-span-3  col-start-6 row-span-4 flex items-center justify-center border-2 border-slate-600"
          >
            <span className="text-sm text-center font-medium">Upper Right</span>
          </div>
          <div
            onClick={() => {
              setScreen(4);
            }}
            className="bg-HO row-start-7 col-span-3 row-span-4 flex items-center justify-center border-2 border-slate-600"
          >
            <span className="text-sm text-center font-medium">Lower Left</span>
          </div>
          <div
            onClick={() => {
              setScreen(5);
            }}
            className="bg-GR row-start-7 col-start-6 col-span-3 row-span-4  flex items-center justify-center border-2 border-slate-600"
          >
            <span className="text-sm text-center font-medium">Lower Right</span>
          </div>
        </div>
      )}
      <div className="w-full bg-[#F3F4F6]">
        {screen == 1 && (
          <div className="flex flex-col items-center justify-center">
            {data
              .filter((item) => item.floor_id == 7 && item.direction == "UL")
              .map((item) => (
                <div
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
              .filter((item) => item.floor_id == 7 && item.direction == "M")
              .map((item) => (
                <div
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
              .filter((item) => item.floor_id == 7 && item.direction == "UR")
              .map((item) => (
                <div
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
              .filter((item) => item.floor_id == 7 && item.direction == "LL")
              .map((item) => (
                <div
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
              .filter((item) => item.floor_id == 7 && item.direction == "LR")
              .map((item) => (
                <div
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
    </div>
  );
};

export default FloorDRes;
