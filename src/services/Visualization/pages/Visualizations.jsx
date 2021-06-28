import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Paper, makeStyles } from "@material-ui/core";
import BarChartIcon from "@material-ui/icons/BarChart";

import PageHeader from "../../Utility/compmnents/PageHeader";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function Visualizations() {
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
        title="資料視覺化系統"
        subTitle="圖像化系統數據"
        icon={<BarChartIcon fontSize="large" />}
      />
      {!userState.isChecking && <Paper className={classes.pageContent}></Paper>}
    </>
  );
}
