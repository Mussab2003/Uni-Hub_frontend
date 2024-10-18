import Navbar from "@/components/pages/user_page/navbar";
import { RepoProvider } from "@/context/repo_context";

export default function HomeLayout({ children }) {
  return (
    <main>
      {/* <RepoProvider> */}
        <Navbar />
        {children}
      {/* </RepoProvider> */}
    </main>
  );
}
