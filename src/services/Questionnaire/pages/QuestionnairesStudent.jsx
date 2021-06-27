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

export default function QuestionnairesStudent() {
  // 登入檢查
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  const [questionnaireResults, setQuestionnaireResults] = useState([]);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }

    if (userState.user) {
      if (userState.user.role !== "Student") {
        navigate("/questionnaire");
      }

      // 取得學生問卷清單
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_QUESTIONNAIRE_SERVICE}/questionnaires/result`,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
      })
        .then((result) => {
          console.log("學生問卷清單:", result.data);
          setQuestionnaireResults(result.data);
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "查詢已指派問卷清單失敗!",
          });
        });
    }
  }, [userState]);

  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="問卷系統"
        subTitle="問卷管理"
        icon={<AssignmentIcon fontSize="large" />}
      />
      {!userState.isChecking && (
        <Paper className={classes.pageContent}>
          <Grid container spacing={3}>
            {questionnaireResults.map((questionnaireResult) => {
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
                      指派對象: {questionnaireResult.assignee.userName}
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
                        ? `已完成 ${moment(
                            questionnaireResult.complated_date
                          ).format("(YYYY/MM/DD HH:mm)")}`
                        : "尚未完成"}
                    </Typography>
                    {!questionnaireResult.is_complated && (
                      <Box mt={3}>
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
                          前往填寫
                        </Button>
                      </Box>
                    )}
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
