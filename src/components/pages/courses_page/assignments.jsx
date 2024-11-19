import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CircularProgress } from "@mui/material";
import { CalendarIcon } from "lucide-react";
import moment from "moment";
import React from "react";

const CourseAssignments = ({loading, calendarEvents}) => {
  return (
    <Card className="h-[50vh]">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between p-2 md:p-4">
          <div className="flex items-center gap-1 md:gap-4">
            <CalendarIcon size={25} className="text-black " />
            <h1 className="text-sm md:text-2xl text-slate-700 font-bold ">
              Upcoming Deadlines
            </h1>
          </div>
        </div>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center w-full">
              <CircularProgress size={50} />
            </div>
          ) : (
            <>
              <p className="text-xl font-bold text-primary mb-4">
                {calendarEvents.length} assignments
              </p>
              <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                <ul className="space-y-4">
                  {calendarEvents.map((event, index) => (
                    <li key={index} className="bg-secondary p-3 rounded-lg">
                      <p className="font-medium text-primary">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Due:{" "}
                        {moment(event.start).format("MMMM Do YYYY, h:mm a")}
                      </p>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default CourseAssignments;
