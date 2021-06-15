import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Paper,
  Grid,
  Box,
  Chip,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import MenuBookIcon from "@material-ui/icons/MenuBook";

import PageHeader from "../../Utility/compmnents/PageHeader";
import OperatorMenu from "../../Utility/compmnents/OperatorMenu";

import green from "@material-ui/core/colors/lightGreen";
import teal from "@material-ui/core/colors/teal";

const successTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[700],
      contrastText: "#fff",
    },
  },
});

const infoTheme = createMuiTheme({
  palette: {
    primary: {
      main: teal[600],
      contrastText: "#fff",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: 16,
  },
  exerciseCard: {
    borderBottom: "1px dashed #636e72",
  },
  chip: {
    margin: theme.spacing(1),
    letterSpacing: 1.5,
    fontSize: 14,
  },
}));

export default function Missions() {
  // 登入檢查
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }

    if (userState.user) {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_CONTENT_SERVICE}/exercises/`,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
        params: {
          owner: userState.user._id,
        },
      }).then((result) => {
        console.log(result.data);
        setExercises(result.data);
      });
    }
  }, [userState]);

  const exerciseRelates = (questions) => {
    let temp = {
      units: [],
      tags: [],
    };
    questions.forEach((question) => {
      temp.units.push(question.unit);
      if (question.tag) {
        temp.tags.push(question.tag);
      }
    });
    const unitList = [...new Set(temp.units.map(JSON.stringify))].map(
      JSON.parse
    );
    const tagList = [...new Set(temp.tags.map(JSON.stringify))].map(JSON.parse);
    return (
      <>
        <Box display="flex" alignItems="center">
          <Typography variant="h6">相關單元:</Typography>
          {unitList.map((unit) => (
            <ThemeProvider theme={successTheme} key={`${unit.id}`}>
              <Chip
                label={unit.title}
                color="primary"
                className={classes.chip}
              />
            </ThemeProvider>
          ))}
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="h6">相關標籤:</Typography>
          {tagList.map((tag) => (
            <Chip
              key={`${tag.id}`}
              label={tag.title}
              color="primary"
              className={classes.chip}
            />
          ))}
        </Box>
      </>
    );
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
            新增試卷
          </Button>
        </OperatorMenu>
      )}
      {!userState.isChecking && (
        <Paper className={classes.pageContent}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Typography variant="h4" gutterBottom>
                我的試卷
              </Typography>
            </Grid>
            {exercises.map((exercise) => {
              return (
                <Grid item md={12} key={exercise.id}>
                  <Box p={3} className={classes.exerciseCard}>
                    <Typography variant="h4" gutterBottom>
                      <b>{exercise.title}</b>
                    </Typography>
                    <Box my={3}>
                      <Typography variant="h6" gutterBottom>
                        總題數: {exercise.questions.length}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {exerciseRelates(exercise.questions)}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        備註: {exercise.description || "無"}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.menuButton}
                      >
                        指派給班級
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.menuButton}
                      >
                        分享試卷
                      </Button>
                      <ThemeProvider theme={infoTheme}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.menuButton}
                          onClick={() => {
                            navigate(`/exercises/${exercise.id}`);
                          }}
                        >
                          檢視試卷
                        </Button>
                      </ThemeProvider>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.menuButton}
                      >
                        編輯試卷
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.menuButton}
                      >
                        刪除試卷
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      )}
    </>
  );
}
