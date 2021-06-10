import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
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
  const [exercises, setExercises] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }

    if (userState.user) {
      // 取得任務清單
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_ASSISTANT_SERVICE}/mission/teacher`,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
      })
        .then((result) => {
          console.log("教師任務:", result.data);
          setMissions(result.data);
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

  const handleAdd = (newMission, resetForm) => {
    resetForm();
    setOpenPopup(false);

    console.log("新任務:", newMission);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_ASSISTANT_SERVICE}/mission`,
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
            {missions.map((mission) => {
              return (
                <Grid item md={12}>
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
