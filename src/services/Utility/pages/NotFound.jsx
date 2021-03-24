import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Button, makeStyles } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import PageHeader from "../compmnents/PageHeader";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function NotFound() {
  const navigate = useNavigate();
  const handleNavigate = (herf) => {
    navigate(herf);
  };
  const classes = useStyles();
  return (
    <>
      <PageHeader
        title="頁面不存在!"
        subTitle="subTitle"
        icon={<ErrorIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNavigate("/")}
        >
          回首頁
        </Button>
      </Paper>
    </>
  );
}
