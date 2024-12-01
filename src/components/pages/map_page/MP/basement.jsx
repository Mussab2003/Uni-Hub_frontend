import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import Legend from "../legend";
import { getColorByRoomType } from "@/lib/utils";

const Basement = ({ data }) => {
  return (
    <Card className="bg-[#F3F4F6] w-full">
      <CardContent>
        <div className={`flex justify-center items-center ${getColorByRoomType('LH')} h-24 md:h-32 m-2 border-2 border-slate-600`}>
          {data
            .filter((item) => item.floor_id == 9 && item.direction == "M")
            .map((item, index) => (
              <div className="" key={index}>
                <span className="text-sm text-center font-medium">
                  {item.room_name}
                </span>
              </div>
            ))}
        </div>
        <div className="md:hidden my-4">
          {screen != 0 && <Legend data={data} floor={"Basement"} />}
        </div>
      </CardContent>
    </Card>
  );
};

export default Basement;
