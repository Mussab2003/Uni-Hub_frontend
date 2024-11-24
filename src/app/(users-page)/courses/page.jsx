"use client";
import axios from "axios";
import { MoveLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/auth_context";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useCourses } from "@/context/course_context";
import CoursesCard from "@/components/pages/courses_page/courses";
import CourseAssignments from "@/components/pages/courses_page/assignments";
import AllCourses from "@/components/pages/courses_page/all_courses";
import AssignmentCalendar from "@/components/pages/courses_page/assignment_calendar";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@mui/material";

const CalendarPage = () => {
  const { courseData } = useCourses();
  console.log(courseData);
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    console.log(token);
    const fetchData = async () => {
      console.log("INside this block");
      console.log(courses.length);
      console.log(courseData?.length);
      if (courses.length == 0 && courseData?.length == 0) {
        console.log("INside this block 2");
        try {
          setLoading(true);
          const response = await axios.get(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/course",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          setCourses(response.data);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      } else if (courseData?.length > 0) {
        setCourses(courseData);
      }
    };
    fetchData();
  }, [token, courseData]);

  const refreshCourses = async () => {
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
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const calendarEvents = courses
    .filter((course) => course.title && course.due_date)
    .map((course) => ({
      title: `${course.name}: ${course.title}`,
      start: new Date(course.due_date),
      end: new Date(course.due_date),
      allDay: true,
      assignment_link: course.assignment_link,
    }));

  return (
    <div className="container mx-auto  gap-5 px-4 space-y-6">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <MoveLeft
            className="cursor-pointer dark:text-white"
            onClick={() => {
              router.push("/user-page");
            }}
          />
          <h1 className="dark:text-white font-bold text-xl md:text-2xl">
            Course Dashboard
          </h1>
        </div>
        <div>
          <Button onClick={refreshCourses}>Refresh</Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center">
          <CircularProgress size={50} color="black" />
        </div>
      ) : (
        <div>
          <AllCourses courses={courses} />
          <div className="mt-8">
            <Tabs defaultValue="assignments" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="assignments">
                  Upcoming Assignments
                </TabsTrigger>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              </TabsList>
              <TabsContent value="assignments">
                <CourseAssignments calendarEvents={calendarEvents} />
              </TabsContent>
              <TabsContent value="calendar">
                <AssignmentCalendar calendarEvents={calendarEvents} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
