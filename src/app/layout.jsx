import "./globals.css"
import {Poppins} from 'next/font/google'
import { AuthProvider } from "@/context/auth_context";
import { RepoProvider } from "@/context/repo_context";
const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100","200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata = {
  title: "UniHub",
  icon: '/logo.png'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-white dark:bg-[#17153B]`}
      >
        <AuthProvider>
            <RepoProvider>
            {children}
            </RepoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
