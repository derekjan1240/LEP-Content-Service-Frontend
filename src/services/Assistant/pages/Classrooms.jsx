import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert2";
import axios from "axios";
import {
  Paper,
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

const FAKE_CLASS_LIST = [
  {
    id: "1",
    name: "向日葵班",
    manager: {
      id: "609c247d4099fa16842d9dba",
      userName: "Admin",
    },
    description: "這是關於向日葵班的基本介紹",
    invitationCode: "ABCD1234",
    isAllowAdd: true,
    studentList: [],
    groupList: [],
  },
  {
    id: "2",
    name: "玫瑰班",
    manager: {
      id: "222222222",
      userName: "王小明",
    },
    description: "這是關於玫瑰班的基本介紹",
    invitationCode: "ABCD4321",
    isAllowAdd: true,
    studentList: [],
    groupList: [],
  },
  {
    id: "3",
    name: "櫻花班",
    manager: {
      id: "33333333",
      userName: "李大明",
    },
    description: "這是關於櫻花班的基本介紹",
    invitationCode: "ABCD1324",
    isAllowAdd: false,
    studentList: [],
    groupList: [],
  },
];

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
              <Typography variant="h4" align="center" gutterBottom>
                {classroom.name}
              </Typography>
              <Typography variant="h5" align="center">
                班級教師: {classroom.manager.userName}
              </Typography>
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
  }, [userState]);

  const [classrooms, setClassrooms] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    // TODO: 打 API 取得班級資料
    setClassrooms(FAKE_CLASS_LIST);
  }, []);

  const handleAdd = (newClassroom, resetForm) => {
    console.log("newClassroom:", newClassroom);
    resetForm();
    setOpenPopup(false);
    newClassroom.manager = userState.user;
    newClassroom.invitationCode = "後端吐回來";
    classrooms.push(newClassroom);
    swal.fire({
      icon: "success",
      title: `新增班級 ${newClassroom.name} 成功!`,
      width: 700,
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
                <Grid item md={6} key={classroom.id}>
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
