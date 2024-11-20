import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { extractUniqueRoomTypesByFloor } from "@/lib/utils";
import React from "react";

const Legend = ({ data, floor }) => {
    const roomTypes = extractUniqueRoomTypesByFloor(floor, data)
    console.log(roomTypes)
    return (
    <Card>
      <CardHeader>
        <h1 className="font-semibold text-2xl">Legend</h1>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {roomTypes.map((room, index) => <div className="flex items-center gap-2">
                <div className={`bg-${room.room_type} w-8 h-8`}></div>
                <span>{room.room_type_name}</span>
            </div>)}

        </div>
      </CardContent>
    </Card>
  );
};

export default Legend;
