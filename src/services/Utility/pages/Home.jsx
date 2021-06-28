import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Button, makeStyles } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import PageHeader from "../compmnents/PageHeader";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function Home() {
  const navigate = useNavigate();
  const handleNavigate = (herf) => {
    navigate(herf);
  };
  const classes = useStyles();
  return (
    <>
      <PageHeader
        title="首頁"
        subTitle="我是首頁"
        icon={<HomeIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNavigate("/content/stages")}
        >
          進入課程
        </Button>
      </Paper>
    </>
  );
}
