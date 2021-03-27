import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Avatar,
  Link,
  Box,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// Components
import SigninForm from "../compmnents/SigninForm";
import SignupForm from "../compmnents/SignupForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#fff",
    padding: theme.spacing(6),
    borderRadius: 5,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        APP
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const userState = useSelector((state) => state.userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.user && !userState.isChecking) {
      navigate("/auth/profile");
    }
  }, [userState]);

  const [isSignin, setIsSignin] = useState(true);

  const classes = useStyles();
  return (
    <>
      {!userState.isChecking && (
        <Container component="main" maxWidth="sm">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            {isSignin ? (
              <div>
                <Typography component="h1" variant="h5" align="center">
                  登入
                </Typography>
                <SigninForm setIsSignin={setIsSignin} />
              </div>
            ) : (
              <div>
                <Typography component="h1" variant="h5" align="center">
                  註冊
                </Typography>
                <SignupForm setIsSignin={setIsSignin} />
              </div>
            )}
            <Box mt={8}>
              <Copyright />
            </Box>
          </div>
        </Container>
      )}
    </>
  );
}
