// ChildDialog.js
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogClose,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Eye, LockKeyhole, LogIn, Mail, User } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import {
  Checkbox,
  InputAdornment,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth_context";

const ChildDialog = ({ isOpen, onClose, formType, switchForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const { setAuthData } = useAuth();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleGoogleClick = async () => {
    try {
      setGoogleLoading(true);
      window.location.href =
        process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/google";
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLocalLoading(true);
      if (formType == "S") {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/signup",
          data
        );
        setAuthData(response.data.name, response.data.jwt, false);
      } else {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login",
          data
        );
        setAuthData(response.data.name, response.data.jwt, false, data.rememberMe);
      }
      onClose();
      router.push("/user-page");
    } catch (err) {
      setLocalLoading(false);
      if (err.response && err.response.data && err.response.data.Error) {
        setError("general", {
          type: "server",
          message: err.response.data.Error,
        });
      } else {
        console.log("Something went wrong", err);
      }
    }
  };

  const handleErrors = () => {
    clearErrors("general"); // Clear backend validation error if it exists
    setLocalLoading(false); // Ensure submit button isn't disabled
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {/* Dialog trigger can be left empty as we're controlling it via parent */}
      </DialogTrigger>
      <DialogContent className="max-w-96 dark:bg-[#2E236C]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="flex flex-col justify-center items-center gap-3 mb-6">
            <LogIn
              size={55}
              className="mx-auto shadow-lg p-3 rounded-xl text-black dark:bg-white"
            />
            <DialogTitle className="text-3xl dark:text-white">
              {formType == "S" ? "Sign Up" : "Log In"}
            </DialogTitle>
            {formType == "S" && (
              <DialogDescription className="dark:text-white">
                Create account to get started
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            {formType == "S" && (
              <>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      fullWidth
                      placeholder="Enter username"
                      variant="outlined"
                      className="dark:bg-[#FFFFFF] dark:rounded-lg"
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment>
                              <User
                                className="mr-2 dark:text-black"
                                size={20}
                              />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                ></Controller>
              </>
            )}
            <Controller
              name="email"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  fullWidth
                  type="email"
                  placeholder="Enter email"
                  variant="outlined"
                  color="grey"
                  className="dark:bg-[#FFFFFF] dark:rounded-lg dark:text-black"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment>
                          <Mail className="mr-2 dark:text-black" size={20} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            ></Controller>
            <Controller
              name="password"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  placeholder="Enter password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  color="grey"
                  className="dark:bg-[#FFFFFF] dark:rounded-lg dark:text-black"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment>
                          <LockKeyhole
                            className="mr-2 dark:text-black"
                            size={18}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment>
                          <Eye
                            size={20}
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                            className="ml-2 dark:text-black"
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            ></Controller>
            {formType != "S" && (
              <>
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <div className="ml-2 w-full flex items-center">
                      <p className="dark:text-white">Remember Me</p>
                      <Checkbox color="black" checked={value ? value : false} onChange={onChange} className="dark:text-white" />
                    </div>
                  )}
                ></Controller>
              </>
            )}
          </div>
          <p className="flex justify-center dark:text-white my-3">
            {formType != "S"
              ? "Don't have an account?"
              : "Already have an account?"}
            <a
              className="ml-1 font-bold dark:text-white text-[#6699CC]"
              onClick={switchForm}
            >
              {formType == "S" ? "Log In" : "Sign Up"}
            </a>
          </p>
          <DialogFooter>
            <div className="w-full flex flex-col mt-2 gap-1">
              {errors.general && (
                <p className="text-red-500 text-center underline">
                  {errors.general.message}
                </p>
              )}
              <div className="flex justify-center">
                {localLoading ? (
                  <CircularProgress size={25} color="black" />
                ) : (
                  <Button
                    type="submit"
                    className={"min-w-full w-full mx-auto"}
                    disabled={localLoading}
                    onClick={handleErrors}
                  >
                    {formType == "S" ? "Sign Up" : "Log In"}
                  </Button>
                )}
              </div>
              <div className="relative flex py-3 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400 dark:text-white">
                  {formType == "S"
                    ? "Sign Up with Google"
                    : "Sign In with Google"}
                </span>
                <div class="flex-grow border-t border-gray-400"></div>
              </div>
              <div className="flex justify-center">
                <div className="border-2 border-grey px-6 py-2 rounded-lg">
                  {googleLoading ? (
                    <CircularProgress size={25} color="black" />
                  ) : (
                    <FaGoogle
                      onClick={handleGoogleClick}
                      size={30}
                      className="dark:text-white"
                    />
                  )}
                </div>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChildDialog;
