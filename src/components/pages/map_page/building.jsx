import { Card, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import React from "react";

const Building = ({handleClick, name, floors}) => {
  return (
    <Card className='w-full md:w-1/4 cursor-pointer hover:shadow-md' onClick={handleClick}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4">
          <Building2 className="w-12 h-12 text-primary" />
          <h2 className="text-xl font-semibold text-center">{name}</h2>
          <p className="text-sm text-muted-foreground text-center">
            {floors} Floors
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Building;
