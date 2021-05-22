import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert2";
import axios from "axios";
import { Paper, Grid, Button, Box, makeStyles } from "@material-ui/core";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

// Components
import PageHeader from "../../Utility/compmnents/PageHeader";
import OperatorMenu from "../../Utility/compmnents/OperatorMenu";
import ClassroomIntro from "../compmnents/classroom/ClassroomIntro";
import ButtonMenuBar from "../compmnents/classroom/ButtonMenuBar";
import StudentsTable from "../compmnents/classroom/StudentsTable";
import ClassroomForm from "../compmnents/classroom/ClassroomForm";
import GroupForm from "../compmnents/classroom/GroupForm";
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

// 假資料
const FAKE_STUDENT_LIST = [
  {
    id: "1",
    name: "王小明",
    age: 25,
    email: "abcd@test.com",
  },
  {
    id: "2",
    name: "李小明",
    age: 25,
    email: "ijkl@test.com",
  },
  {
    id: "3",
    name: "陳小明",
    age: 24,
    email: "efgh@test.com",
  },
  {
    id: "4",
    name: "黃小明",
    age: 21,
    email: "abcd@test.com",
  },
  {
    id: "5",
    name: "張小明",
    age: 20,
    email: "ijkl@test.com",
  },
  {
    id: "6",
    name: "呂小明",
    age: 29,
    email: "efgh@test.com",
  },
  {
    id: "7",
    name: "趙小明",
    age: 28,
    email: "efgh@test.com",
  },
  {
    id: "8",
    name: "林小明",
    age: 27,
    email: "efgh@test.com",
  },
  {
    id: "9",
    name: "褚小明",
    age: 26,
    email: "efgh@test.com",
  },
  {
    id: "10",
    name: "伍小明",
    age: 25,
    email: "bear@test.com",
  },
];
const FAKE_GROUP_DATA = [
  {
    id: "1",
    name: "黑組",
    memberSet: new Set(["8", "10"]),
  },
  {
    id: "2",
    name: "白組",
    memberSet: new Set(["3", "5"]),
  },
  {
    id: "3",
    name: "紅組",
    memberSet: new Set(["4", "6"]),
  },
];
const FAKE_CLASS_DATA = {
  id: "1",
  name: "向日葵班",
  manager: {
    id: "609c247d4099fa16842d9dba",
    userName: "Admin",
  },
  description: `這是關於向日葵班的基本介紹這是關於向日葵班的基本介紹這是關於向日葵班的基本介紹這是關於向日葵班的基本介紹這是關於向日葵班的基本介紹這是關於向日葵班的基本介紹這是關於向日葵班的基本介紹這是關於向日葵班的基本介紹這是關於向日葵班的基本介紹`,
  invitationCode: "ABCD1234",
  isAllowAdd: "1",
  studentList: FAKE_STUDENT_LIST,
  groupList: FAKE_GROUP_DATA,
};

export default function Classroom() {
  const { classroom_id } = useParams();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }
  }, [userState]);

  const [classroom, setClassroom] = useState({});
  const [openPopup, setOpenPopup] = useState(false);
  const [popup, setPopup] = useState({
    type: null,
    title: "",
  });

  useEffect(() => {
    // TODO: 打取得班級資料的 API
    // axios({
    //   method: "GET",
    //   url: `${process.env.REACT_APP_ASSISTANT_SERVICE}/classroom/${classroomId}`,
    //   headers: { Authorization: `Bearer ${localStorage.jwt}` },
    // })
    //   .then((res) => {
    //     console.log(res);
    //     setRecords(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setClassroom(FAKE_CLASS_DATA);
  }, []);

  useEffect(() => {
    console.log("classroom:", classroom);
  }, [classroom]);

  const handleNavigate = (herf) => {
    navigate(herf);
  };

  const handleClassroomEdit = (updatedClassroom, resetForm) => {
    console.log("updatedClassroom:", updatedClassroom);
    resetForm(updatedClassroom);
    setOpenPopup(false);
    setClassroom(updatedClassroom);
    swal.fire({
      icon: "success",
      title: "更新班級成功!",
    });
  };

  const handleGroupEdit = (newGroupList, resetForm) => {
    console.log(newGroupList);
    resetForm();
    setOpenPopup(false);
    setClassroom({
      ...classroom,
      groupList: newGroupList,
    });
    swal.fire({
      icon: "success",
      title: `更新組別成功!`,
    });
  };

  const isManager = () => {
    return userState?.user?.id === classroom.manager?.id;
  };

  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="班級系統"
        subTitle="班級資訊"
        icon={<SupervisedUserCircleIcon fontSize="large" />}
      />

      {!userState.isChecking && (
        <>
          <OperatorMenu>
            <Button
              variant="contained"
              color="primary"
              className={classes.menuButton}
              onClick={() => {
                handleNavigate("/classroom");
              }}
            >
              回班級列表
            </Button>
          </OperatorMenu>
          <Paper className={classes.pageContent}>
            <Grid container spacing={3}>
              <ClassroomIntro
                classroom={classroom}
                setPopup={setPopup}
                setOpenPopup={setOpenPopup}
                isManager={isManager()}
              />
              <ButtonMenuBar
                classroom={classroom}
                setPopup={setPopup}
                setOpenPopup={setOpenPopup}
                isManager={isManager()}
              />

              {/* 教師 > 學生列表 */}
              {isManager() && (
                <StudentsTable
                  groupList={classroom.groupList}
                  studentList={classroom.studentList}
                />
              )}
            </Grid>
          </Paper>
          <Popup
            title={popup.title}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            {popup.type === 0 && (
              <ClassroomForm
                classroomForEdit={classroom}
                handleAddOrEdit={handleClassroomEdit}
              />
            )}
            {popup.type === 1 && (
              <GroupForm
                classroom={classroom}
                setClassroom={setClassroom}
                handleGroupEdit={handleGroupEdit}
              />
            )}
          </Popup>
        </>
      )}
    </>
  );
}
