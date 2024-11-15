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

const CalendarPage = () => {
  const { courseData } = useCourses();
  console.log(courseData);
  const router = useRouter();
  const [courses, setcourses] = useState([]);
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
          setcourses(response.data);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      } else if (courseData?.length > 0) {
        setcourses(courseData);
      }
    };
    fetchData();
  }, [token, courseData]);

  const calendarEvents = courses
    .filter((course) => course.title && course.due_date)
    .map((course) => ({
      title: `${course.name}: ${course.title}`,
      start: new Date(course.due_date),
      end: new Date(course.due_date),
      allDay: true,
    }));

  return (
    <div className="container mx-auto  gap-5 px-4 space-y-6 pt-28">
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
      <div className="grid gap-6 md:grid-cols-3">
        <CoursesCard loading={loading} courses={courses} />
        <CourseAssignments loading={loading} calendarEvents={calendarEvents} />
      </div>
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Course List</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <AllCourses courses={courses} />
        </TabsContent>
        <TabsContent value="calendar">
          <AssignmentCalendar calendarEvents={calendarEvents} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalendarPage;
