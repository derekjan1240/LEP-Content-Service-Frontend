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
  Typography,
  TextField,
  FormControl,
  makeStyles,
} from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import FlagIcon from "@material-ui/icons/Flag";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SaveIcon from "@material-ui/icons/Save";

import PageHeader from "../../Utility/compmnents/PageHeader";

import green from "@material-ui/core/colors/lightGreen";

const successTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[700],
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
  videoWrapper: {
    position: "relative",
    paddingTop: "56.25%",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  saveButton: {
    padding: theme.spacing(1),
  },
}));

// 習題
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
                  </Grid>
                </Grid>
              );
            })}
        </Box>
      </Box>
    </Grid>
  );
};

const Exercise = ({ content, handleFinishExercise }) => {
  const INIT_EXERCISE = {
    title: "",
    description: "",
    questions: [],
  };

  const [exercise, setExercise] = useState(INIT_EXERCISE);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setExercise(content.exercise);
  }, []);

  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid
        item
        md={12}
        className={!exercise.description && classes.questionWrapper}
      >
        <Box mx={5}>
          <h1>試卷: {exercise.title}</h1>
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
      <Grid item md={12}>
        <Box p={3} mx={3}>
          <Button
            variant="contained"
            color="primary"
            className={classes.saveButton}
            startIcon={<SaveIcon />}
            onClick={() => {
              handleFinishExercise(exercise, answers);
            }}
            fullWidth
          >
            交卷
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

// 影片
const TagButtonGroup = ({ unit, setVideoCursor }) => {
  return (
    <Box flexDirection="row">
      <Box m={2}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setVideoCursor(0)}
        >
          回起始點
        </Button>
      </Box>
      {unit.tags
        .sort((a, b) => {
          if (a.time < b.time) {
            return -1;
          }
          if (a.time > b.time) {
            return 1;
          }
          return 0;
        })
        .map((tag) => {
          return (
            <Box m={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setVideoCursor(tag.time)}
                key={tag.id}
              >
                {tag.title}
              </Button>
            </Box>
          );
        })}
    </Box>
  );
};

const VideoContent = ({ content, videoCursor }) => {
  const classes = useStyles();
  return (
    <div className={classes.videoWrapper}>
      <iframe
        className={classes.video}
        title="This is a unique title"
        width="100%"
        height="100%"
        src={
          "https://www.youtube-nocookie.com/embed/" +
          content.unit.youtubeId +
          "?autoplay=1&start=" +
          videoCursor
        }
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
};

const VideoPlayer = ({ content, handleVideoFinished }) => {
  const [videoCursor, setVideoCursor] = useState(0);
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <Box mx={5}>
          <h1>單元: {content.unit.title}</h1>
        </Box>
      </Grid>
      <Grid item xs={12} xl={8}>
        <Box p={3} mx={3}>
          <VideoContent videoCursor={videoCursor} content={content} />
        </Box>
      </Grid>
      <Grid item xs={12} xl={4}>
        <Box p={3} mx={3}>
          <TagButtonGroup unit={content.unit} setVideoCursor={setVideoCursor} />
        </Box>
      </Grid>
      <Grid item xs={12} xl={12}>
        <Box p={3} mx={3}>
          <Typography variant="h6">單元介紹:</Typography>
          <Typography variant="h6">{content.unit.description}</Typography>
        </Box>
      </Grid>
      <Grid item md={12}>
        <Box p={3} mx={3}>
          <Button
            variant="contained"
            color="primary"
            className={classes.saveButton}
            startIcon={<SaveIcon />}
            onClick={() => {
              handleVideoFinished();
            }}
            fullWidth
          >
            完成任務
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default function MissionContent() {
  // 登入檢查
  const { mission_id } = useParams();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  const [mission, setMission] = useState(null);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }

    if (userState.user) {
      if (userState.user.role !== "Student") {
        navigate("/missions");
      }
      // 取得任務清單
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_ASSISTANT_SERVICE}/mission/content/${mission_id}`,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
      })
        .then((result) => {
          console.log("學生任務:", result.data);
          setMission(result.data);
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

  const handleVideoFinished = () => {
    Swal.fire("任務完成!");
  };

  const handleFinishExercise = (exercise, answers) => {
    console.log("交卷: ", {
      exercise,
      answers,
    });
    Swal.fire({
      title: "您確定要交卷了嗎?",
      text: "交卷後就無法再次修改哦",
      icon: "question",
      confirmButtonText: "交卷",
      showCloseButton: true,
      allowOutsideClick: false,
      width: 700,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("交卷成功!");
      }
    });
  };

  return (
    <>
      <PageHeader
        title="任務系統"
        subTitle="任務執行"
        icon={<FlagIcon fontSize="large" />}
      />
      {!userState.isChecking && mission && (
        <>
          <Paper className={classes.pageContent}>
            <Grid item md={12}>
              <Box mx={5}>
                <h1>任務: {mission.content.name}</h1>
              </Box>
            </Grid>
            {mission.content.type === "Exercise" && (
              <Exercise
                content={mission.content}
                handleFinishExercise={handleFinishExercise}
              />
            )}
            {mission.content.type === "Video" && (
              <VideoPlayer
                content={mission.content}
                handleVideoFinished={handleVideoFinished}
              />
            )}
          </Paper>
        </>
      )}
    </>
  );
}
