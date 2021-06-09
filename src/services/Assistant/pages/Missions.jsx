import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { Paper, Grid, Button, makeStyles } from "@material-ui/core";
import FlagIcon from "@material-ui/icons/Flag";

import PageHeader from "../../Utility/compmnents/PageHeader";
import OperatorMenu from "../../Utility/compmnents/OperatorMenu";
import MissionForm from "../compmnents/mission/MissionForm";
import Popup from "../../Utility/compmnents/Popup";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: 16,
  },
}));

export default function Missions() {
  // 登入檢查
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  const [exercises, setExercises] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }

    if (userState.user) {
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

    // axios({
    //   method: "POST",
    //   url: `${process.env.REACT_APP_CONTENT_SERVICE}/missions`,
    //   headers: {
    //     token: `${localStorage.jwt}`,
    //     user: `${userState.user._id}`,
    //   },
    //   data: newMission,
    //   withCredentials: true,
    // })
    //   .then((result) => {
    //     console.log(result.data)
    //     Swal.fire({
    //       icon: "success",
    //       title: `新增任務 ${result.data.name} 成功!`,
    //       width: 700,
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     Swal.fire({
    //       icon: "error",
    //       title: "新增任務失敗!",
    //     });
    //   });
  };

  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="任務系統"
        subTitle="subTitle"
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
            <Grid item md={12}></Grid>
            <Grid item md={12}></Grid>
            <Grid item md={12}></Grid>
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
