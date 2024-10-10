import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ScanSearch } from "lucide-react";
import { Card } from "@mui/material";

const Hero = ({name}) => {
  return (
    <div className="px-4 mt-10 pt-24 flex justify-center w-full">
      <Card className="w-full h-full">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4 bg-[#E5E7EB] dark:bg-[#2E236C]  p-4">
            <Search size={30} className="text-slate-700 dark:text-[#C8ACD6]"/>
            <h1 className="text-4xl text-slate-700 dark:text-[#C8ACD6] md:text-3xl  font-bold ">
              Search For Repositories {name}
            </h1>
          </div>
          <div className="m-6 flex items-center gap-2 ">
            <Input
              type="search"
              placeholder="Search repositories..."
              className="w-full h-14 dark:text-[#C8ACD6] text-lg "
            />
            <Button className="dark:bg-[#2E236C] w-1/12 dark:hover:bg-[#433D8B] h-12">
              Search
            </Button>
          </div>
        </div>
      </Card>
    </div>
    // <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">

    //       <div className="text-center">
    //         <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
    //           Data to enrich your online business
    //         </h1>
    //         <p className="mt-6 text-lg leading-8 text-gray-600">
    //           Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
    //           fugiat veniam occaecat fugiat aliqua.
    //         </p>
    //         <div className="mt-10 flex items-center justify-center gap-x-6">
    //           <a
    //             href="#"
    //             className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //           >
    //             Get started
    //           </a>
    //           <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
    //             Learn more <span aria-hidden="true">→</span>
    //           </a>
    //         </div>
    //       </div>
    //     </div>
  );
};

export default Hero;
