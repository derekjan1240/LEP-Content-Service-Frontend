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

export default function Classroom() {
  const { classroom_id } = useParams();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }

    if (userState.user) {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_CONTENT_SERVICE}/classrooms/${classroom_id}`,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
      })
        .then((result) => {
          setClassroom({
            ...result.data,
            // 帶入學生資料
            studentGroups: result.data.studentGroups.map((group) => {
              return {
                ...group,
                members: group.members.split(",").map((memberId) => {
                  return result.data.studentList.filter(
                    (student) => student._id === memberId
                  )[0];
                }),
              };
            }),
          });
        })
        .catch((err) => {
          console.error(err);
          swal.fire({
            icon: "error",
            title: "讀取班級失敗!",
          });
        });
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
    console.log(newGroupList);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_CONTENT_SERVICE}/classrooms/create/groups`,
      headers: {
        token: `${localStorage.jwt}`,
        user: `${userState.user._id}`,
      },
      data: {
        classroomId: classroom.id,
        groups: newGroupList.map((group) => {
          return {
            ...group,
            classroomId: classroom.id,
            members: group.members.map((member) => member._id).join(","),
          };
        }),
      },
      withCredentials: true,
    })
      .then((result) => {
        setClassroom({
          ...classroom,
          studentGroups: newGroupList,
        });
        swal.fire({
          icon: "success",
          title: `更新組別成功!`,
          width: 700,
        });
      })
      .catch((err) => {
        console.error(err);
        swal.fire({
          icon: "error",
          title: "編輯組別失敗!",
        });
      });
    resetForm();
    setOpenPopup(false);
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

  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="班級系統"
        subTitle="班級資訊"
        icon={<SupervisedUserCircleIcon fontSize="large" />}
      />

      {!userState.isChecking && Object.keys(classroom).length > 0 && (
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
              />

              <ButtonMenuBar
                classroom={classroom}
                setPopup={setPopup}
                setOpenPopup={setOpenPopup}
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
                    groupList={classroom.studentGroups}
                    studentList={classroom.studentList}
                    handleStudentRemove={handleStudentRemove}
                    isManager={classroom.isManager}
                  />
                </TabPanel>
                <TabPanel
                  value={tabsValue}
                  index="groups"
                  className={classes.tabPanel}
                >
                  <StudentGroups
                    groupList={classroom.studentGroups}
                    isManager={classroom.isManager}
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
                handleGroupEdit={handleGroupEdit}
              />
            )}
          </Popup>
        </>
      )}
    </>
  );
}
