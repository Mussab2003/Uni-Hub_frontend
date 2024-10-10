"use client";

import { MapPin, BookOpen, ClipboardList, Brain } from "lucide-react";
import Hero from "@/components/pages/landing_page/hero";
import Features from "@/components/pages/landing_page/features";
import { FileDown } from "lucide-react";
import { Map } from "lucide-react";
import { useAuth } from "@/context/auth_context";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function LandingPage() {
  const cards = [
    { title: "Pending Assignments", icon: ClipboardList },
    { title: "University Map", icon: MapPin },
    { title: "Create Notes", icon: BookOpen },
    { title: "Create Quizzes", icon: Brain },
  ];

  const { name, token, isGoogle, loading } = useAuth();
  useEffect(() => {
    if (!loading) {
      if (name != null && token != null) {
        window.location.href = "/user-page";
      }
    }
  }, [loading]);

  return (
    <>
      {!loading && token == null && name == null ? (
        <div className="min-h-screen">
          <section
            className="py-24 min-h-screen flex justify-center items-center "
            id="home"
          >
            <Hero />
          </section>
          <section className="min-h-screen" id="features">
            <div className="container flex flex-col gap-4 items-center">
              <div className="mt-20 w-3/4">
                <h1 className="md:text-4xl text-3xl font-semibold dark:text-[#C8ACD6]">
                  Features
                </h1>
              </div>
              <div className="w-3/4">
                <hr className="border-2 border-grey" />
              </div>
              <div className="my-7 flex flex-col md:lg:flex-row  gap-3 w-3/4">
                <Features
                  title={"Create Repositories"}
                  description={
                    "upload and organize course resources, past papers, and projects, making them easily accessible to others."
                  }
                  color={"#5ECCA0"}
                >
                  <FileDown size={40} />
                </Features>
                <Features
                  title={"Assignments"}
                  description={
                    "View and manage your pending Google Classroom assignments in one place, helping you stay on top of your tasks."
                  }
                  color={"#CB9BFA"}
                >
                  <BookOpen size={40} />
                </Features>
                <Features
                  title={"University Map"}
                  description={
                    "Navigate the campus with ease using a detailed, interactive map of the entire university."
                  }
                  color={"#F8FD91"}
                >
                  <Map size={40} />
                </Features>
                <Features
                  title={"Create Notes & Quizzes"}
                  description={
                    "Turn your course resources into personalized notes and quizzes to enhance your study and revision sessions."
                  }
                  color={"#60A5FA"}
                >
                  <Brain size={40} />
                </Features>
              </div>
            </div>
          </section>
          <section id="popularRepositories">
            <div className="container flex flex-col gap-4 items-center">
              <div className="mt-20 w-3/4">
                <h1 className="md:text-4xl text-3xl font-semibold dark:text-[#C8ACD6]">
                  Popular Repositories
                </h1>
              </div>
              <div className="w-3/4">
                <hr className="border-2 border-grey" />
              </div>
            </div>
          </section>
          <section className="my-11" id="contactUs">
            <div className="container flex flex-col gap-3 items-center">
              <div className="mt-20 w-3/4">
                <h1 className="md:text-4xl text-3xl font-semibold dark:text-[#C8ACD6]">
                  Contact Us
                </h1>
              </div>
              <div className="w-3/4">
                <hr className="border-2 border-grey" />
              </div>
              <div className="w-3/4">
                <p className="dark:text-[#C8ACD6]">
                  For any queries, feedback or reporting a bug please contact us
                  at:
                </p>
              </div>
              <div className="w-3/4 flex flex-col gap-2">
                <a
                  className="text-blue-500 dark:text-[#433D8B] hover:text-black dark:hover:text-white underline "
                  href="mailto:k224146@nu.edu.pk"
                >
                  k224146@nu.edu.pk
                </a>
                <a
                  className="text-blue-500 dark:text-[#433D8B] hover:text-black dark:hover:text-white underline"
                  href="mailto:k224142@nu.edu.pk"
                >
                  k224142@nu.edu.pk
                </a>
                <a
                  className="text-blue-500 dark:text-[#433D8B] hover:text-black dark:hover:text-white underline"
                  href="mailto:k224131@nu.edu.pk"
                >
                  k224131@nu.edu.pk
                </a>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <CircularProgress size={50} />
      )}
    </>
  );
}
