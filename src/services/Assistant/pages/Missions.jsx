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
import OperatorMenu from "../../Utility/compmnents/OperatorMenu";
import MissionForm from "../compmnents/mission/MissionForm";
import Popup from "../../Utility/compmnents/Popup";

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

export default function Missions() {
  // 登入檢查
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  const [missions, setMissions] = useState([]);
  const [assignedMissions, setAssignedMissions] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }

    if (userState.user) {
      if (userState.user.role === "Student") {
        navigate("/missions/student");
      }
      // 取得已新增任務清單
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_ASSISTANT_SERVICE}/mission/teacher`,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
      })
        .then((result) => {
          console.log("已新增任務清單:", result.data);
          setMissions(result.data);
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "查詢任務失敗!",
          });
        });

      // 取得已指派任務清單
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_ASSISTANT_SERVICE}/mission/student`,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
      })
        .then((result) => {
          console.log("已指派任務清單:", result.data);
          setAssignedMissions(result.data);
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "查詢任務失敗!",
          });
        });

      // 取得考試卷清單
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
        console.log("考試卷:", result.data);
        setExercises(result.data);
      });

      // 取得影片清單
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_CONTENT_SERVICE}/units`,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
        withCredentials: true,
      })
        .then((result) => {
          console.log("影片:", result.data);
          setUnits(result.data);
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "新增班級失敗!",
          });
        });
    }
  }, [userState]);

  const [openPopup, setOpenPopup] = useState(false);
  const [display, setDisplay] = useState("2");

  const handleAdd = (newMission, resetForm) => {
    resetForm();
    setOpenPopup(false);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_ASSISTANT_SERVICE}/mission/teacher`,
      headers: {
        token: `${localStorage.jwt}`,
        user: `${userState.user._id}`,
      },
      data: newMission,
      withCredentials: true,
    })
      .then((result) => {
        console.log(result.data);
        const clonedMissions = missions.slice(0);
        clonedMissions.push(result.data);
        setMissions(clonedMissions);
        Swal.fire({
          icon: "success",
          title: `新增任務 ${result.data.name} 成功!`,
          width: 700,
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "新增任務失敗!",
        });
      });
  };

  const getExerciseName = (mission) => {
    return exercises.filter((exercise) => exercise.id === mission.exercise)[0]
      ?.title;
  };

  const getUnitName = (mission) => {
    return units.filter((unit) => unit.id === mission.unit)[0]?.title;
  };

  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="任務系統"
        subTitle="任務管理"
        icon={<FlagIcon fontSize="large" />}
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
              setOpenPopup(true);
            }}
          >
            新增任務
          </Button>
        </OperatorMenu>
      )}
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
                已新增的任務
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.menuButton}
                onClick={() => {
                  setDisplay("2");
                }}
              >
                已指派的任務
              </Button>
            </Grid>
            {display === "1" &&
              missions.map((mission) => {
                return (
                  <Grid item md={12} key={mission._id}>
                    <Box p={3} className={classes.missionCard}>
                      <Typography variant="h4" gutterBottom>
                        <b>{mission.name}</b>
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Typography variant="h6">類型: </Typography>
                        {mission.type === "Video" ? (
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
                      {mission.exercise && (
                        <Typography variant="h6" gutterBottom>
                          任務內容: {getExerciseName(mission)}
                        </Typography>
                      )}
                      {mission.unit && (
                        <Typography variant="h6" gutterBottom>
                          任務內容: {getUnitName(mission)}
                        </Typography>
                      )}
                      <Box display="flex" alignItems="center" mt={3}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.menuButton}
                        >
                          指派任務
                        </Button>
                        {mission.exercise && (
                          <ThemeProvider theme={infoTheme}>
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.menuButton}
                              onClick={() => {
                                navigate(`/exercises/${mission.exercise}`);
                              }}
                            >
                              檢視試卷
                            </Button>
                          </ThemeProvider>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            {display === "2" &&
              assignedMissions.map((mission) => {
                return (
                  <Grid item md={12} key={mission._id}>
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
                        任務內容: {mission.content.name}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        所屬班級: {mission.classroom.name}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        指派對象: {mission.assignee.userName}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        指派時間:{" "}
                        {moment(mission.createdAt).format("YYYY/MM/DD HH:mm")}
                      </Typography>

                      <Typography variant="h6" gutterBottom>
                        完成狀態:{" "}
                        {mission.is_complated
                          ? `學生已完成 ${moment(mission.complated_date).format(
                              "(YYYY/MM/DD HH:mm)"
                            )}`
                          : "學生尚未完成"}
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
                      {mission.content.type === "Exercise" &&
                        mission.is_complated &&
                        !mission.is_reviewed && (
                          <Box mt={3}>
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.menuButton}
                              onClick={() => {
                                navigate(`/missions/review/${mission._id}`);
                              }}
                            >
                              批閱任務
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
                              onClick={() => {
                                navigate(`/missions/result/${mission._id}`);
                              }}
                            >
                              檢視結果
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
      <Popup title="新增任務" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <MissionForm
          units={units}
          exercises={exercises}
          handleAddOrEdit={handleAdd}
        />
      </Popup>
    </>
  );
}
