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

const ChildDialog = ({ isOpen, onClose, formType, userInfo, token }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAuthData } = useAuth();
  console.log(userInfo)
  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userInfo.name,
      existingPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    if (formType == "username") {
      setLoading(true);
      if (data.name == userInfo.name) {
        onClose();
        setLoading(false);
        return;
      }
      try {
        const response = await axios.patch(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/user/self",
          {
            name: data.name,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAuthData(response.data.name, token, false);
        setLoading(false);
        onClose();
      } catch (err) {
        setLoading(false);
        if (err.response && err.response.data && err.response.data.Error) {
          setError("general", {
            type: "server",
            message: err.response.data.Error,
          });
        }
      }
    } else if (formType == "password") {
      setLoading(true);
      try {
        const response = await axios.patch(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/user/self",
          {
            existing_password: data.existingPassword,
            password: data.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Password Changes")
        setLoading(false);
        onClose();
        reset();
      } catch (err) {
        setLoading(false);
        console.log("In the password catch block")
        if (err.response && err.response.data && err.response.data.Error) {
          setError("general", {
            type: "server",
            message: err.response.data.Error,
          });
        }
      }
    }
  };

  const handleErrors = () => {
    clearErrors("general"); // Clear backend validation error if it exists
    setLoading(false); // Ensure submit button isn't disabled
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {/* Dialog trigger can be left empty as we're controlling it via parent */}
      </DialogTrigger>
      <DialogContent className="max-w-96 dark:bg-[#2E236C]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="flex flex-col justify-center items-center gap-3 mb-6">
            <DialogTitle className="text-xl dark:text-white">
              {formType == "username" ? "Edit Username" : "Change Password"}
            </DialogTitle>
          </DialogHeader>
          {formType == "username" ? (
            <div className="flex justify-center">
              <Controller
                name="name"
                rules={{required: "username cannot be null"}}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    variant="outlined"
                    placeholder="new username"
                    fullWidth
                    color="grey"
                    className="dark:bg-[#FFFFFF] dark:rounded-lg"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment>
                            <User className="mr-2 dark:text-black" size={20} />
                          </InputAdornment>
                        ),
                      },
                    }}
                    error={errors.name}
                    helperText={errors.name && errors.name.message}
                  />
                )}
              ></Controller>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Controller
                name="existingPassword"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    label="existing Password"
                    placeholder="enter existing password"
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
              <Controller
                name="newPassword"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    label="New Password"
                    fullWidth
                    value={value}
                    onChange={onChange}
                    placeholder="Enter new password"
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
            </div>
          )}
          <DialogFooter className="mt-6">
            <div className="flex flex-col w-full gap-3">
              {errors.general && (
                <div className="flex justify-start">
                  <p className="text-red-500 underline">
                    {errors.general.message}
                  </p>

                </div>
              )}
              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                {loading ? (
                  <CircularProgress color="black" />
                ) : (
                  <Button type="submit" onClick={handleErrors}>
                    Save
                  </Button>
                )}
              </div>

            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChildDialog;
