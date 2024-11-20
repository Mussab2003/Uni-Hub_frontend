import { MoveLeft } from "lucide-react";
import React, { useState } from "react";
import Legend from "../../legend";

const BasementSecondRes = ({ data }) => {
  const [screen, setScreen] = useState(0);
  const segmentName = {
    1: "Left",
    2: "Mid",
  };
  console.log("In this comp");
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
            <span className="text-sm text-center font-medium">Left</span>
          </div>
          <div
            onClick={() => {
              setScreen(2);
            }}
            className="bg-WR col-start-5 col-span-4 p-4 flex items-center justify-center border-2 border-slate-600"
          >
            <span className="text-sm text-center font-medium">Mid</span>
          </div>
        </div>
      )}
      <div className="w-full bg-[#F3F4F6]">
        {screen == 1 && (
          <div className="grid grid-cols-5 grid-rows-7 ">
            <div className="col-start-2 flex ">
              {data
                .filter(
                  (item) =>
                    item.floor_id == 1 &&
                    item.direction == "UL" &&
                    item.room_id >= 94 &&
                    item.room_id <= 95
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className={`p-2 flex items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
                  >
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className="col-start-4 col-span-1 row-span-7"></div>
            <div className="w-full p-2 col-start-0 row-start-2 bg-FR border-2 border-slate-600 flex items-center justify-center">
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
            <div className="p-2 w-full col-start-0 row-start-3 bg-FR border-2 border-slate-600 flex items-center justify-center">
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
            <div className="p-2 w-full col-start-0 row-start-4 bg-FR border-2 border-slate-600 flex items-center justify-center">
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
            <div className="p-2 w-full col-start-5 row-start-2 bg-FR border-2 border-slate-600 flex items-center justify-center">
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
            <div className="p-2 w-full col-start-5 row-start-3 bg-FR border-2 border-slate-600 flex items-center justify-center">
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
            <div className="p-2 w-full col-start-5 row-start-4 bg-FR border-2 border-slate-600 flex items-center justify-center">
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
            <div className="p-2 w-full col-start-0 col-span-3 row-start-5 bg-FR border-2 border-slate-600 flex items-center justify-center">
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
            <div className="p-2 w-full col-start-0 col-span-3 row-start-7 bg-FR border-2 border-slate-600 flex items-center justify-center">
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
          </div>
        )}
        {screen == 2 && (
          <div className="grid grid-cols-6 grid-rows-2 items-center justify-center">
            <div className="flex">
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
                    className={`p-2  flex items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
                  >
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
            <div className="col-start-2 row-start-2 flex">
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
                    className={`p-2 flex items-center justify-center bg-${item.room_type} border-2 border-slate-600`}
                  >
                    <span className="text-sm text-center font-medium">
                      {item.room_name}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <div className="my-4">
        {screen != 0 && <Legend data={data} floor={"Basement 2"} />}
      </div>
    </div>
  );
};

export default BasementSecondRes;
