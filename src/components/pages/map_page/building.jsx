import { Card, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import React from "react";

const Building = ({handleClick, name, floors}) => {
  return (
    <Card className='w-full md:w-1/3 h-80 cursor-pointer hover:shadow-md' onClick={handleClick}>
      <CardContent className="p-6 h-full">
        <div className="flex flex-col justify-center items-center gap-4 h-full">
          <Building2 className="w-14 h-14 text-primary" />
          <h2 className="text-2xl font-semibold text-center">{name}</h2>
          <p className="text-md text-muted-foreground text-center">
            {floors} Floors
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Building;
