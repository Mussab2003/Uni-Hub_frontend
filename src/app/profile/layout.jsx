'use client'
import HomeNavbar from "@/components/pages/landing_page/navbar";
import Navbar from "@/components/pages/user_page/navbar";
import { useAuth } from "@/context/auth_context";

export default function HomeLayout({ children }) {
  const { token, loading } = useAuth();

  return (
    <main>
      {!loading && (
        <div className="flex flex-col gap-20">
          <div className="">
            {token ? <Navbar /> : <HomeNavbar />}
          </div>
          <div className="">
            {children}
          </div>
        </div>
      )}
    </main>
  );
}
