import React, { useState, useEffect } from "react";
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

import BarChartIcon from "@material-ui/icons/BarChart";

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

export default function Visualizations() {
  // 登入檢查
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  const [questionnaireResults, setQuestionnaireResults] = useState([]);
  const [display, setDisplay] = useState("1");

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }
    if (userState.user) {
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
          setQuestionnaireResults(
            result.data.filter((result) => result.is_complated === true)
          );
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
        title="資料視覺化系統"
        subTitle="圖像化系統數據"
        icon={<BarChartIcon fontSize="large" />}
      />
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
                問卷分析報告
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.menuButton}
                onClick={() => {
                  setDisplay("2");
                }}
              >
                學生分析報告
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.menuButton}
                onClick={() => {
                  setDisplay("3");
                }}
              >
                考卷分析報告
              </Button>
            </Grid>
            {display === "1" &&
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
                        完成時間:{" "}
                        {moment(questionnaireResult.complated_date).format(
                          "YYYY/MM/DD HH:mm"
                        )}
                      </Typography>
                      <Box display="flex" alignItems="center" mt={3}>
                        <ThemeProvider theme={infoTheme}>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.menuButton}
                            onClick={() => {
                              navigate(
                                `/visualization/questionnaire/${questionnaireResult._id}`
                              );
                            }}
                          >
                            查看分析報告
                          </Button>
                        </ThemeProvider>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            {display === "2" && (
              <Grid item md={12}>
                <Box p={3} className={classes.questionnaireCard}>
                  <Typography variant="h4" gutterBottom>
                    學生分析報告
                  </Typography>
                </Box>
              </Grid>
            )}
            {display === "3" && (
              <Grid item md={12}>
                <Box p={3} className={classes.questionnaireCard}>
                  <Typography variant="h4" gutterBottom>
                    試卷分析報告
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Paper>
      )}
    </>
  );
}
