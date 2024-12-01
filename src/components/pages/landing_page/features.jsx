import { Brain, BookOpen, Map, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Features() {
  const features = [
    {
      icon: Download,
      title: "Create Repositories",
      description:
        "Upload and organize course resources, past papers, and projects, making them easily accessible to others.",
      color: "bg-emerald-100 dark:bg-emerald-900",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      hoverColor: "hover:bg-emerald-200 dark:hover:bg-emerald-800",
    },
    {
      icon: BookOpen,
      title: "Assignments",
      description:
        "View and manage your pending Google Classroom assignments in one place, helping you stay on top of your tasks.",
      color: "bg-violet-100 dark:bg-violet-900",
      iconColor: "text-violet-600 dark:text-violet-400",
      borderColor: "border-violet-200 dark:border-violet-800",
      hoverColor: "hover:bg-violet-200 dark:hover:bg-violet-800",
    },
    {
      icon: Map,
      title: "University Map",
      description:
        "Navigate the campus with ease using a detailed, interactive map of the entire university.",
      color: "bg-yellow-100 dark:bg-yellow-900",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      hoverColor: "hover:bg-yellow-200 dark:hover:bg-yellow-800",
    },
    {
      icon: Brain,
      title: "Create Notes & Quizzes",
      description:
        "Turn your course resources into personalized notes and quizzes to enhance your study and revision sessions.",
      color: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400",
      borderColor: "border-blue-200 dark:border-blue-800",
      hoverColor: "hover:bg-blue-200 dark:hover:bg-blue-800",
    },
  ];

  return (
    <>
      <div className="w-3/4 space-y-4">
        <h2 className="md:text-4xl text-3xl font-semibold dark:text-[#C8ACD6]">Features</h2>
        <div className="">
          <hr className="border-2 border-grey" />
        </div>
        <p className="mx-auto text-gray-500 md:text-xl/relaxed dark:text-gray-400">
          Empowering your academic journey with essential tools. Sign up now to get started!
        </p>
      </div>
      <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className={`transform transition-all duration-300 ${feature.color} ${feature.borderColor} ${feature.hoverColor} hover:scale-105 overflow-hidden`}
          >
            <CardHeader className="pb-4 flex flex-col items-start">
              <div
                className={`p-2 rounded-full ${feature.color} ${feature.iconColor} mb-4`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl font-bold">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
