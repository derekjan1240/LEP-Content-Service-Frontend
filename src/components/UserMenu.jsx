import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MailIcon from "@material-ui/icons/Mail";
import FaceIcon from "@material-ui/icons/Face";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CachedIcon from "@material-ui/icons/Cached";
// Actions
import { userLogout } from "../actions/UtilActions";

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

export default function UserMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const userState = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOnClick = (herf) => {
    window.location.href = herf;
  };

  const fakeData = [
    {
      title: "課程影片",
      href: "/content/stages",
    },
    {
      title: "習題系統",
      href: "/exercises",
    },
    {
      title: "任務系統",
      href: "/misssions",
    },
    {
      title: "班級系統",
      href: "/classroom",
    },
    {
      title: "問卷系統",
      href: "/questionnaire",
    },
    {
      title: "資料視覺化系統",
      href: "/visualization",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
  ];

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
            <Link
              className={classes.titleWrapper}
              to="/"
              variant="contained"
              color="primary"
            >
              <Typography variant="h6" component="h1" className={classes.title}>
                APP
              </Typography>
            </Link>

            {userState.isLogin ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                className={clsx(open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Button component={Link} to="/login" color="inherit">
                登入
              </Button>
            )}
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
        <List>
          <ListItem>
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary={userState?.user?.username} />
          </ListItem>
          {fakeData.map((headersData, index) => (
            <ListItem
              button
              key={headersData.title}
              onClick={() => handleOnClick(headersData.href)}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={headersData.title} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <CachedIcon />
            </ListItemIcon>
            <ListItemText primary="身分切換" />
          </ListItem>
          <ListItem button onClick={() => dispatch(userLogout())}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="登出" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
