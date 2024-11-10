'use client';
import { createContext, useContext, useState } from "react";


const CourseContext = createContext();

export const CoursesProvider = ({ children }) => {  
    const [courseData, setCourseData] = useState([]);

    const setData = (data) => {
        setCourseData(data);
        console.log(courseData)
    };

    const clearData = () => {
        setCourseData([]);
    };

    return (
        <CourseContext.Provider  
            value={{
                courseData,
                setData,
                clearData
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};

export const useCourses = () => {
    return useContext(CourseContext);
};
