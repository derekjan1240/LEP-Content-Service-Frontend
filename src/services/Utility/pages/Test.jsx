import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Paper, Button, makeStyles } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import PageHeader from "../compmnents/PageHeader";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

export default function Test() {
  const userState = useSelector((state) => state.userState);
  const handleRedisTest = () => {
    if (!userState.user) {
      return;
    }
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_ASSISTANT_SERVICE}/mission/student`,
      headers: {
        token: `${localStorage.jwt}`,
        user: `${userState.user._id}`,
      },
    })
      .then((result) => {
        console.log("Result(Redis):", result.data);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "查詢任務失敗!",
        });
      });
  };
  const handleNonRedisTest = () => {
    if (!userState.user) {
      return;
    }
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_ASSISTANT_SERVICE}/test/missions`,
      headers: {
        token: `${localStorage.jwt}`,
        user: `${userState.user._id}`,
      },
    })
      .then((result) => {
        console.log("Result(NonRedis):", result.data);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "查詢任務失敗!",
        });
      });
  };
  const classes = useStyles();
  return (
    <>
      <PageHeader
        title="測試用"
        subTitle="subTitle"
        icon={<HomeIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNonRedisTest}
          className={classes.button}
        >
          測試 API (NonRedis)
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRedisTest}
          className={classes.button}
        >
          測試 API (Redis)
        </Button>
      </Paper>
    </>
  );
}
