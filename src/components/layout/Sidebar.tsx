import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const DRAWER_WIDTH_EXPANDED = 220;
const DRAWER_WIDTH_COLLAPSED = 64;

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  end?: boolean;
}

const navItems: NavItem[] = [
  { label: "Members", path: "/", icon: <PeopleIcon />, end: true },
  { label: "Add Member", path: "/add-member", icon: <PersonAddIcon /> },
];

export const Sidebar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const drawerWidth = isSmallScreen
    ? DRAWER_WIDTH_COLLAPSED
    : DRAWER_WIDTH_EXPANDED;

  const isActiveRoute = (path: string, end?: boolean) => {
    if (end) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: "width 0.2s ease-in-out",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid",
          borderColor: "divider",
          transition: "width 0.2s ease-in-out",
          overflowX: "hidden",
        },
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: isSmallScreen ? "center" : "flex-start",
          minHeight: 64,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "primary.main",
            whiteSpace: "nowrap",
          }}
        >
          {isSmallScreen ? "Admin" : "Admin Dashboard"}
        </Typography>
      </Box>

      {/* Navigation Items */}
      <List sx={{ px: isSmallScreen ? 0.5 : 1 }}>
        {navItems.map(({ label, path, icon, end }) => {
          const isActive = isActiveRoute(path, end);

          const listItemButton = (
            <ListItemButton
              component={NavLink}
              to={path}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                justifyContent: isSmallScreen ? "center" : "flex-start",
                px: isSmallScreen ? 1.5 : 2,
                bgcolor: isActive ? "primary.light" : "transparent",
                color: isActive ? "primary.contrastText" : "text.primary",
                "&:hover": {
                  bgcolor: isActive ? "primary.light" : "action.hover",
                },
                "& .MuiListItemIcon-root": {
                  color: isActive ? "primary.contrastText" : "text.secondary",
                  minWidth: isSmallScreen ? "auto" : 40,
                },
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              {!isSmallScreen && <ListItemText primary={label} />}
            </ListItemButton>
          );

          return (
            <ListItem key={path} disablePadding>
              {isSmallScreen ? (
                <Tooltip title={label} placement="right">
                  {listItemButton}
                </Tooltip>
              ) : (
                listItemButton
              )}
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export { DRAWER_WIDTH_EXPANDED, DRAWER_WIDTH_COLLAPSED };
