import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";
import React from "react";


const Features = ({ title, description, color, children }) => {
  return (
      <Card className={`w-full md:lg:w-1/4 min-h-auto md:h-80 lg:h-auto p-4 flex flex-col justify-evenly gap-5 `} style={{backgroundColor: color}}>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="font-medium">{description}</p>
          <hr className="border-1 border-black"/>
          <div className="flex justify-between items-center">
            {children}
            <Button>
              <ArrowBigRight/>
            </Button>
          </div>        
      </Card>
  );
};

export default Features;
