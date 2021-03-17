import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleNavigate = (herf) => {
    navigate(herf);
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} lg={8}>
        <Typography variant="h3" gutterBottom>
          我是首頁
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNavigate("/content/stages")}
        >
          進入課程
        </Button>
      </Grid>
    </Grid>
  );
}
