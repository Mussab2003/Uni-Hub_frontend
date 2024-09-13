import "./globals.css";
import ResponsiveNavBar from "@/components/navbar";
import { Providers } from "./provider";

export const metadata = {
  title: "Uni-Hub",
  description: "A student forum",
  icons: {
    icon: '/Assets/logo.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark:bg-gradient-to-b from-dark-background to-darkGrey">
        <Providers>
          <ResponsiveNavBar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
