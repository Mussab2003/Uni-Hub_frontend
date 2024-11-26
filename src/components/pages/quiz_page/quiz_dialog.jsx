"use client";
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  Folder,
  ListTodo,
  MoveLeft,
  PenLine,
} from "lucide-react";
import { Snackbar, Alert } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Controller, set, useForm } from "react-hook-form";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { LoadingState } from "@/components/loading_dots";
import { Input } from "@/components/ui/input";
import QuizDisplay from "./quiz_display";
import { useRouter } from "next/navigation";
import { generateQuizMarkdown } from "@/lib/generate_quiz_md";

const QuizDialog = ({ isOpen, onClose, token, file_id }) => {
  const router = useRouter();
  const [localLoading, setLocalLoading] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [serverError, setServerError] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quizType: "objective",
      numQuestions: 5,
    },
  });
  const quizType = watch("quizType");

  const handleGenerateQuiz = async (data) => {
    setLocalLoading(true);
    console.log(data);
    console.log(file_id);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/gemini/quiz",
        {
          id: file_id,
          type_of_questions: data.quizType,
          num_of_questions: data.numQuestions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setQuizData(response.data);
      setLocalLoading(false);
    } catch (err) {
      console.log(err);
      setLocalLoading(false);
      if (err.response && err.response.data && err.response.data.Error) {
        console.log(err.response.data.Error);
        if (
          err.response.data.Error == "Gemini is currently unavailable for use."
        ) {
          setServerError(true);
        } else {
          setError("general", {
            type: "server",
            message: err.response.data.Error,
          });
        }
      } else {
        console.log("Something went wrong", err);
      }
    }
  };

  const handleErrors = () => {
    clearErrors("general"); // Clear backend validation error if it exists
    setLocalLoading(false); // Ensure submit button isn't disabled
  };

  const handleDownloadQuiz = async () => {
    const markdown = await generateQuizMarkdown(quizData, quizType);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quiz.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Card className="w-full mx-auto h-full mb-5">
        {localLoading ? (
          <div className="flex justify-center items-center h-96">
            <LoadingState />
          </div>
        ) : (
          <>
            <CardHeader>
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                open={serverError}
                onClose={() => {
                  setServerError(false);
                }}
                autoHideDuration={5000}
              >
                <Alert
                  severity="error"
                  onClose={() => {
                    setServerError(false);
                  }}
                >
                  Internal Server Error. Please try again later.
                </Alert>
              </Snackbar>
              <CardTitle>
                <div className="flex justify-between">
                  <div className="flex w-full gap-5 items-center">
                    <MoveLeft
                      className="cursor-pointer"
                      onClick={() => {
                        router.back();
                      }}
                      size={30}
                    />
                    <h1 className="text-md md:text-2xl font-bold">
                      {!quizData ? "Generate Your Quiz" : "Quiz"}
                    </h1>
                  </div>
                  {quizData && (
                    <div className="flex flex-row items-center gap-2">
                      <Button
                        className="hidden md:flex"
                        onClick={() => {
                          setShowAnswers((prev) => !prev);
                        }}
                        variant="outline"
                      >
                        {showAnswers ? (
                          <>
                            <EyeOff className="mr-2" size={20} />
                            Hide Answers
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2" size={20} />
                            Show Answers
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={handleDownloadQuiz}
                        className="hidden md:flex"
                      >
                        <Download className="mr-2" />
                        Download
                      </Button>
                      {showAnswers ? (
                        <>
                          <EyeOff
                            onClick={() => {
                              setShowAnswers((prev) => !prev);
                            }}
                            className="md:hidden mr-2"
                            size={20}
                          />
                        </>
                      ) : (
                        <>
                          <Eye
                            onClick={() => {
                              setShowAnswers((prev) => !prev);
                            }}
                            className="md:hidden mr-2"
                            size={20}
                          />
                        </>
                      )}
                      <Download onClick={handleDownloadQuiz} className="mr-2 md:hidden" />
                    </div>
                  )}
                </div>
              </CardTitle>
              {!quizData && (
                <CardDescription className="text-xs text-center md:text-left md:text-md">
                  Choose the type of quiz
                </CardDescription>
              )}
            </CardHeader>
            {!quizData ? (
              <div>
                <form onSubmit={handleSubmit(handleGenerateQuiz)}>
                  <CardContent>
                    <Controller
                      name="quizType"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <RadioGroup
                          value={value}
                          onValueChange={onChange}
                          className="grid gap-4 md:grid-cols-2"
                        >
                          <Label
                            htmlFor="objective"
                            className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary ${
                              value === "objective" ? "border-primary" : ""
                            }`}
                          >
                            <RadioGroupItem
                              value="objective"
                              id="objective"
                              className="sr-only"
                            />
                            <ListTodo className="mb-3 h-6 w-6" />
                            <div className="space-y-1 text-center">
                              <h3 className="font-semibold">Objective Quiz</h3>
                              <p className="text-sm text-muted-foreground">
                                Multiple choice questions
                              </p>
                            </div>
                          </Label>
                          <Label
                            htmlFor="subjective"
                            className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary ${
                              value === "subjective" ? "border-primary" : ""
                            }`}
                          >
                            <RadioGroupItem
                              value="subjective"
                              id="subjective"
                              className="sr-only"
                            />
                            <PenLine className="mb-3 h-6 w-6" />
                            <div className="space-y-1 text-center">
                              <h3 className="font-semibold">Subjective Quiz</h3>
                              <p className="text-sm text-muted-foreground">
                                Open-ended questions
                              </p>
                            </div>
                          </Label>
                        </RadioGroup>
                      )}
                    ></Controller>
                    <Controller
                      name="numQuestions"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <div className="my-5">
                          <Label htmlFor="numQuestions">
                            Number of Questions
                          </Label>
                          <Input
                            id="numQuestions"
                            type="number"
                            placeholder="Enter number of questions (1-20)"
                            value={value}
                            onChange={onChange}
                            min="1"
                            max="20"
                          />
                        </div>
                      )}
                    ></Controller>
                    {errors.general && (
                      <p className="text-sm text-red-500">
                        {errors.general.message}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button
                      type="submit"
                      onClick={handleErrors}
                      className="w-full max-w-xs"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Generate Quiz
                    </Button>
                  </CardFooter>
                </form>
              </div>
            ) : (
              <>
                <QuizDisplay
                  quizData={quizData}
                  showAnswers={showAnswers}
                  quizType={quizType}
                />
              </>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default QuizDialog;
