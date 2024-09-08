// 'use client'
// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Image from "next/image";

// const drawerWidth = 240;
// const navItems = ["Pending Assignments", "Course Resources", "Map"];
// function DrawerAppBar(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen((prevState) => !prevState);
//   };

//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
//       {/* <Typography variant="h6" sx={{ my: 2 }}>
//         Uni-Hub
//       </Typography> */}
//       {/* <Divider /> */}
//       <List>
//         {navItems.map((item) => (<>
//           <Divider key={item}/>
//           <ListItem key={item} disablePadding>
//             <ListItemButton sx={{ textAlign: "center" }}>
//               <ListItemText primary={item} />
//             </ListItemButton>
//           </ListItem>
//           <Divider/>
//         </>
//         ))}
//         <ListItem>
//           <Button>Hello</Button>
//         </ListItem>
//       </List>
//     </Box>
//   );

//   const container =
//     window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar component="nav" color="white">
//         <Toolbar>

//         <Image src={"/Assets/logo.png"} width={50} height={50} />
//           <Typography
//             variant="h4"
//             fontFamily={"serif"}
//             fontWeight={"bold"}
//             component="div"
//             sx={{ flexGrow: 1}}
//           >
//             Uni-Hub
//           </Typography>
//           <Box sx={{ display: { xs: "none", sm: "block" }, justifyContent: 'center', flexGrow: 1}}>
//             {navItems.map((item) => (
//               <Button key={item} color="black" sx={{fontWeight: '600', mr: 2}}>{item}</Button>
//             ))}
//           </Box>
//           <Box sx={{ display: { xs: "none", sm: "flex", gap: 10 } }}>
//             <Button  sx={{border: '#007bff 2px solid', borderRadius: 5, backgroundColor: '#FFFFFF', color: '#007bff'}}>Log In</Button>
//             <Button  sx={{border: '#007bff 2px solid', borderRadius: 5, backgroundColor: '#007bff', color: '#FFFFFF'}}>Sign Up</Button>
//           </Box>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <nav>
//         <Drawer
//           anchor="right"
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </nav>

//     </Box>
//   );
// }

// export default DrawerAppBar;

"use client";
import * as React from "react";
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

const drawerWidth = 240;
const navItems = ["Pending Assignments", "Course Resources", "Map"];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "left", mt: 2 }}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} mb={2}> 
        <Image
          src={"/Assets/logo.png"}
          width={50}
          height={50}
          alt="Uni-Hub Logo"
        />
        <Typography variant="h6" sx={{ my: 2 }}>
          Uni-Hub
        </Typography>

      </Box>
      <Divider sx={{mx: 1, mb: 2}}/>
      {/* Navigation Items */}
      <List>
        {navItems.map((item) => (
          <React.Fragment key={item}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "left", ml: 3 }}>
                <ListItemText primary={item} sx={{fontWeight: 'bold'}}/>
              </ListItemButton>
            </ListItem>
          </React.Fragment>
        ))}

        {/* LOG IN and SIGN UP Buttons for Sidebar */}
        <Box
          sx={{
            mt: 4,
            mb: 2,
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
                backgroundColor: "#007bff",
                color: "#FFFFFF",
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
                backgroundColor: "#0056b3",
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </List>
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
              display: { xs: "none", sm: "block" },
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item}
                color="black"
                sx={{ fontWeight: "600", mr: 2 }}
              >
                {item}
              </Button>
            ))}
          </Box>

          {/* LOG IN and SIGN UP Buttons for Desktop */}
          <Box sx={{ display: { xs: "none", sm: "flex", gap: 10 } }}>
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
            sx={{ mr: 2, display: { sm: "none" } }}
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
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default DrawerAppBar;
