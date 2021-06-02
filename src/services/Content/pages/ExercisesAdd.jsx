import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  InputLabel,
  makeStyles,
} from "@material-ui/core";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";

import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SaveIcon from "@material-ui/icons/Save";
import MenuBookIcon from "@material-ui/icons/MenuBook";

import PageHeader from "../../Utility/compmnents/PageHeader";
import OperatorMenu from "../../Utility/compmnents/OperatorMenu";

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
  button: {
    margin: theme.spacing(1),
  },
  successButton: {
    background: "green",
  },
  questionWrapper: {
    borderBottom: "1px dashed #636e72",
  },
}));

const Question = ({
  initQuestionData,
  questions,
  setQuestions,
  unitsCache,
  setUnitsCache,
  handleQuestionDelete,
}) => {
  const [question, setQuestion] = useState(initQuestionData);
  const [unit, setUnit] = useState(null);
  const [tags, setTags] = useState([]);

  const handleChange = (event) => {
    setQuestion({
      ...initQuestionData,
      type: event.target.value,
    });
  };

  const handleInputChange = (event) => {
    setQuestion({
      ...question,
      [event.target.name]: event.target.value,
    });
  };

  const handleChoiceChange = (value, index) => {
    const clonedChoiseArr = question.choices.slice(0);
    clonedChoiseArr[index].title = value;
    setQuestion({
      ...question,
      choices: clonedChoiseArr,
    });
  };

  const handleChoiceAdd = () => {
    const clonedChoiseArr = question.choices.slice(0);
    clonedChoiseArr.push({
      title: "",
      isCorrectAnswer: false,
    });
    setQuestion({
      ...question,
      choices: clonedChoiseArr,
    });
  };

  const handleChoiceDelete = (i) => {
    const clonedChoiseArr = question.choices.slice(0);
    if (clonedChoiseArr.length === 1) {
      swal.fire({
        icon: "warning",
        title: "題目至少需要一個選項!",
        confirmButtonText: "關閉",
        width: 700,
      });
      return;
    }
    clonedChoiseArr.splice(i, 1);
    setQuestion({
      ...question,
      choices: clonedChoiseArr,
    });
  };

  const handleCorrectChoiceSet = (i) => {
    const clonedChoiseArr = question.choices.slice(0);
    clonedChoiseArr.map((choice, index) => {
      if (i === index) {
        choice.isCorrectAnswer = !choice.isCorrectAnswer;
      }
      return choice;
    });
    setQuestion({
      ...question,
      choices: clonedChoiseArr,
    });
  };

  useEffect(() => {
    const newQuestions = questions.map((q) => {
      return q.id === question.id ? question : q;
    });
    setQuestions(newQuestions);
  }, [question]);

  useEffect(() => {
    // Fetch Unit & Tags
    if (question.videoId.length === 11) {
      const theUnit = unitsCache.filter(
        (cacheUnit) => cacheUnit.youtubeId === question.videoId
      );
      if (theUnit.length) {
        setTags(theUnit[0].tags);
        setUnit(theUnit[0]);
        setQuestion({
          ...question,
          unitId: theUnit[0].id,
        });
      } else {
        axios({
          method: "get",
          url: `${process.env.REACT_APP_CONTENT_SERVICE}/units`,
          params: {
            youtube_id: question.videoId,
          },
        })
          .then((result) => {
            if (result.data.length) {
              const clonedUnitsCache = unitsCache;
              clonedUnitsCache.push(result.data[0]);
              setUnitsCache(clonedUnitsCache);
              setUnit(result.data[0]);
              setTags(result.data[0].tags);
              setQuestion({
                ...question,
                unitId: result.data[0].id,
              });
            } else {
              setTags([]);
              setQuestion({
                ...question,
                unit: null,
              });
              swal.fire({
                title: "該課程影片不存在!",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            console.error(err);
            swal.fire({
              title: "影片標籤查詢失敗!",
              icon: "error",
            });
          });
      }
    } else {
      setUnit(null);
      setTags([]);
      setQuestion({
        ...question,
        tagId: "",
        unitId: "",
      });
    }
  }, [question.videoId]);

  const classes = useStyles();

  return (
    <Grid item md={12} className={classes.questionWrapper}>
      <Box p={5}>
        <Box p={2} mx={5}>
          <FormControl component="fieldset">
            <FormLabel component="legend">類型</FormLabel>
            <RadioGroup
              aria-label="type"
              name="type"
              value={question.type}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="choiceAnswer"
                control={<Radio />}
                label="選擇題"
              />
              <FormControlLabel
                value="textAnswer"
                control={<Radio />}
                label="問答題"
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
                onChange={handleInputChange}
                inputProps={{ maxLength: 500 }}
                error={question.errors.title !== ""}
                helperText={question.errors.title}
                required
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                id="outlined-basic"
                label="說明"
                variant="outlined"
                name="description"
                value={question.description}
                onChange={handleInputChange}
                inputProps={{ maxLength: 500 }}
                multiline
                fullWidth
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                id="videoId"
                label="影片ID"
                variant="outlined"
                type="text"
                name="videoId"
                value={question.videoId}
                fullWidth
                onChange={handleInputChange}
                inputProps={{ maxLength: 11 }}
              />
            </Grid>
            {unit?.title && (
              <Grid item md={4}>
                <TextField
                  id="unit"
                  label="單元"
                  variant="outlined"
                  type="text"
                  name="unit"
                  value={unit?.title}
                  fullWidth
                  readonly
                />
              </Grid>
            )}
            {tags[0] && (
              <Grid item md={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="tag">標籤</InputLabel>
                  <Select
                    native
                    value={question.tagId}
                    onChange={handleInputChange}
                    inputProps={{
                      name: "tagId",
                      id: "tag",
                    }}
                    label="標籤"
                  >
                    <option aria-label="None" value="" />
                    {tags.map((tag) => {
                      return (
                        <option key={tag.id} value={tag.id}>
                          {tag.title}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            )}
            {question.type === "choiceAnswer" &&
              question.choices.map((choice, index) => {
                return (
                  <>
                    <Grid item md={10}>
                      <TextField
                        id="outlined-basic"
                        label="選項"
                        variant="outlined"
                        type="text"
                        value={choice.title}
                        multiline
                        fullWidth
                        className={
                          choice.isCorrectAnswer ? classes.correct : null
                        }
                        onChange={(el) => {
                          handleChoiceChange(el.target.value, index);
                        }}
                        error={question.errors.choices[index]}
                        helperText={question.errors.choices[index]}
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
                            handleCorrectChoiceSet(index);
                          }}
                        >
                          設為正解
                        </Button>
                      </ThemeProvider>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          handleChoiceDelete(index);
                        }}
                      >
                        刪除
                      </Button>
                    </Grid>
                  </>
                );
              })}
            <Grid item md={12}>
              {question.type === "choiceAnswer" && (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<AddCircleIcon />}
                  onClick={handleChoiceAdd}
                >
                  新增選項
                </Button>
              )}
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() => {
                  handleQuestionDelete(question.id);
                }}
              >
                刪除題目
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default function ExercisesAdd() {
  // 登入檢查
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }
  }, [userState]);

  const INIT_EXERCISE = {
    title: "",
    description: "",
    errors: {
      title: "",
    },
  };

  const INIT_QUESTION = {
    id: new Date().getTime(),
    type: "choiceAnswer",
    title: "",
    description: "",
    videoId: "",
    unitId: "",
    tagId: "",
    choices: [
      {
        title: "",
        isCorrectAnswer: false,
      },
    ],
    errors: {
      title: "",
      choices: [],
    },
  };

  const [exercise, setExercise] = useState(INIT_EXERCISE);
  const [questions, setQuestions] = useState([]);
  const [unitsCache, setUnitsCache] = useState([]);

  const handleInputChange = (event) => {
    setExercise({
      ...exercise,
      [event.target.name]: event.target.value,
    });
  };

  const handleQuestionAdd = () => {
    const clonedArray = questions.slice(0);
    clonedArray.push(INIT_QUESTION);
    setQuestions(clonedArray);
  };

  const handleQuestionDelete = (qusetionId) => {
    const newQuestions = questions.filter(
      (question) => question.id !== qusetionId
    );
    setQuestions(newQuestions);
  };

  const validQuestions = () => {
    let isValid = true;
    const clonedQuestions = questions.slice(0);
    clonedQuestions.forEach((question) => {
      if (question.title === "") {
        question.errors.title = "題目不得為空!";
        isValid = false;
      } else {
        question.errors.title = "";
      }

      if (question.type === "choiceAnswer") {
        const answerCount = question.choices.filter(
          (choice) => choice.isCorrectAnswer === true
        ).length;

        if (!answerCount) {
          question.errors.choices[0] = "請至少設定一個正確選項";
          isValid = false;
        } else {
          question.errors.choices[0] = "";
          question.choices.forEach((choice, index) => {
            if (choice.title === "") {
              question.errors.choices[index] = "選項為必填";
              isValid = false;
            } else {
              question.errors.choices[index] = "";
            }
          });
        }
      }
    });
    setQuestions(clonedQuestions);
    return isValid;
  };

  const validExercise = () => {
    let isValid = true;
    const clonedExercise = { ...exercise };
    if (clonedExercise.title === "") {
      clonedExercise.errors.title = "試卷名稱不得為空!";
      isValid = false;
    } else {
      clonedExercise.errors.title = "";
    }
    setExercise(clonedExercise);

    return isValid;
  };

  const handleAddExercise = () => {
    if (questions.length === 0) {
      swal.fire({
        icon: "error",
        title: "請至少新增一道題目!",
      });
    } else {
      if (validExercise() && validQuestions()) {
        console.log("Exercise", {
          title: exercise.title,
          description: exercise.description,
          questions,
        });
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_CONTENT_SERVICE}/exercises`,
          headers: {
            token: `${localStorage.jwt}`,
            user: `${userState.user._id}`,
          },
          data: {
            title: exercise.title,
            description: exercise.description,
            questions,
          },
          withCredentials: true,
        })
          .then((result) => {
            console.log(result);
            swal
              .fire({
                icon: "success",
                title: "新增試卷成功!",
              })
              .then(() => {
                navigate("/exercises");
              });
          })
          .catch((err) => {
            console.error(err);
            swal.fire({
              icon: "error",
              title: "新增失敗!",
            });
          });
      }
    }
  };

  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="習題系統"
        subTitle="新增習題"
        icon={<MenuBookIcon fontSize="large" />}
      />
      {!userState.isChecking && (
        <>
          <OperatorMenu>
            <Button
              variant="contained"
              color="primary"
              className={classes.menuButton}
              onClick={() => {
                navigate("/exercises");
              }}
            >
              回習題列表
            </Button>
          </OperatorMenu>
          <Paper className={classes.pageContent}>
            <Grid container spacing={3}>
              <Grid item md={12}>
                <Box mx={5}>
                  <TextField
                    id="outlined-basic"
                    label="試卷名稱"
                    variant="outlined"
                    type="text"
                    name="title"
                    value={exercise.title}
                    error={exercise.errors.title !== ""}
                    helperText={exercise.errors.title}
                    inputProps={{ maxLength: 50 }}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Box>
              </Grid>
              <Grid item md={12} className={classes.questionWrapper}>
                <Box mx={5}>
                  <TextField
                    id="outlined-basic"
                    label="試卷備註"
                    variant="outlined"
                    type="text"
                    name="description"
                    value={exercise.description}
                    inputProps={{ maxLength: 500 }}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                  />
                </Box>
              </Grid>
              {questions.map((question) => {
                return (
                  <Question
                    key={question.id}
                    initQuestionData={question}
                    questions={questions}
                    setQuestions={setQuestions}
                    unitsCache={unitsCache}
                    setUnitsCache={setUnitsCache}
                    handleQuestionDelete={handleQuestionDelete}
                  />
                );
              })}
              <Grid item md={12}>
                <Box p={3} mx={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<AddCircleIcon />}
                    onClick={handleQuestionAdd}
                  >
                    新增題目
                  </Button>
                  <ThemeProvider theme={successTheme}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                      onClick={handleAddExercise}
                    >
                      儲存試卷
                    </Button>
                  </ThemeProvider>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}
    </>
  );
}
