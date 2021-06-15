import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert2";
import axios from "axios";
import {
  Paper,
  Grid,
  Box,
  Button,
  TextField,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  makeStyles,
} from "@material-ui/core";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/lightGreen";
import indigo from "@material-ui/core/colors/indigo";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import MenuBookIcon from "@material-ui/icons/MenuBook";

import PageHeader from "../../Utility/compmnents/PageHeader";

const successTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[700],
      contrastText: "#fff",
    },
  },
});

const correctTheme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[800],
      contrastText: "#fff",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  correct: {
    background: green[100],
  },
  button: {
    margin: theme.spacing(1),
  },
  saveButton: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  questionWrapper: {
    borderBottom: "1px dashed #636e72",
  },
}));

const Question = ({ question, answers, setAnswers }) => {
  const classes = useStyles();

  const handleCorrectAnswerSet = (question, choice, textAnswer) => {
    if (question.type === "choiceAnswer") {
      const newAnswers = answers
        .slice(0)
        .filter((answer) => answer.answer !== choice.id);

      if (newAnswers.length === answers.length) {
        newAnswers.push({
          question: question.id,
          answer: choice.id,
        });
      }
      setAnswers(newAnswers);
    } else {
      const newAnswers = answers
        .slice(0)
        .filter((answer) => answer.question !== question.id);
      newAnswers.push({
        question: question.id,
        answer: textAnswer,
      });
      setAnswers(newAnswers);
    }
  };

  return (
    <Grid item md={12} className={classes.questionWrapper}>
      <Box p={5}>
        <Box p={2} mx={5}>
          <FormControl component="fieldset">
            <FormLabel component="legend">類型</FormLabel>
            <RadioGroup aria-label="type" name="type" value={question.type} row>
              <FormControlLabel
                value="choiceAnswer"
                control={<Radio />}
                label="選擇題"
                checked={question.type === "choiceAnswer"}
              />
              <FormControlLabel
                value="textAnswer"
                control={<Radio />}
                label="問答題"
                checked={question.type === "textAnswer"}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box mx={5}>
          <Grid container spacing={3} alignItems="center">
            <Grid item md={12}>
              <TextField
                id="outlined-basic"
                label="題目"
                variant="outlined"
                type="text"
                name="title"
                value={question.title}
                multiline
                fullWidth
                inputProps={{ maxLength: 500 }}
                readOnly
                required
              />
            </Grid>
            {question.description && (
              <Grid item md={12}>
                <TextField
                  id="outlined-basic"
                  label="說明"
                  variant="outlined"
                  name="description"
                  value={question.description}
                  inputProps={{ maxLength: 500 }}
                  multiline
                  readOnly
                  fullWidth
                />
              </Grid>
            )}
            {question.type === "textAnswer" && (
              <Grid item md={10}>
                <TextField
                  id="outlined-basic"
                  label="回答"
                  variant="outlined"
                  type="text"
                  multiline
                  fullWidth
                  onChange={(el) => {
                    handleCorrectAnswerSet(question, null, el.target.value);
                  }}
                  readOnly
                  required
                />
              </Grid>
            )}
          </Grid>
        </Box>
        <Box mx={5}>
          {question.type === "choiceAnswer" &&
            question.choices.map((choice) => {
              return (
                <Grid container spacing={3} alignItems="center" key={choice.id}>
                  <Grid item md={10}>
                    <TextField
                      id="outlined-basic"
                      label="選項"
                      variant="outlined"
                      type="text"
                      value={choice.title}
                      className={
                        answers.filter((answer) => answer.answer === choice.id)
                          .length
                          ? classes.correct
                          : null
                      }
                      multiline
                      fullWidth
                      readOnly
                      required
                    />
                  </Grid>
                  <Grid item md={2}>
                    <ThemeProvider theme={successTheme}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<CheckCircleIcon />}
                        onClick={() => {
                          handleCorrectAnswerSet(question, choice, null);
                        }}
                      >
                        選擇
                      </Button>
                    </ThemeProvider>
                    {choice.isCorrectAnswer && (
                      <ThemeProvider theme={correctTheme}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          startIcon={<CheckCircleIcon />}
                        >
                          正解
                        </Button>
                      </ThemeProvider>
                    )}
                  </Grid>
                </Grid>
              );
            })}
        </Box>
      </Box>
    </Grid>
  );
};

const INIT_EXERCISE = {
  title: "",
  description: "",
  questions: [],
};

export default function ExercisesRead() {
  // 登入檢查
  const { exercise_id } = useParams();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  const [exercise, setExercise] = useState(INIT_EXERCISE);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }

    if (userState.user) {
      if (userState.user.role === "Student") {
        navigate("/exercises");
      }

      axios({
        method: "GET",
        url: `${process.env.REACT_APP_CONTENT_SERVICE}/exercises/${exercise_id}`,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
      })
        .then((result) => {
          console.log("試卷:", result.data);
          setExercise(result.data);
        })
        .catch((error) => {
          console.error(error);
          navigate("/exercises");
        });
    }
  }, [userState]);

  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="習題系統"
        subTitle="書寫習題"
        icon={<MenuBookIcon fontSize="large" />}
      />
      {!userState.isChecking && (
        <>
          <Paper className={classes.pageContent}>
            <Grid container spacing={3}>
              <Grid
                item
                md={12}
                className={!exercise.description && classes.questionWrapper}
              >
                <Box mx={5}>
                  <h1>{exercise.title}</h1>
                </Box>
              </Grid>
              {exercise.description && (
                <Grid item md={12} className={classes.questionWrapper}>
                  <Box mx={5}>
                    <TextField
                      id="outlined-basic"
                      label="試卷備註"
                      variant="outlined"
                      type="text"
                      name="description"
                      value={exercise.description}
                      fullWidth
                      multiline
                      readOnly
                    />
                  </Box>
                </Grid>
              )}
              {exercise.questions.map((question) => {
                return (
                  <Question
                    key={question.id}
                    question={question}
                    answers={answers}
                    setAnswers={setAnswers}
                  />
                );
              })}
            </Grid>
          </Paper>
        </>
      )}
    </>
  );
}
