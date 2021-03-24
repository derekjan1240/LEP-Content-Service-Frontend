import React, { useState } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Typography,
  Drawer,
  Toolbar,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
} from "@material-ui/core";
// Icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FaceIcon from "@material-ui/icons/Face";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import FlagIcon from "@material-ui/icons/Flag";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BarChartIcon from "@material-ui/icons/BarChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CachedIcon from "@material-ui/icons/Cached";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// Actions
import { userLogout } from "../../../actions/UtilActions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  titleWrapper: {
    flexGrow: 1,
    textDecoration: "none",
  },
  title: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
    fontSize: 30,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const DefaultMenu = () => {
  const fakeData = [
    {
      title: "課程影片",
      href: "/content/stages",
      icon: <VideoLibraryIcon />,
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
  ];

  const navigate = useNavigate();
  const handleOnClick = (herf) => {
    navigate(herf);
  };

  return (
    <List>
      {fakeData.map((headersData, index) => (
        <ListItem
          button
          key={headersData.title}
          onClick={() => handleOnClick(headersData.href)}
        >
          <ListItemIcon>{headersData.icon}</ListItemIcon>
          <ListItemText primary={headersData.title} />
        </ListItem>
      ))}
    </List>
  );
};

const LoginedMenu = () => {
  const fakeData = [
    {
      title: "課程影片",
      href: "/content/stages",
      icon: <VideoLibraryIcon />,
    },
    {
      title: "習題系統",
      href: "/exercises",
      icon: <MenuBookIcon />,
    },
    {
      title: "任務系統",
      href: "/misssions",
      icon: <FlagIcon />,
    },
    {
      title: "班級系統",
      href: "/classroom",
      icon: <SupervisedUserCircleIcon />,
    },
    {
      title: "問卷系統",
      href: "/questionnaire",
      icon: <AssignmentIcon />,
    },
    {
      title: "資料視覺化系統",
      href: "/visualization",
      icon: <BarChartIcon />,
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
  ];

  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);
  const handleOnClick = (herf) => {
    navigate(herf);
  };

  return (
    <List>
      <ListItem button onClick={() => handleOnClick("/profile")}>
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary={userState?.user?.userName} />
      </ListItem>
      {fakeData.map((headersData, index) => (
        <ListItem
          button
          key={headersData.title}
          onClick={() => handleOnClick(headersData.href)}
        >
          <ListItemIcon>{headersData.icon}</ListItemIcon>
          <ListItemText primary={headersData.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default function UserMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const userState = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOnClick = (herf) => {
    navigate(herf);
  };

  const logout = () => {
    dispatch(userLogout());
    navigate("/auth/login");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ClickAwayListener onClickAway={handleDrawerClose}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <RouterLink
              className={classes.titleWrapper}
              to="/"
              variant="contained"
              color="primary"
            >
              <Typography variant="h6" component="h1" className={classes.title}>
                APP
              </Typography>
            </RouterLink>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ClickAwayListener>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          {
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          }
        </div>
        <Divider />
        {userState.user ? <LoginedMenu /> : <DefaultMenu />}
        <Divider />
        {userState.user ? (
          <List>
            <ListItem button>
              <ListItemIcon>
                <CachedIcon />
              </ListItemIcon>
              <ListItemText primary="身分切換" />
            </ListItem>
            <ListItem button onClick={() => logout()}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="登出" />
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem button onClick={() => handleOnClick("/auth/login")}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="登入" />
            </ListItem>
          </List>
        )}
      </Drawer>
    </div>
  );
}
