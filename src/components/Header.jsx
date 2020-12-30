import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import React from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";

const headersData = [
  {
    label: "習題系統",
    href: "/exercises",
  },
  {
    label: "任務系統",
    href: "/misssions",
  },
  {
    label: "班級系統",
    href: "/classroom",
  },
  {
    label: "帳號系統",
    href: "/account",
  },
  {
    label: "問卷系統",
    href: "/questionnaire",
  },
  {
    label: "資料視覺化系統",
    href: "/visualization",
  },
  {
    label: "Dashboard ",
    href: "/dashboard",
  },
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
    padding: "10px 60px",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
    fontSize: 30,
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    fontSize: 18,
    marginLeft: 38,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function Header() {
  const { header, logo, menuButton, toolbar } = useStyles();

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {femmecubatorLogo}
        <div>
          <GetMenuButtons />
        </div>
      </Toolbar>
    );
  };

  const femmecubatorLogo = (
    <RouterLink to="/">
      <Typography variant="h6" component="h1" className={logo}>
        HOME
      </Typography>
    </RouterLink>
  );

  const GetMenuButtons = () => {
    const history = useHistory();
    const location = useLocation();
    console.log(location);
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
          // onClick={() => history.push(href)}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar position="static" className={header}>
        {displayDesktop()}
      </AppBar>
    </header>
  );
}
