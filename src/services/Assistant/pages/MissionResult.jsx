import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Paper,
  Grid,
  Box,
  Button,
  Chip,
  TextField,
  FormControl,
  makeStyles,
} from "@material-ui/core";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import FlagIcon from "@material-ui/icons/Flag";

import PageHeader from "../../Utility/compmnents/PageHeader";
import OperatorMenu from "../../Utility/compmnents/OperatorMenu";

import green from "@material-ui/core/colors/lightGreen";
import cyan from "@material-ui/core/colors/cyan";
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
  correct: {
    border: `10px solid ${green[100]}`,
  },
  selected: {
    background: cyan[50],
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
  chip: {
    marginRight: theme.spacing(3),
    letterSpacing: 1.5,
    fontSize: 14,
  },
}));

const Question = ({ question, answers, errors }) => {
  const classes = useStyles();
  const navigate = useNavigate();
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
              <>
                <Grid item md={10}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="text"
                    multiline
                    fullWidth
                    value={
                      answers.filter(
                        (answer) => answer.question === question.id
                      )[0]?.answer
                    }
                    readOnly
                    required
                  />
                </Grid>
                <Grid item md={2}>
                  {errors.questions.has(question.id) ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<ErrorIcon />}
                    >
                      錯誤
                    </Button>
                  ) : (
                    <ThemeProvider theme={successTheme}>
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
              </>
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
                          ? classes.selected
                          : ""
                      }
                      multiline
                      fullWidth
                      readOnly
                      required
                    />
                  </Grid>

                  <Grid item md={2}>
                    {choice.isCorrectAnswer && (
                      <ThemeProvider theme={successTheme}>
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
                    {errors.choices.has(choice.id) && (
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<ErrorIcon />}
                      >
                        錯誤
                      </Button>
                    )}
                  </Grid>
                </Grid>
              );
            })}
        </Box>

        <Box display="flex" alignItems="center" mx={5} mt={3}>
          <Chip
            label={question.unit.title}
            color="primary"
            className={classes.chip}
          />
          <ThemeProvider theme={successTheme}>
            <Chip
              label={question?.tag?.title}
              color="primary"
              className={classes.chip}
            />
          </ThemeProvider>
          <ThemeProvider theme={infoTheme}>
            <Button
              variant="contained"
              color="primary"
              className={classes.menuButton}
              onClick={() => {
                navigate(`/content/units/${question.unit.lecture.id}`, {
                  state: {
                    unit: question.unit.id,
                    tag: question.tag?.time,
                  },
                });
              }}
            >
              前往複習
            </Button>
          </ThemeProvider>
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

const INIT_REVIEW = {
  comment: "",
};

const INIT_ERRORS = {
  questions: new Set([]),
  choices: new Set([]),
};

export default function MissionResult() {
  // 登入檢查
  const { mission_id } = useParams();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  const [mission, setMission] = useState(null);
  const [exercise, setExercise] = useState(INIT_EXERCISE);
  const [answers, setAnswers] = useState([]);
  const [review, setReview] = useState(INIT_REVIEW);
  const [errors, setErrors] = useState(INIT_ERRORS);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }

    if (userState.user) {
      // 取得已指派任務清單
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_ASSISTANT_SERVICE}/mission/content/${mission_id}`,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
      })
        .then((result) => {
          console.log("任務:", result.data);

          if (!result.data.is_reviewed) {
            navigate("/missions");
          }

          setMission(result.data);
          setErrors({
            questions: new Set(result.data.review.errors.questions),
            choices: new Set(result.data.review.errors.choices),
          });
          setReview(result.data.review);
          setAnswers(result.data.answer);
          setExercise({
            ...result.data.content.exercise,
          });
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "查詢任務失敗!",
          });
        });
    }
  }, [userState]);

  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="任務系統"
        subTitle="任務批閱"
        icon={<FlagIcon fontSize="large" />}
      />
      <OperatorMenu>
        <Button
          variant="contained"
          color="primary"
          className={classes.menuButton}
          onClick={() => {
            navigate("/missions");
          }}
        >
          回任務管理
        </Button>
      </OperatorMenu>
      {!userState.isChecking && mission && (
        <>
          <Paper className={classes.pageContent}>
            <Grid item md={12}>
              <Box mx={5}>
                <h1>{mission.content.name}</h1>
              </Box>
            </Grid>

            <Grid container spacing={3}>
              <Grid
                item
                md={12}
                className={exercise.description ? "" : classes.questionWrapper}
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
                    errors={errors}
                    setAnswers={setAnswers}
                  />
                );
              })}
              {review.comment && (
                <Grid item md={12} className={classes.questionWrapper}>
                  <Box mx={5}>
                    <TextField
                      id="outlined-basic"
                      label="教師備註"
                      variant="outlined"
                      name="comment"
                      value={review.comment}
                      inputProps={{ maxLength: 1000 }}
                      multiline
                      fullWidth
                      readOnly
                    />
                  </Box>
                </Grid>
              )}
              <Grid item md={12} className={classes.questionWrapper}>
                <Box mx={5}>
                  <h1>
                    總計:{" "}
                    {Math.round(
                      ((exercise.questions.length -
                        [...errors.questions].length) /
                        exercise.questions.length) *
                        10000
                    ) / 100.0}{" "}
                    分
                  </h1>
                  <h2>
                    總題數: {exercise.questions.length}，正確:{" "}
                    {exercise.questions.length - [...errors.questions].length}
                    ，錯誤: {[...errors.questions].length}
                  </h2>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}
    </>
  );
}
