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
}));

const ContentSelectOption = () => {
  const [state, setState] = useState({
    grade: "",
    subject: "",
    lecture: "",
    unit: "",
    tag: "",
  });

  const [options, setOptions] = useState({
    grades: [],
    subjects: [],
    lectures: [],
    units: [],
    tags: [],
  });

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_CONTENT_SERVICE}/grades`,
    }).then((result) => {
      const grades = result.data;
      // 章節排序
      grades.sort((a, b) => {
        if (a.order < b.order) {
          return -1;
        }
        if (a.order > b.order) {
          return 1;
        }
        return 0;
      });
      setOptions({
        ...options,
        grades,
      });
    });
  }, []);

  useEffect(() => {
    console.log("state:", state);
  }, [state]);

  const handleStateChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleGradeChange = (event) => {
    handleStateChange(event);
    axios({
      method: "get",
      url: `${process.env.REACT_APP_CONTENT_SERVICE}/grades/${event.target.value}`,
    }).then((result) => {
      const subjects = result.data.subjects;
      // 章節排序
      subjects.sort((a, b) => {
        if (a.order < b.order) {
          return -1;
        }
        if (a.order > b.order) {
          return 1;
        }
        return 0;
      });
      setOptions({
        ...options,
        subjects,
      });
    });
  };

  const handleSubjectChange = (event) => {
    handleStateChange(event);
    axios({
      method: "get",
      url: `${process.env.REACT_APP_CONTENT_SERVICE}/lectures`,
      params: {
        grade: state.grade,
        subject: event.target.value,
      },
    }).then((result) => {
      const lectures = result.data;
      // 章節排序
      lectures.sort((a, b) => {
        if (a.order < b.order) {
          return -1;
        }
        if (a.order > b.order) {
          return 1;
        }
        return 0;
      });
      setOptions({
        ...options,
        lectures,
      });
    });
  };

  const handleLectureChange = (event) => {
    handleStateChange(event);
    axios({
      method: "get",
      url: `${process.env.REACT_APP_CONTENT_SERVICE}/lectures/${event.target.value}`,
    }).then((result) => {
      console.log(result);
      const units = result.data.units;
      // 章節排序
      units.sort((a, b) => {
        if (a.order < b.order) {
          return -1;
        }
        if (a.order > b.order) {
          return 1;
        }
        return 0;
      });
      setOptions({
        ...options,
        units,
      });
    });
  };

  const handleUnitChange = (event) => {
    handleStateChange(event);
    const unit = options.units.filter((unit) => unit.id === event.target.value);

    if (unit.length) {
      setOptions({
        ...options,
        tags: unit[0].tags,
      });
    }
  };

  return (
    <>
      <Grid item md={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="grade">年級</InputLabel>
          <Select
            native
            value={state.grade}
            onChange={handleGradeChange}
            inputProps={{
              name: "grade",
              id: "grade",
            }}
            label="年級"
          >
            <option aria-label="None" value="" />
            {options.grades.map((grade) => {
              return (
                <option key={grade.id} value={grade.id}>
                  {grade.title}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="subject">科目</InputLabel>
          <Select
            native
            value={state.subject}
            onChange={handleSubjectChange}
            inputProps={{
              name: "subject",
              id: "subject",
            }}
            label="科目"
          >
            <option aria-label="None" value="" />
            {options.subjects.map((subject) => {
              return (
                <option key={subject.id} value={subject.id}>
                  {subject.title}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="lecture">章節</InputLabel>
          <Select
            native
            value={state.lecture}
            onChange={handleLectureChange}
            inputProps={{
              name: "lecture",
              id: "lecture",
            }}
            label="章節"
          >
            <option aria-label="None" value="" />
            {options.lectures.map((lecture) => {
              return (
                <option key={lecture.id} value={lecture.id}>
                  {lecture.title}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="unit">單元</InputLabel>
          <Select
            native
            value={state.unit}
            onChange={handleUnitChange}
            inputProps={{
              name: "unit",
              id: "unit",
            }}
            label="單元"
          >
            <option aria-label="None" value="" />
            {options.units.map((unit) => {
              return (
                <option key={unit.id} value={unit.id}>
                  {unit.title}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="tag">標籤</InputLabel>
          <Select
            native
            value={state.tag}
            onChange={handleStateChange}
            inputProps={{
              name: "tag",
              id: "tag",
            }}
            label="標籤"
          >
            <option aria-label="None" value="" />
            {options.tags.map((tag) => {
              return (
                <option key={tag.id} value={tag.id}>
                  {tag.title}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

const ChoiceQuestion = () => {
  const initChoiceQuestion = {
    type: "1",
    title: "",
    intro: "",
    choices: [
      {
        title: "",
        isCorrectAnswer: false,
      },
    ],
  };

  const [question, setQuestion] = useState(initChoiceQuestion);
  const [error, setError] = useState({
    question: null,
    choice: [],
  });

  useEffect(() => {
    console.log(question);
  }, [question]);

  const handleCorrectChoiceSet = (i) => {
    const clonedArr = question.choices.slice(0);
    clonedArr.map((choice, index) => {
      if (i === index) {
        choice.isCorrectAnswer = !choice.isCorrectAnswer;
      }
      return choice;
    });
    setQuestion({
      ...question,
      choices: clonedArr,
    });
  };

  const handleDeleteChoice = (i) => {
    const clonedArr = question.choices.slice(0);
    if (clonedArr.length === 1) {
      swal.fire({
        icon: "warning",
        title: "題目至少需要一個選項!",
        confirmButtonText: "關閉",
        width: 700,
      });
      return;
    }
    clonedArr.splice(i, 1);
    setQuestion({
      ...question,
      choices: clonedArr,
    });
  };

  const handleChoiceAdd = () => {
    const clonedArr = question.choices.slice(0);
    clonedArr.push({
      title: "",
      isCorrectAnswer: false,
    });
    setQuestion({
      ...question,
      choices: clonedArr,
    });
  };

  const handleChoiceChange = (value, index) => {
    const clonedArr = question.choices.slice(0);
    clonedArr[index].title = value;
    // clonedArr[index].error = value === "" ? "選項為必填" : null;

    setQuestion({
      ...question,
      choices: clonedArr,
    });
  };

  const handleInputChange = (event) => {
    setQuestion({
      ...question,
      [event.target.name]: event.target.value,
    });
  };

  const handleQuestionSave = () => {
    if (validQuestion()) {
      swal.fire({
        icon: "success",
        title: "新增選擇題成功!",
      });
    } else {
      swal.fire({
        icon: "error",
        title: "請確實填寫必填項目!",
      });
    }
  };

  const validQuestion = () => {
    let isValid = true;
    const temp = {
      question: null,
      choice: [],
    };

    if (question.title === "") {
      temp.question = "題目為必填";
      isValid = false;
    }

    question.choices.forEach((choice, index) => {
      if (choice.title === "") {
        temp.choice[index] = "選項為必填";
        isValid = false;
      }
    });

    setError(temp);
    return isValid;
  };

  const classes = useStyles();

  return (
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
          onChange={(event) => {
            handleInputChange(event);
          }}
          error={error.question}
          helperText={error.question}
          required
        />
      </Grid>
      <Grid item md={12}>
        <TextField
          id="outlined-basic"
          label="說明"
          variant="outlined"
          name="intro"
          value={question.intro}
          onChange={(event) => {
            handleInputChange(event);
          }}
          multiline
          fullWidth
        />
      </Grid>
      <ContentSelectOption />
      {question.choices.map((choice, index) => {
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
                className={choice.isCorrectAnswer ? classes.correct : null}
                onChange={(el) => {
                  handleChoiceChange(el.target.value, index);
                }}
                error={error.choice[index]}
                helperText={error.choice[index]}
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
                  handleDeleteChoice(index);
                }}
              >
                刪除
              </Button>
            </Grid>
          </>
        );
      })}
      <Grid item md={12}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddCircleIcon />}
          onClick={handleChoiceAdd}
        >
          新增選項
        </Button>
        <ThemeProvider theme={successTheme}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={() => {
              validQuestion();
              handleQuestionSave();
            }}
          >
            完成
          </Button>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
};

const TextQuestion = () => {
  const initTextQuestion = {
    type: "2",
    title: "",
    intro: "",
  };

  const [question, setQuestion] = useState(initTextQuestion);
  const [error, setError] = useState({
    title: null,
  });

  useEffect(() => {
    console.log(question);
  }, [question]);

  const handleInputChange = (event) => {
    setQuestion({
      ...question,
      [event.target.name]: event.target.value,
    });
  };

  const validQuestion = () => {
    let isValid = true;
    const temp = {
      title: null,
    };
    if (question.title === "") {
      temp.title = "題目為必填";
      isValid = false;
    }
    setError(temp);
    return isValid;
  };

  const handleQuestionSave = () => {
    if (validQuestion()) {
      swal.fire({
        icon: "success",
        title: "新增問答題成功!",
      });
    } else {
      swal.fire({
        icon: "error",
        title: "請確實填寫必填項目!",
      });
    }
  };

  const classes = useStyles();

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item md={12}>
        <TextField
          id="outlined-basic"
          label="題目"
          variant="outlined"
          type="text"
          name="title"
          value={question.title}
          onChange={(event) => {
            handleInputChange(event);
          }}
          error={error.title}
          helperText={error.title}
          multiline
          fullWidth
          required
        />
      </Grid>
      <Grid item md={12}>
        <TextField
          id="outlined-basic"
          label="說明"
          variant="outlined"
          name="intro"
          value={question.intro}
          onChange={(event) => {
            handleInputChange(event);
          }}
          multiline
          fullWidth
        />
      </Grid>
      <ContentSelectOption />
      <Grid item md={12}>
        <ThemeProvider theme={successTheme}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={() => {
              validQuestion();
              handleQuestionSave();
            }}
          >
            完成
          </Button>
        </ThemeProvider>
      </Grid>
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

  const [type, setType] = useState("choiceAnswer");
  const [questions, setQuestions] = useState([]);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleQuestionAdd = () => {
    const clonedArr = questions.slice(0);
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
                  <FormControl component="fieldset">
                    <FormLabel component="legend">類型</FormLabel>
                    <RadioGroup
                      aria-label="type"
                      name="type"
                      value={type}
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
              </Grid>
              <Grid item md={12}>
                {type === "choiceAnswer" ? (
                  <Box mx={5}>
                    <ChoiceQuestion />
                  </Box>
                ) : (
                  <Box mx={5}>
                    <TextQuestion />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Paper>
        </>
      )}
    </>
  );
}
