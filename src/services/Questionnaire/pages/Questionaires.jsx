import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { Paper, Grid, Button, makeStyles } from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";

import PageHeader from "../../Utility/compmnents/PageHeader";
import { KolbQuestionnaire } from "../compmnents/fakeData/KolbQuestionnaire";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: 16,
  },
}));

export default function Questionaires() {
  // 登入檢查
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }
  }, [userState]);

  const [display, setDisplay] = useState("2");

  const addTestQuestionaire = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_QUESTIONNAIRE_SERVICE}/questionnaires`,
      headers: {
        token: `${localStorage.jwt}`,
        user: `${userState.user._id}`,
      },
      data: KolbQuestionnaire,
      withCredentials: true,
    })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "新增問卷失敗!",
        });
      });
  };

  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="問卷系統"
        subTitle="subTitle"
        icon={<AssignmentIcon fontSize="large" />}
      />
      {!userState.isChecking && (
        <Paper className={classes.pageContent}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.menuButton}
                onClick={() => {
                  setDisplay("1");
                }}
              >
                系統問卷
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.menuButton}
                onClick={() => {
                  setDisplay("2");
                }}
              >
                已指派的問卷
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.menuButton}
                // onClick={() => {
                //   addTestQuestionaire();
                // }}
                disabled
              >
                新增測試用問卷
              </Button>
            </Grid>
          </Grid>
          {display === "1" && (
            <Grid item md={12}>
              系統問卷
            </Grid>
          )}
          {display === "2" && (
            <Grid item md={12}>
              已指派的問卷
            </Grid>
          )}
        </Paper>
      )}
    </>
  );
}
