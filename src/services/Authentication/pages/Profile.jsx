import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Paper, Box, Typography, makeStyles } from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import PageHeader from "../../Utility/compmnents/PageHeader";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function Profile() {
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
        title="個人檔案"
        subTitle="subTitle"
        icon={<AccountBoxIcon fontSize="large" />}
      />
      {!userState.isChecking && (
        <Paper className={classes.pageContent}>
          <Box p={5}>
            <Typography variant="h3" align="left">
              <b>個人檔案</b>
            </Typography>
            <Box p={3}>
              <Typography variant="h5" align="left">
                姓名: {userState?.user?.userName}
              </Typography>
              <Typography variant="h5" align="left">
                E-Mail: {userState?.user?.email}
              </Typography>
              <Typography variant="h5" align="left">
                當前身分: {userState?.user?.role}
              </Typography>
              <Typography variant="h5" align="left">
                年齡: {userState?.user?.age}
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </>
  );
}
