"use client";

import { MapPin, BookOpen, ClipboardList, Brain } from "lucide-react";
import Hero from "@/components/pages/landing_page/hero";
import Features from "@/components/pages/landing_page/features";
import { FileDown } from "lucide-react";
import { Map } from "lucide-react";
export default function LandingPage() {
  const cards = [
    { title: "Pending Assignments", icon: ClipboardList },
    { title: "University Map", icon: MapPin },
    { title: "Create Notes", icon: BookOpen },
    { title: "Create Quizzes", icon: Brain },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section
        className="py-24 min-h-screen flex justify-center items-center "
        id="home"
      >
        <Hero />
      </section>
      <section className="min-h-screen" id="features">
        <div className="lg:md:ml-40 px-4 flex flex-col gap-3">
          <div className="mt-20">
            <h1 className="text-4xl font-semibold">Features</h1>
          </div>
          <hr className="border-2 border-grey" />
          <div className="my-7 flex flex-col md:lg:flex-row  gap-3">
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
      <section className="my-32" id="contactUs">
        <div className="lg:md:ml-40 px-4 flex flex-col gap-3">
          <div className="mt-20">
            <h1 className="text-4xl font-semibold">Contact Us</h1>
          </div>
          <hr className="border-2 border-grey" />
          <div>
            <p>
              For any queries, feedback or reporting a bug please contact us at:
            </p>
          </div>
            <a className="text-blue-500 underline" href="mailto:k224146@nu.edu.pk">k224146@nu.edu.pk</a>
            <a className="text-blue-500 underline" href="mailto:k224142@nu.edu.pk">k224142@nu.edu.pk</a>
            <a className="text-blue-500 underline" href="mailto:k224131@nu.edu.pk">k224131@nu.edu.pk</a>
        </div>
      </section>
    </div>
  );
}
