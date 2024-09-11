"use client";
import { Box, Button, Container, Icon, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  // const darkThemeMq = () =>
  //   window.matchMedia("(prefers-color-scheme: dark)").matches;
  // const [isDark, setIsDark] = useState(darkThemeMq());
  // console.log(isDark);
  return (
    <Box mt={14} mx={2}>
    {/* //   <Box
    //     sx={{
    //       pl: 7,
    //       pr: 25,
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "space-between",
    //       backgroundColor: "#2C2C2C",
    //       border: "#333333 1px solid",
    //       borderBottomLeftRadius: "17px",
    //       borderBottomRightRadius: "17px",
    //     }}
    //   >
    //     <Box display={"flex"} flexDirection={"column"} gap={2} m={2}>
    //       <Typography
    //         variant="h2"
    //         fontFamily={"serif"}
    //         sx={{ lineBreak: "anywhere", whiteSpace: "pre-line" }}
    //       >
    //         {`View and upload\nrepositories, create\nquizzes and notes!`}
    //       </Typography>
    //       <Typography>
    //         Secure storage for your files, protected from unauthorized access.
    //       </Typography>
    //     </Box>
    //     <Box m={2}>
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         width="24"
    //         height="24"
    //         viewBox="0 0 24 24"
    //         fill="none"
    //         stroke="currentColor"
    //         stroke-width="2"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //         className="icon icon-tabler icons-tabler-outline icon-tabler-file size-64"
    //       >
    //         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    //         <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    //         <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
    //       </svg>
    //     </Box>
    //   </Box> */}
    </Box>
  );
}
