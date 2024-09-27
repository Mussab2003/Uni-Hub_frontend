// import Modal from "../modal/modal";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Dialog,
  Typography,
  Input,
} from "@material-tailwind/react";
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { FaGoogle, FaLock, FaEye, FaUser } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { MdEmail } from "react-icons/md";

export const ModalForm = ({ open, handleOpen, title, state, switchForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Card className="dark:bg-[#1A1A1A] mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-3 items-center">
          <LuLogIn            
            size={55}
            className="mx-auto shadow-lg p-3 rounded-xl text-black dark:text-white"
          />
          <Typography variant="h4" color="blue-gray" className="dark:text-white">
            {title}
          </Typography>
          {state.formType == "S" && (
            <>
              <Typography
                className="font-normal dark:text-white"
                variant="paragraph"
                color="gray"
              >
                Create account to get started
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter username"
                variant="outlined"
                color="grey"
                className="dark:bg-[#FFFFFF] dark:rounded-lg dark:text-black"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment>
                        <FaUser className="mr-2 dark:text-black" size={20} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </>
          )}
          <TextField
            fullWidth
            placeholder="Enter email"
            variant="outlined"
            color="grey"
            className="dark:bg-[#FFFFFF] dark:rounded-lg dark:text-black"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment>
                    <MdEmail className="mr-2 dark:text-black" size={20} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            fullWidth
            placeholder="Enter password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            color="grey"
            className="dark:bg-[#FFFFFF] dark:rounded-lg dark:text-black"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment>
                    <FaLock className="mr-2 dark:text-black" size={18} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment>
                    <FaEye
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
          {state.formType != "S" && (
          <>
          <div className="-ml-2.5 -mt-1 w-full">
            <Checkbox label={<Typography variant="small" className="dark:text-white">Remember Me</Typography>} className="dark:text-white"/>
          </div>
          </>
          )}
            <Typography variant="small" className="flex justify-center dark:text-white">
              {state.formType != 'S' ? "Don't have an account?" : "Already have an account?"}
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold dark:text-white"
                onClick={switchForm}
              >
                {state.formType == 'S' ? "Log In" : "Sign Up"}
              </Typography>
            </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" onClick={handleOpen} fullWidth>
            Sign In
          </Button>

          <div class="relative flex py-5 items-center">
            <div class="flex-grow border-t border-gray-400"></div>
            <span class="flex-shrink mx-4 text-gray-400 dark:text-white">
              {state.formType == "S" ? "Sign Up with Google" : "Sign In with Google"}
            </span>
            <div class="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="flex justify-center">
            <div className="border-2 border-grey px-6 py-2 rounded-lg">
              <FaGoogle size={30} className="dark:text-white"/>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Dialog>
  );
};
