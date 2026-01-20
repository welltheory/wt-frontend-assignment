import { Outlet } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import {
  Sidebar,
  DRAWER_WIDTH_COLLAPSED,
  DRAWER_WIDTH_EXPANDED,
} from "./Sidebar";

export const Layout = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const drawerWidth = isSmallScreen
    ? DRAWER_WIDTH_COLLAPSED
    : DRAWER_WIDTH_EXPANDED;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "grey.50",
          minHeight: "100vh",
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
