"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { LogOut, Menu, Plus, X } from "lucide-react";
import ChildDialog from "../auth_page/auth_form";
import { useAuth } from "@/context/auth_context";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "Contact", href: "#contactUs" },
];

export default function Navbar() {
  const { name, clearAuthData } = useAuth();
  const [states, setStates] = useState({
    isDialogOpen: false,
    formType: "",
    isMenuOpen: false,
    activeSection: "",
  });
  const observer = useRef(null);

  const handleLogOut = () => {
    clearAuthData();
    window.location.href = "/home";
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStates({ ...states, activeSection: entry.target.id });
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observer.current?.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.current?.unobserve(section);
      });
    };
  }, []);

  const handleNavClick = (href) => {
    setStates({ ...states, isMenuOpen: false });
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
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
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`px-3 py-2 rounded-md text-sm font-semibold ${
                      states.activeSection === item.href.slice(1)
                        ? "underline-offset-8 underline dark:text-[#C8ACD6]"
                        : "text-gray-600 hover:text-gray-900 dark:text-[#C8ACD6] dark:hover:text-[#FFFADA]"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="hidden md:flex md:gap-3">
              <button
                onClick={handleLogOut}
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-900"
              >
                <div className="flex items-center gap-2">
                  <LogOut />
                  Log Out
                </div>
              </button>
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
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    states.activeSection === item.href.slice(1)
                      ? "underline-offset-8 dark:text-[#C8ACD6] underline"
                      : "text-gray-600 dark:text-[#C8ACD6] hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <button
                onClick={handleLogOut}
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-900 ml-2"
              >
                <div className="flex items-center gap-2">
                  <LogOut />
                  Log Out
                </div>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
