import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, EyeOff, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const QuizDisplay = ({ quizData, quizType, showAnswers }) => {
  return (
    <div className="mx-10 my-2 flex flex-col gap-10">
      {quizData.questions.map((q, index) => (
        <div className="flex flex-col gap-3">
          <div key={index + 1} className="flex justify-between">
            <h1 className="font-semibold text-sm md:text-md">
              Question {index + 1}: {q.question}
            </h1>
          </div>
          {showAnswers && (
            <span className="text-sm bg-green-100 text-green-700 rounded-lg p-2">
              Answer: {quizData.answers[index]}
            </span>
          )}
          {quizType == "objective" && (
            <RadioGroup defaultValue="" className="space-y-3">
              {Object.entries(q)
                .filter(([key]) => key !== "question")
                .map(([option, text]) => (
                  <div
                    key={option}
                    className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${
                      showAnswers && option === quizData.answers[index]
                        ? "border-green-500 bg-green-50"
                        : ""
                    }`}
                  >
                    <RadioGroupItem
                      value={option}
                      id={`q${index}-option${option}`}
                    />
                    <Label
                      htmlFor={`q${index}-option${option}`}
                      className="flex-grow cursor-pointer"
                    >
                      {text}
                    </Label>
                  </div>
                ))}
            </RadioGroup>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuizDisplay;
