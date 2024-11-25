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
import {
  Bold,
  Eye,
  GitFork,
  LockKeyhole,
  LogIn,
  Mail,
  User,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import {
  Checkbox,
  InputAdornment,
  TextField,
  CircularProgress,
  Typography,
  TextareaAutosize,
  Autocomplete,
} from "@mui/material";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth_context";
import { styled } from "@mui/material/styles";
import { Switch } from "@mui/material";
import { Lock } from "lucide-react";
import { Unlock } from "lucide-react";
import { useRepo } from "@/context/repo_context";
import { addRepoToAlgolia } from "@/lib/search_import_data";

const ChildDialog = ({ isOpen, onClose, formType }) => {
  const [localLoading, setLocalLoading] = useState(false);
  const { token } = useAuth();
  const router = useRouter();
  const { setRepoData } = useRepo();
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
      description: "",
      visibility: true,
      tags: [],
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLocalLoading(true);
      const repo_data = {
        name: data.name,
        description: data.description,
        visibility: data.visibility ? "public" : "private",
        tags: data.tags,
      };
      if (formType == "new") {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/repo/create",
          repo_data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRepoData(
          repo_data.name,
          repo_data.description,
          repo_data.visibility
        );
        if (repo_data.visibility == "public") {
          console.log("Inside algolia if statement");
          await addRepoToAlgolia(response.data);
        }
        onClose();
        router.push("/user-page/" + response.data.id);
        setLocalLoading(false);
      }
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

  const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
    width: "100%",
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.grey[400]}`,
    fontFamily: theme.typography.fontFamily,
    "&:focus": {
      borderColor: theme.palette.primary.main,
      outline: "none",
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
    },
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {/* Dialog trigger can be left empty as we're controlling it via parent */}
      </DialogTrigger>
      <DialogContent className="max-w-screen-sm dark:bg-[#2E236C]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="flex flex-col justify-center  gap-3 mb-6">
            <DialogTitle className="text-3xl dark:text-white font-bold">
              {formType == "new" ? "Create Repository" : "Update Repository"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            <Controller
              name="name"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div className="flex flex-col gap-2">
                  <p className="font-medium dark:text-white">Repository Name</p>
                  <TextField
                    value={value}
                    onChange={onChange}
                    fullWidth
                    placeholder="Enter Name"
                    variant="outlined"
                    className="dark:bg-[#FFFFFF] dark:rounded-lg"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment>
                            <GitFork
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
            <Controller
              name="description"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div className="flex flex-col gap-2">
                  <p className="font-medium dark:text-white">
                    Repository Description
                  </p>
                  <StyledTextarea
                    minRows={5}
                    value={value}
                    placeholder="Enter Description"
                    onChange={onChange}
                  />
                </div>
              )}
            ></Controller>
            <Controller
              name="tags"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div className="flex flex-col gap-2">
                  <p className="font-medium dark:text-white">
                    Tags (optional)
                  </p>
                  <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    multiple
                    freeSolo
                    onKeyDown={(event) => {
                      // Prevent form submission on Enter key press
                      if (event.key === "Enter") {
                        event.preventDefault();
                      }
                    }}
                    options={[]}
                    getOptionLabel={(option) => option}
                    disableCloseOnSelect
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Enter Tags"
                      />
                    )}
                  />
                </div>
              )}
            ></Controller>
            <div className="flex justify-between">
              {Boolean(watch("visibility")) ? (
                <div className="flex gap-2 items-center">
                  <Unlock className="dark:text-yellow-400" />
                  <p className="font-medium dark:text-white">
                    Public Repository
                  </p>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <Lock className="dark:text-yellow-400 font-bold" />
                  <p className="font-medium dark:text-white">
                    Private Repository
                  </p>
                </div>
              )}
              <Controller
                name="visibility"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Switch checked={value ? value : false} onChange={onChange} />
                )}
              ></Controller>
            </div>
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
                    {formType == "new" ? "Create" : "Update"}
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
