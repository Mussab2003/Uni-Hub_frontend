import localFont from "next/font/local";
import "./globals.css";
import ResponsiveNavBar from "@/components/navbar";

export const metadata = {
  title: "Uni-Hub",
  description: "A student forum",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ResponsiveNavBar/>
        {children}
      </body>
    </html>
  );
}
