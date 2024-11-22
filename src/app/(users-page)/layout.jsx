import Navbar from "@/components/pages/user_page/navbar";
import { CoursesProvider } from "@/context/course_context";
import { RepoProvider } from "@/context/repo_context";

export default function HomeLayout({ children }) {
  return (
    <main>
      <CoursesProvider>
        <div className="flex flex-col gap-28">
          <div>
            <Navbar />
          </div>
          <div>
            {children}
          </div>
        </div>
      </CoursesProvider>
    </main>
  );
}
