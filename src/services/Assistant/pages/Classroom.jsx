import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert2";
import axios from "axios";
import {
  Paper,
  Grid,
  Box,
  Button,
  Tabs,
  Tab,
  makeStyles,
} from "@material-ui/core";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

// Components
import PageHeader from "../../Utility/compmnents/PageHeader";
import OperatorMenu from "../../Utility/compmnents/OperatorMenu";
import ClassroomIntro from "../compmnents/classroom/ClassroomIntro";
import ButtonMenuBar from "../compmnents/classroom/ButtonMenuBar";
import StudentsTable from "../compmnents/classroom/StudentsTable";
import StudentGroups from "../compmnents/classroom/StudentGroups";
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
  tabsWrapper: {
    background: "#2d3436",
  },
  tab: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 2,
  },
  tabPanel: {
    border: "0.5px solid #dfe6e9",
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
    name: "A",
    memberSet: new Set(["8", "10"]),
  },
  {
    id: "2",
    name: "B",
    memberSet: new Set(["3", "5"]),
  },
  {
    id: "3",
    name: "C",
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
  const [tabsValue, setTabsValue] = useState("table");
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
    console.log("班級資料更新:", classroom);
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
      width: 700,
    });
  };

  const handleGroupEdit = (newGroupList, resetForm) => {
    console.log("newGroupList:", newGroupList);
    resetForm();
    setOpenPopup(false);
    setClassroom({
      ...classroom,
      groupList: newGroupList,
    });
    swal.fire({
      icon: "success",
      title: `更新組別成功!`,
      width: 700,
    });
  };

  const handleStudentRemove = (removeStudent) => {
    swal
      .fire({
        icon: "warning",
        title: `確定要將該 ${removeStudent.name} 移出班級嗎?`,
        confirmButtonText: "確定",
        cancelButtonText: "離開",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: "#c0392b",
        width: 700,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const newStudentList = classroom.studentList.filter(
            (student) => student.id !== removeStudent.id
          );
          setClassroom({
            ...classroom,
            studentList: newStudentList,
          });
          swal.fire({
            icon: "success",
            title: `${removeStudent.name} 移出班級成功`,
            width: 700,
          });
        }
      });
  };

  const handleTabChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      "aria-controls": `wrapped-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  }

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
              <Grid item md={12}>
                <Paper square className={classes.tabsWrapper}>
                  <Tabs
                    value={tabsValue}
                    indicatorColor="secondary"
                    textColor="inherit"
                    onChange={handleTabChange}
                    aria-label="操作選單"
                  >
                    <Tab
                      value="table"
                      label="班級學生"
                      wrapped
                      {...a11yProps("table")}
                      className={classes.tab}
                    />
                    <Tab
                      value="groups"
                      label="班級組別"
                      wrapped
                      {...a11yProps("groups")}
                      className={classes.tab}
                    />
                  </Tabs>
                </Paper>
                <TabPanel
                  value={tabsValue}
                  index="table"
                  className={classes.tabPanel}
                >
                  <StudentsTable
                    groupList={classroom.groupList}
                    studentList={classroom.studentList}
                    handleStudentRemove={handleStudentRemove}
                    isManager={isManager()}
                  />
                </TabPanel>
                <TabPanel
                  value={tabsValue}
                  index="groups"
                  className={classes.tabPanel}
                >
                  <StudentGroups
                    groupList={classroom.groupList}
                    studentList={classroom.studentList}
                    isManager={isManager()}
                  />
                </TabPanel>
              </Grid>
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
