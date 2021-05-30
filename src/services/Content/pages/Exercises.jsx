import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { Paper, Grid, Button, makeStyles } from "@material-ui/core";
import MenuBookIcon from "@material-ui/icons/MenuBook";

import PageHeader from "../../Utility/compmnents/PageHeader";
import OperatorMenu from "../../Utility/compmnents/OperatorMenu";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: 16,
  },
}));

export default function Missions() {
  // 登入檢查
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }
  }, [userState]);

  const fetchById = () => {
    Swal.fire({
      title: "輸入 ID",
      input: "text",
      inputLabel: "試卷 ID",
      inputPlaceholder: "f2f9ab00-5912-4372-8f9b-e984bb67ff45",
      inputValidator: (value) => {
        if (!value) {
          return "請確實輸入試卷 ID";
        }
      },
    }).then((result) => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_CONTENT_SERVICE}/exercises/${result.value}`,
      }).then((result) => {
        console.log(result.data);
      });
    });
  };

  const fetchAll = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_CONTENT_SERVICE}/exercises/`,
    }).then((result) => {
      console.log(result.data);
    });
  };

  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="習題系統"
        subTitle="subTitle"
        icon={<MenuBookIcon fontSize="large" />}
      />
      {(userState?.user?.role === "Admin" ||
        userState?.user?.role === "Teacher" ||
        userState?.user?.role === "Parent") && (
        <OperatorMenu>
          <Button
            variant="contained"
            color="primary"
            className={classes.menuButton}
            onClick={() => {
              navigate("/exercises/add");
            }}
          >
            新增習題
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.menuButton}
            onClick={fetchById}
          >
            搜尋試卷 (測試)
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.menuButton}
            onClick={fetchAll}
          >
            搜尋所有試卷 (測試)
          </Button>
        </OperatorMenu>
      )}
      {!userState.isChecking && (
        <Paper className={classes.pageContent}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              習題列表
            </Grid>
            <Grid item md={12}></Grid>
            <Grid item md={12}></Grid>
            <Grid item md={12}></Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
}
