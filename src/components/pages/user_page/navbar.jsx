"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  LogOut,
  LogOutIcon,
  Menu,
  Settings,
  User,
  UserRoundPen,
  X,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/auth_context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import ChildDialog from "./edit_user_info";
import axios from "axios";

export default function Navbar() {
  const { token, clearAuthData, isGoogle, loading } = useAuth();
  console.log(isGoogle);
  const [states, setStates] = useState({
    isDialogOpen: false,
    isMenuOpen: false,
    formType: "",
  });
  const router = useRouter();
  const pathname = usePathname();
  const [navItems, setNavItems] = useState([
    { name: "Home", href: "/user-page" },
    { name: "Map", href: "/map" },
  ]);

  const [userInfo, setUserInfo] = useState({
    name: "",
    isGoogle: null,
  });

  useEffect(() => {
    console.log(token);
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/user/self",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setUserInfo({
          name: response.data.name,
          isGoogle: response.data.google_id == null ? false : true,
        });
        if (setUserInfo.isGoogle) {
          setNavItems((prev) => {
            const newArray = [...prev];
            newArray.splice(1, 0, { name: "Courses", href: "/courses" });
            return newArray;
          });
        }
        console.log(userInfo);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, [token]);

  // useEffect(() => {
  //   console.log(isGoogle);
  //   if (Boolean(isGoogle) == true && isGoogle != null) {
  //     console.log("In this block");
  //     setNavItems((prev) => {
  //       const newArray = [...prev];
  //       newArray.splice(1, 0, { name: "Courses", href: "/courses" });
  //       return newArray;
  //     });
  //   } else if (Boolean(isGoogle) === false) {
  //     setNavItems((prev) => prev.filter((item) => item.name !== "Courses"));
  //   }
  // }, [isGoogle, loading]);

  const handleLogOut = () => {
    console.log("Logging out");
    clearAuthData();
    router.push("/home");
  };

  const handleNavClick = (href) => {
    setStates({ ...states, isMenuOpen: false });
    router.push(href);
  };

  return (
    <>
      {!loading && (
        <>
          <nav className="shadow-md fixed w-full z-10 bg-white dark:bg-[#17153B]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/Assets/logo.png"
                      alt="Logo"
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="ml-4 text-xs md:text-xl font-bold text-gray-800 dark:text-[#C8ACD6]">
                    Uni-Hub
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className={`px-3 py-2 rounded-md text-sm font-semibold cursor-pointer ${
                          pathname === item.href
                            ? "underline-offset-8 underline text-black dark:border-[#C8ACD6] dark:text-[#C8ACD6]"
                            : "text-gray-600 hover:text-gray-900 dark:text-[#C8ACD6] dark:hover:text-[#FFFADA]"
                        }`}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="hidden md:flex md:gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                        <span className="sr-only">User menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onSelect={() =>
                          setStates((prev) => ({
                            ...prev,
                            isDialogOpen: true,
                            formType: "username",
                          }))
                        }
                      >
                        <UserRoundPen className="mr-2 h-4 w-4" />
                        <span>Edit Username</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() =>
                          setStates((prev) => ({
                            ...prev,
                            isDialogOpen: true,
                            formType: "password",
                          }))
                        }
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Change Password</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={handleLogOut}>
                        <LogOutIcon className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="md:hidden flex items-center">
                  <button
                    onClick={() =>
                      setStates((prev) => ({
                        ...prev,
                        isMenuOpen: !prev.isMenuOpen,
                      }))
                    }
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    {states.isMenuOpen ? (
                      <X className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Menu className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {states.isMenuOpen && (
              <div className="md:hidden dark:bg-[#2E236C]">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        pathname === item.href
                          ? "border-b-2 border-blue-500 text-blue-500 dark:border-[#C8ACD6] dark:text-[#C8ACD6]"
                          : "text-gray-600 dark:text-[#C8ACD6] hover:text-gray-900"
                      }`}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <Button
                    onClick={handleLogOut}
                    className="bg-black dark:bg-[#2E236C] dark:hover:bg-[#433D8B] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-900 ml-2"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut />
                      Log Out
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </nav>
          <ChildDialog
            isOpen={states.isDialogOpen}
            formType={states.formType}
            onClose={() =>
              setStates((prev) => ({ ...prev, isDialogOpen: false }))
            }
            userInfo={userInfo}
            token={token}
          />
        </>
      )}
    </>
  );
}
