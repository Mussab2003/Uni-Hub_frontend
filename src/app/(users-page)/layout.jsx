import Navbar from "@/components/pages/user_page/navbar";
import { CoursesProvider } from "@/context/course_context";

export default function HomeLayout({ children }) {
  return (
    <main>
      <CoursesProvider>
        <Navbar />
        {children}
      </CoursesProvider>
    </main>
  );
}
