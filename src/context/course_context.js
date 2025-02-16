"use client";
import axios from "axios";
import { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export const CoursesProvider = ({ children }) => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const setData = (data) => {
    setCourseData(data);
  };

  const clearData = () => {
    setCourseData([]);
  };

  const fetchData = async (token, refresh) => {
    setLoading(true); // Start loading
    try {
      const endpoint = refresh
        ? process.env.NEXT_PUBLIC_BACKEND_URL + "/course/refresh"
        : process.env.NEXT_PUBLIC_BACKEND_URL + "/course";
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourseData(response.data); // Update context data
    } catch (err) {
      console.error("Error fetching course data:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courseData,
        setData,
        clearData,
        fetchData,
        loading,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  return useContext(CourseContext);
};
