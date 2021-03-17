import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, Typography, Box } from "@material-ui/core";

export default function Profile() {
  const userState = useSelector((state) => state.userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState?.user) {
      navigate("/login");
    }
  }, [userState]);

  return (
    <Box p={6}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <Box p={5}>
            <Typography variant="h3" align="start">
              <b>個人檔案</b>
            </Typography>
            <Box p={3}>
              <Typography variant="h5" align="start">
                姓名: {userState.user.userName}
              </Typography>
              <Typography variant="h5" align="start">
                E-Mail: {userState.user.email}
              </Typography>
              <Typography variant="h5" align="start">
                年齡: {userState.user.age}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
