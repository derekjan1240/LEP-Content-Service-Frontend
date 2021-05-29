import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
