import Navbar from "@/components/pages/user_page/navbar";

export default function HomeLayout({ children }) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
