import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge, Card, CardContent, CircularProgress } from "@mui/material";
import { BookOpen } from "lucide-react";
import React from "react";

const CoursesCard = ({loading, courses}) => {
  return (
    <Card className="md:col-span-2 h-[50vh]">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between p-2 md:p-4">
          <div className="flex items-center gap-1 md:gap-4">
            <BookOpen size={25} className="text-black " />
            <h1 className="text-sm md:text-2xl text-slate-700 font-bold ">
              Enrolled Courses
            </h1>
          </div>
        </div>
        <CardContent>
          <div
          // className="m-6 flex items-center gap-2"
          >
            {loading ? (
              <div className="flex justify-center items-center w-full">
                <CircularProgress size={50} />
              </div>
            ) : (
              <>
                <p className="text-xl font-bold text-primary mb-4">
                  {courses.length} courses enrolled
                </p>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  <ul className="space-y-4">
                    {courses.map((course, index) => (
                      <li
                        key={index}
                        className="bg-secondary p-3 rounded-lg transition-all hover:shadow-md"
                      >
                        <a
                          href={course.course_link}
                          className="text-primary hover:underline font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {course.name}
                        </a>
                        <p className="text-muted-foreground text-sm mt-1">
                          {course.course_description}
                        </p>
                        {course.title && (
                          <Badge variant="outline" className="mt-2">
                            {course.title}
                          </Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default CoursesCard;
