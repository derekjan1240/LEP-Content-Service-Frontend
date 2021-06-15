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
  Chip,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import FlagIcon from "@material-ui/icons/Flag";

import PageHeader from "../../Utility/compmnents/PageHeader";

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
  missionCard: {
    borderBottom: "1px dashed #636e72",
  },
  chip: {
    margin: theme.spacing(1),
    letterSpacing: 1.5,
    fontSize: 14,
  },
}));

export default function MissionsStudent() {
  // 登入檢查
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  const [missions, setMissions] = useState([]);

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
        url: `${process.env.REACT_APP_ASSISTANT_SERVICE}/mission/student`,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
      })
        .then((result) => {
          console.log("學生任務:", result.data);
          setMissions(result.data);
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
        subTitle="任務管理"
        icon={<FlagIcon fontSize="large" />}
      />
      {!userState.isChecking && (
        <Paper className={classes.pageContent}>
          <Grid container spacing={3}>
            {missions.map((mission) => {
              return (
                <Grid item md={12} key={mission.id}>
                  <Box p={3} className={classes.missionCard}>
                    <Typography variant="h4" gutterBottom>
                      <b>{mission.content.name}</b>
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Typography variant="h6">類型: </Typography>
                      {mission.content.type === "Video" ? (
                        <Chip
                          label="影片"
                          color="primary"
                          className={classes.chip}
                        />
                      ) : (
                        <ThemeProvider theme={successTheme}>
                          <Chip
                            label="練習卷"
                            color="primary"
                            className={classes.chip}
                          />
                        </ThemeProvider>
                      )}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      指派人: {mission.assigner.userName}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      指派時間:{" "}
                      {moment(mission.createdAt).format("YYYY/MM/DD HH:mm")}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      所屬班級: {mission.classroom.name}
                    </Typography>
                    {mission.content.exercise && (
                      <Typography variant="h6" gutterBottom>
                        任務內容: {mission.content.exercise.title}
                      </Typography>
                    )}
                    {mission.content.unit && (
                      <Typography variant="h6" gutterBottom>
                        任務內容: {mission.content.unit.title}
                      </Typography>
                    )}
                    <Typography variant="h6" gutterBottom>
                      任務狀態:{" "}
                      {mission.is_complated
                        ? moment(mission.complated_date).format(
                            "已完成 (YYYY/MM/DD HH:mm)"
                          )
                        : "未完成"}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      批閱狀態:{" "}
                      {mission.content.type === "Video"
                        ? "不需批閱"
                        : mission.is_reviewed
                        ? `教師已批閱 ${moment(mission.reviewed_date).format(
                            "(YYYY/MM/DD HH:mm)"
                          )}`
                        : "教師尚未批閱"}
                    </Typography>
                    {!mission.is_complated && (
                      <Box mt={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.menuButton}
                          onClick={() => {
                            navigate(`/missions/content/${mission._id}`);
                          }}
                        >
                          前往任務
                        </Button>
                      </Box>
                    )}
                    {mission.is_reviewed && (
                      <Box mt={3}>
                        <ThemeProvider theme={infoTheme}>
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.menuButton}
                          >
                            查看結果
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
