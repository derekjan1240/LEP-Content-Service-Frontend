import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import {
  Paper,
  Grid,
  Box,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import AssignmentIcon from "@material-ui/icons/Assignment";

import PageHeader from "../../Utility/compmnents/PageHeader";
import { KolbQuestionnaire } from "../compmnents/fakeData/KolbQuestionnaire";
import OperatorMenu from "../../Utility/compmnents/OperatorMenu";

import teal from "@material-ui/core/colors/teal";

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
  questionnaireCard: {
    borderBottom: "1px dashed #636e72",
  },
}));

export default function Questionnaires() {
  // 登入檢查
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  const [questionnaires, setQuestionnaires] = useState([]);
  const [questionnaireResults, setQuestionnaireResults] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [display, setDisplay] = useState("1");

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }

    if (userState.user) {
      if (userState.user.role === "Student") {
        navigate("/questionnaire/student");
      }
      // 取得系統問卷清單
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_QUESTIONNAIRE_SERVICE}/questionnaires`,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
      })
        .then((result) => {
          console.log("系統問卷清單:", result.data);
          setQuestionnaires(result.data);
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "查詢系統問卷失敗!",
          });
        });

      // 取得已指派問卷清單
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_QUESTIONNAIRE_SERVICE}/questionnaires/result`,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
      })
        .then((result) => {
          console.log("已指派問卷清單:", result.data);
          setQuestionnaireResults(result.data);
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "查詢已指派問卷清單失敗!",
          });
        });

      // 取得教師管理的班級
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_CONTENT_SERVICE}/classrooms`,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
      })
        .then((result) => {
          console.log("教師班級清單:", result.data);
          setClassrooms(result.data);
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "讀取班級列表失敗!",
          });
        });
    }
  }, [userState]);

  // 新增 Kolb 問卷 (測試用)
  const addTestQuestionaire = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_QUESTIONNAIRE_SERVICE}/questionnaires`,
      headers: {
        token: `${localStorage.jwt}`,
        user: `${userState.user._id}`,
      },
      data: KolbQuestionnaire,
      withCredentials: true,
    })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "新增問卷失敗!",
        });
      });
  };

  const handleAssignQuestionnaire = (questionnaire) => {
    if (!classrooms || !classrooms.length) {
      Swal.fire({
        title: "您沒有班級可以指派哦!",
        text: "請先至班級管理新增班級",
        icon: "warning",
        width: 700,
      });
      return;
    }
    const inputOptions = {};
    classrooms.forEach((classroom) => {
      inputOptions[classroom.id] = classroom.name;
    });
    Swal.fire({
      title: `請選擇欲指派的班級`,
      input: "select",
      inputOptions: inputOptions,
      inputLabel: `指派問卷 - ${questionnaire.name}`,
      confirmButtonText: "指派",
      inputPlaceholder: "請選擇一個班級",
      inputValidator: (value) => {
        if (!value) {
          return "請至少選擇一個班級!";
        }
      },
      width: 1200,
      allowOutsideClick: false,
      showCancelButton: false,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result);
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_QUESTIONNAIRE_SERVICE}/questionnaires/assign`,
          headers: {
            token: `${localStorage.jwt}`,
            user: `${userState.user._id}`,
          },
          data: {
            questionnaire: questionnaire._id,
            classroom: result.value,
          },
          withCredentials: true,
        })
          .then((result) => {
            console.log("result:", result.data);
            Swal.fire({
              icon: "success",
              title: `指派班級問卷成功!`,
              width: 700,
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "指派班級問卷失敗!",
              width: 700,
            });
          });
      }
    });
  };

  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="問卷系統"
        subTitle="問卷管理"
        icon={<AssignmentIcon fontSize="large" />}
      />
      <OperatorMenu>
        <Button
          variant="contained"
          color="primary"
          className={classes.menuButton}
          onClick={() => {
            navigate("/classroom");
          }}
        >
          回班級列表
        </Button>
      </OperatorMenu>
      {!userState.isChecking && (
        <Paper className={classes.pageContent}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.menuButton}
                onClick={() => {
                  setDisplay("1");
                }}
              >
                系統問卷
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.menuButton}
                onClick={() => {
                  setDisplay("2");
                }}
              >
                已指派的問卷
              </Button>
              {/* <Button
                variant="contained"
                color="primary"
                className={classes.menuButton}
                onClick={() => {
                  addTestQuestionaire();
                }}
                // disabled
              >
                新增測試用問卷
              </Button> */}
            </Grid>
            {display === "1" &&
              questionnaires.map((questionnaire) => {
                return (
                  <Grid item md={12} key={questionnaire._id}>
                    <Box p={3} className={classes.questionnaireCard}>
                      <Typography variant="h4" gutterBottom>
                        <b>{questionnaire.name}</b>
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {questionnaire.description}
                      </Typography>
                      <Box display="flex" alignItems="center" mt={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.menuButton}
                          onClick={() => {
                            navigate(
                              `/questionnaire/${questionnaire._id}?preview=true`
                            );
                          }}
                        >
                          預覽問卷
                        </Button>
                        <ThemeProvider theme={infoTheme}>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.menuButton}
                            onClick={() => {
                              handleAssignQuestionnaire(questionnaire);
                            }}
                          >
                            指派問卷
                          </Button>
                        </ThemeProvider>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            {display === "2" &&
              questionnaireResults.map((questionnaireResult) => {
                return (
                  <Grid item md={12} key={questionnaireResult._id}>
                    <Box p={3} className={classes.questionnaireCard}>
                      <Typography variant="h4" gutterBottom>
                        <b>{questionnaireResult.questionnaire.name}</b>
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        所屬班級: {questionnaireResult.classroom.name}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        指派對象: {questionnaireResult.assignee?.userName}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        指派時間:{" "}
                        {moment(questionnaireResult.createdAt).format(
                          "YYYY/MM/DD HH:mm"
                        )}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        完成狀態:{" "}
                        {questionnaireResult.is_complated
                          ? `學生已完成 ${moment(
                              questionnaireResult.complated_date
                            ).format("(YYYY/MM/DD HH:mm)")}`
                          : "學生尚未完成"}
                      </Typography>
                      {questionnaireResult.is_complated && (
                        <Box mt={3}>
                          <ThemeProvider theme={infoTheme}>
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.menuButton}
                              onClick={() => {
                                navigate(
                                  `/questionnaire/${questionnaireResult._id}`
                                );
                              }}
                            >
                              察看結果
                            </Button>
                          </ThemeProvider>
                        </Box>
                      )}
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
