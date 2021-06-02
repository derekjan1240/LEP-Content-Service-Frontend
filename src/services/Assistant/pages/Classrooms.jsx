import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert2";
import axios from "axios";
import {
  Paper,
  Box,
  Grid,
  Button,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  makeStyles,
} from "@material-ui/core";

// Icon
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

// Components
import PageHeader from "../../Utility/compmnents/PageHeader";
import OperatorMenu from "../../Utility/compmnents/OperatorMenu";
import ClassroomForm from "../compmnents/classroom/ClassroomForm";
import Popup from "../../Utility/compmnents/Popup";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: 16,
  },
  media: {
    height: 140,
    margin: "15%",
    backgroundSize: "contain",
  },
  classRoomButton: {
    background: "aliceblue",
    padding: 16,
  },
}));

function EntryCard({ classroom }) {
  const userState = useSelector((state) => state.userState);

  const classes = useStyles();
  const navigate = useNavigate();

  const handleOnClick = (herf) => {
    navigate(herf);
  };

  return (
    <Card>
      <CardActionArea
        className={classes.classRoomButton}
        onClick={() => {
          handleOnClick(`/classroom/${classroom.id}`);
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item md={2}>
            <CardMedia className={classes.media} image="/Classroom.svg" />
          </Grid>
          <Grid item md={10}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                <b>{classroom.name}</b>
              </Typography>
              <Typography variant="h5" gutterBottom>
                班級教師: {userState.user.userName}
              </Typography>
              <hr />
              <Box component="div" whiteSpace="pre">
                <Typography variant="h6">{classroom.description}</Typography>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

export default function Classrooms() {
  const classes = useStyles();

  // 登入檢查
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }

    if (userState.user) {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_CONTENT_SERVICE}/classrooms`,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user.id}`,
        },
        params: {
          manager: userState.user.id,
        },
      })
        .then((result) => {
          console.log();
          setClassrooms(result.data);
        })
        .catch((err) => {
          console.error(err);
          swal.fire({
            icon: "error",
            title: "讀取班級列表失敗!",
          });
        });
    }
  }, [userState]);

  const [classrooms, setClassrooms] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {}, []);

  const handleAdd = (newClassroom, resetForm) => {
    resetForm();
    setOpenPopup(false);
    newClassroom.manager = userState.user.id;
    console.log("newClassroom:", newClassroom);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_CONTENT_SERVICE}/classrooms`,
      headers: {
        token: `${localStorage.jwt}`,
        user: `${userState.user.id}`,
      },
      data: {
        ...newClassroom,
        isAllowAdd: newClassroom.isAllowAdd === "1",
      },
      withCredentials: true,
    })
      .then((result) => {
        const clonedClassrooms = classrooms.slice(0);
        clonedClassrooms.push(result.data);
        setClassrooms(clonedClassrooms);
        swal.fire({
          icon: "success",
          title: `新增班級 ${result.data.name} 成功!`,
          width: 700,
        });
      })
      .catch((err) => {
        console.error(err);
        swal.fire({
          icon: "error",
          title: "新增班級失敗!",
        });
      });
  };

  return (
    <>
      <PageHeader
        title="班級系統"
        subTitle="班級列表"
        icon={<SupervisedUserCircleIcon fontSize="large" />}
      />
      <OperatorMenu>
        {(userState?.user?.role === "Admin" ||
          userState?.user?.role === "Teacher" ||
          userState?.user?.role === "Parent") && (
          <Button
            variant="contained"
            color="primary"
            className={classes.menuButton}
            onClick={() => {
              setOpenPopup(true);
            }}
          >
            建立班級
          </Button>
        )}
        {userState?.user?.role === "Student" && (
          <Button
            variant="contained"
            color="primary"
            className={classes.menuButton}
          >
            加入班級
          </Button>
        )}
      </OperatorMenu>
      {!userState.isChecking && (
        <Paper className={classes.pageContent}>
          <Grid container spacing={3}>
            {classrooms.map((classroom) => {
              return (
                <Grid item md={12} key={classroom.id}>
                  <EntryCard classroom={classroom} />
                </Grid>
              );
            })}
          </Grid>
          <Popup
            title="新增班級"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <ClassroomForm handleAddOrEdit={handleAdd} />
          </Popup>
        </Paper>
      )}
    </>
  );
}
