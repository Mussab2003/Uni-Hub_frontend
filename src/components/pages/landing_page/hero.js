import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ScanSearch } from "lucide-react";

const Hero = () => {
  return (
    <div className="container  mx-auto px-4 justify-center items-center ">
      
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          View and Discover Student Repositories
        </h1>
        <div className="mb-6 flex justify-center items-center gap-1">
          <Input
            type="search"
            placeholder="Search repositories..."
            className="max-w-md "
          />
          <Button>
            <Search/>
          </Button>
        </div>
        <p className="text-xl text-gray-600 mb-8">
          Explore a variety of student-contributed resources, including course
          materials, past papers, and projects.
        </p>
        <Button size="lg">Get Started</Button>
      </div>
    </div>
  );
};

export default Hero;
