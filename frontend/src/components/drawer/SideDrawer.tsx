import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SegmentIcon from "@mui/icons-material/Segment";
import { Avatar, IconButton, Stack, useTheme } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import CustomLink from "./custom-link/custom-link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { lime, lightGreen, green } from "@mui/material/colors";
const drawerWidth = 240;
const drawerWidthClose = 60;
interface ICollection {
  id: string | number;
  collectionName: string;
}
export default function SideDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{
            width: `calc(100% - ${open ? drawerWidth : drawerWidthClose}px)`,
            overflowX: "hidden",
            ml: `${drawerWidth}px`,
            mb: theme.mixins.toolbar,
            transition: theme.transitions.create("width", {
              easing: open ? theme.transitions.easing.sharp : theme.transitions.easing.sharp,
              duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ p: 1 }}>
            {!open ? (
              <Typography variant="h6" noWrap component="div">
                NatureAyur
              </Typography>
            ) : (
              <div></div>
            )}
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/15579683/pexels-photo-15579683.jpeg" />
              <Typography>Example User</Typography>
              <IconButton aria-label="delete">
                <KeyboardArrowDownIcon />
              </IconButton>
            </Stack>
          </Stack>
        </AppBar>
        <Drawer
          sx={{
            width: open ? drawerWidth : drawerWidthClose,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: open ? drawerWidth : drawerWidthClose,
              border: 0,
              boxSizing: "border-box",
              transition: theme.transitions.create("width", {
                easing: open ? theme.transitions.easing.sharp : theme.transitions.easing.sharp,
                duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
              }),
            },
          }}
          open={open}
          variant="permanent"
          anchor="left"
          elevation={0}
          hideBackdrop
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              padding: theme.spacing(0, 1),
              ...theme.mixins.toolbar,
            }}
          >
            {open ? (
              <Typography align="left" variant="h6" noWrap component="div">
                Nature Ayur
              </Typography>
            ) : null}
            <IconButton onClick={handleDrawerClose}>
              <SegmentIcon />
            </IconButton>
          </Box>
          <Box>
            <List sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {[1, 2, 3, 4, 5].map((item, index) => {
                return <CustomLink drawerStatus={open} label="Test Nav" handleClick={() => alert(item)} key={item} icon={<DashboardIcon />} />;
              })}
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            width: `calc(100% - ${open ? drawerWidth : drawerWidthClose}px)`,
            mt: "60px",
            minHeight: "calc(100vh - 60px)",
            backgroundColor: green["50"],
            overflowY: "hidden",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 0,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
