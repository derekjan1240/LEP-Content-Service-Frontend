import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, Typography, Box } from "@material-ui/core";

export default function Profile() {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/login");
    }
  }, [userState]);

  return (
    <Box p={6}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          {!userState.isChecking && (
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
                  年齡: {userState?.user?.age}
                </Typography>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
