import Navbar from "@/components/pages/landing_page/navbar";

export default function HomeLayout({ children }) {
  return (
    <main className="bg-[#81BFDA]">
      <div className="flex flex-col gap-24">
        <div>
          <Navbar />
        </div>
        <div>
          {children}
        </div>
      </div>
    </main>
  );
}
