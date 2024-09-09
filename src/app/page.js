import { Box, Button, Container, Icon, Typography } from "@mui/material";
import Image from "next/image";

const heading = "Muhammad \n Mussab"

export default function Home() {
  return (
    <Box mt={14} mx={2}>
        <Box sx={{pl: 7, pr: 25, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#d0f4d4', border: '#d0f4d4 1px solid', borderBottomLeftRadius: '17px', borderBottomRightRadius: '17px' }}>
            <Box display={'flex'} flexDirection={'column'} gap={2} m={2}>
                <Typography variant="h2" fontFamily={"serif"} sx={{lineBreak: "anywhere", whiteSpace: 'pre-line'}}>
                  {`View and upload\nrepositories, create\nquizzes and notes!`}
                </Typography>
                <Typography>
                  Secure storage for your files, protected from unauthorized access.
                </Typography>
            </Box>
            <Box m={2}>
              <Image src={'/Assets/document_logo.png'} width={300} height={300} />

              
            </Box>
        </Box>
    </Box>    
  );
}
