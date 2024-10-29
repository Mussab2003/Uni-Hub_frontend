"use client";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { BookOpen, CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/auth_context";
import { ScrollArea } from "@/components/ui/scroll-area";
import moment from 'moment';
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { Calendar, momentLocalizer } from 'react-big-calendar'


const page = () => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    console.log(token);
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/course/refresh",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setCourseData(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [token]);

  const calendarEvents = courseData
    .filter((course) => course.title && course.due_date)
    .map((course) => ({
      title: `${course.name}: ${course.title}`,
      start: new Date(course.due_date),
      end: new Date(course.due_date),
      allDay: true,
    }));

  return (
    <div className="min-h-screen w-full flex flex-col gap-5 mx-4 pt-28">
      <div className="flex gap-2">
        <Card className="w-3/4 h-[50vh]">
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
                      {courseData.length} courses enrolled
                    </p>
                    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                      <ul className="space-y-4">
                        {courseData.map((course, index) => (
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
        <Card className="w-1/4 h-[50vh]">
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
              {loading ? (<CircularProgress />) : (
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
                            Due: {moment(event.start).format("MMMM Do YYYY, h:mm a")}
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
      </div>
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Course List</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Card className="h-[50vh]">
            <CardHeader title="All Courses" />
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {courseData.map((course, index) => (
                  <Card key={index}>
                    {/* <CardHeader>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                    </CardHeader> */}
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
                      <p className="text-sm text-muted-foreground">{course.course_description}</p>
                      <a href={course.course_link} className="text-primary hover:underline text-sm mt-2 inline-block" target="_blank" rel="noopener noreferrer">
                        View in Google Classroom
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>

            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
