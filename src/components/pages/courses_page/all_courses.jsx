import { Card, CardContent } from "@mui/material";
import { BookOpen } from "lucide-react";
import React from "react";

const AllCourses = ({ courses }) => {
  const uniqueCourses = courses.filter(
    (course, index, self) =>
      index === self.findIndex((t) => t.name === course.name)
  );
  return (
    <Card className="">
      <div className="flex p-3">
        <div className="flex items-center gap-1 md:gap-4">
          <BookOpen size={25} className="text-black " />
          <h1 className="text-sm md:text-2xl text-slate-700 font-bold ">
            Enrolled Courses
          </h1>
        </div>
      </div>
      <CardContent>
        <p className="text-xl font-bold text-primary mb-4">
          {uniqueCourses.length} courses enrolled
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {uniqueCourses.map((course, index) => (
            <Card key={index}>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between p-2 md:p-4">
                  <div className="flex items-center gap-1 md:gap-4">
                    <h1 className="text-sm md:text-xl text-slate-700 font-bold ">
                      {course.name}
                    </h1>
                  </div>
                </div>
              </div>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {course.course_description}
                </p>
                <a
                  href={course.course_link}
                  className="text-primary hover:underline text-sm mt-2 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View in Google Classroom
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllCourses;
