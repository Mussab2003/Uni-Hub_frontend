import Navbar from "@/components/pages/landing_page/navbar";

export default function HomeLayout({ children }) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
