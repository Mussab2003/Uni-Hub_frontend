"use client";
import React, {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
import { ModalForm } from "@/views/modal/auth/auth_form";
import { useForm } from "react-hook-form";

const drawerWidth = 240;
const navItems = ["Pending Assignments", "Course Resources", "Map", "Create A Quiz", "Create Notes"];

function DrawerAppBar(props) {
  const { window } = props;
  
  const {
    handleSubmit,
    control,

  } = useForm();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [state, setState] = useState({
    isOpen: false,
    formType: 'S',
    isSubmit: false,
  })

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const openSignInModal = () => {
    setState((prev) => ({...prev, isOpen: true}));
  }

  const onSubmit = (data) => {
    console.log(data);
  }

  const onClose = () => {
    setState((prev) => ({...prev, isOpen: false}))
  }

  const RenderModal = () => (
    <ModalForm 
      state={state} 
      title={'Sign In'} 
      handleSubmit={handleSubmit} 
      control={control}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  )

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "left", mt: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 1 }}>
      <Box display={'flex'} flexDirection={'column'}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={2}> 
          <Image
            src={"/Assets/logo.png"}
            width={50}
            height={50}
            alt="Uni-Hub Logo"
          />
          <Typography 
            sx={{ my: 2 }}
            variant="h4"
            fontFamily={"serif"}
            fontWeight={"bold"}
          >
            Uni-Hub
          </Typography>

        </Box>
        <Divider sx={{mx: 2, mt: 3}}/>
      </Box>
      {/* Navigation Items */}
      <List>
        {navItems.map((item) => (
          <React.Fragment key={item}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "left", ml: 3, my: 0.5 }}>
                <ListItemText primary={item} sx={{fontWeight: 'bold'}}/>
              </ListItemButton>
            </ListItem>
          </React.Fragment>
        ))}
        </List>

        {/* LOG IN and SIGN UP Buttons for Sidebar */}
        <Box
          sx={{
            mt: 4,
            mb: 2,
            mx: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Button
            sx={{
              border: "#007bff 2px solid",
              borderRadius: 5,
              backgroundColor: "#FFFFFF",
              color: "#007bff",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#007bff !important",
                color: "#FFFFFF !important",
              },
            }}
          >
            Log In
          </Button>
          <Button
            sx={{
              border: "#007bff 2px solid",
              borderRadius: 5,
              backgroundColor: "#007bff",
              color: "#FFFFFF",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#0056b3 !important",
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" color="white">
        <Toolbar>
          <Image
            src={"/Assets/logo.png"}
            width={50}
            height={50}
            alt="Uni-Hub Logo"
          />
          <Typography
            variant="h4"
            fontFamily={"serif"}
            fontWeight={"bold"}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Uni-Hub
          </Typography>
          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "none",  lg: "block" },
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item}
                color="black"
                sx={{ 
                  fontWeight: "550", 
                  mr: 2, 
                  "&:hover" : {
                    backgroundColor: '#007bff',
                  } 
                }}
                
              >
                {item}
              </Button>
            ))}
          </Box>

          {/* LOG IN and SIGN UP Buttons for Desktop */}
          <Box sx={{ display: { xs: "none", md: 'none',  lg: "flex", gap: 10 } }}>
            <Button
              sx={{
                border: "#007bff 2px solid",
                borderRadius: 5,
                backgroundColor: "#FFFFFF",
                color: "#007bff",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#007bff",
                  color: "#FFFFFF",
                },
              }}
              onClick={openSignInModal}
            >
              Log In
            </Button>
            <Button
              sx={{
                border: "#007bff 2px solid",
                borderRadius: 5,
                backgroundColor: "#007bff",
                color: "#FFFFFF",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
            >
              Sign Up
            </Button>
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Sidebar Drawer */}
      <nav>
        <Drawer
          anchor="right"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <RenderModal></RenderModal>
    </Box>
  );
}

export default DrawerAppBar;
