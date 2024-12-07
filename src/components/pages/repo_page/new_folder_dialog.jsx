"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Folder } from "lucide-react";
import { InputAdornment, TextField, CircularProgress } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "@/context/auth_context";

const ChildDialog = ({
  isOpen,
  onClose,
  formType,
  repo_id,
  parent_folder_id,
  afterSubmit,
}) => {
  const [localLoading, setLocalLoading] = useState(false);
  const { token } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLocalLoading(true);
      const repo_data = {
        name: data.name,
        repo_id: repo_id,
        parent_id: parent_folder_id,
      };

      if (formType == "new") {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/folder/create",
          repo_data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLocalLoading(false);
        afterSubmit();
        onClose();
      }
    } catch (err) {
      setLocalLoading(false);
      if (err.response && err.response.data && err.response.data.Error) {
        setError("general", {
          type: "server",
          message: err.response.data.Error,
        });
      } else {
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
      <DialogContent className="max-w-screen-sm dark:bg-[#2E236C]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="flex flex-col justify-center  gap-3 mb-6">
            <DialogTitle className="text-3xl dark:text-white font-bold">
              {formType == "new" ? "Create Folder" : "Update Folder"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            <Controller
              name="name"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div className="flex flex-col gap-2">
                  <p className="font-medium dark:text-white">Folder Name</p>
                  <TextField
                    value={value}
                    onChange={onChange}
                    fullWidth
                    placeholder="Enter Repository Name"
                    variant="outlined"
                    className="dark:bg-[#FFFFFF] dark:rounded-lg"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment>
                            <Folder
                              className="mr-2 dark:text-black"
                              size={20}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </div>
              )}
            ></Controller>
          </div>
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
                    className={"min-w-full w-full mx-auto "}
                    disabled={localLoading}
                    onClick={handleErrors}
                  >
                    {formType == "new" ? "Create Folder" : "Update Folder"}
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
