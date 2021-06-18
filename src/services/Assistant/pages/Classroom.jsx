import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import {
  Paper,
  Grid,
  Box,
  Button,
  Tabs,
  Tab,
  Typography,
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

  const sortGroupList = (list) => {
    const compare = (a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    };
    return list.sort(compare);
  };

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }

    if (userState.user) {
      // 取得班級資料
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
            studentGroups: sortGroupList(
              result.data.studentGroups.map((group) => {
                return {
                  ...group,
                  members: group.members.split(",").map((memberId) => {
                    return result.data.studentList.filter(
                      (student) => student._id === memberId
                    )[0];
                  }),
                };
              })
            ),
          });
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "讀取班級失敗!",
          });
        });

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
          setTeacherMissions(result.data);
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "查詢任務失敗!",
          });
        });

      // 取得學生任務資料
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_ASSISTANT_SERVICE}/mission`,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
        params: {
          classroom: classroom_id,
        },
      })
        .then((result) => {
          console.log("學生任務:", result.data);
          setStudentMissions(result.data);
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "讀取學生任務失敗!",
          });
        });
    }
  }, [userState]);

  const [classroom, setClassroom] = useState({});
  const [teachermissions, setTeacherMissions] = useState([]);
  const [studentmissions, setStudentMissions] = useState([]);
  const [tabsValue, setTabsValue] = useState("table");
  const [openPopup, setOpenPopup] = useState(false);
  const [popup, setPopup] = useState({
    type: null,
    title: "",
  });

  useEffect(() => {
    console.log("班級資料更新:", classroom);
  }, [classroom]);

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

  const handleNavigate = (herf) => {
    navigate(herf);
  };

  const handleTabChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  const handleClassroomRemove = () => {
    Swal.fire({
      icon: "warning",
      title: "是否確定要解散該班級?",
      text: "解散後將無法復原",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "確定",
      cancelButtonText: "離開",
      confirmButtonColor: "#c0392b",
      width: 700,
      input: "text",
      inputPlaceholder: "請輸入班級名稱",
      inputValidator: (value) => {
        if (value !== classroom.name) {
          return "請確實輸入欲刪除的班級名稱!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // 解散班級
        handleNavigate("/classroom");
      }
    });
  };

  const handleClassroomEdit = (updatedClassroom, resetForm) => {
    console.log("updatedClassroom:", updatedClassroom);
    resetForm(updatedClassroom);
    setOpenPopup(false);
    setClassroom(updatedClassroom);
    Swal.fire({
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
        Swal.fire({
          icon: "success",
          title: `更新組別成功!`,
          width: 700,
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "編輯組別失敗!",
        });
      });
    resetForm();
    setOpenPopup(false);
  };

  const handleStudentRemove = (removeStudent) => {
    Swal.fire({
      icon: "warning",
      title: `確定要將該 ${removeStudent.userName} 移出班級嗎?`,
      confirmButtonText: "確定",
      cancelButtonText: "離開",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#c0392b",
      width: 700,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(removeStudent);
      }
    });
  };

  const handlePersonalMissionAssign = (student) => {
    console.log(teachermissions, student);
    const inputOption = {
      units: {},
      exercises: {},
    };
    teachermissions
      .filter((mission) => mission.type === "Video")
      .forEach((mission) => {
        inputOption.units[mission._id] = mission.name;
      });
    teachermissions
      .filter((mission) => mission.type === "Exercise")
      .forEach((mission) => {
        inputOption.exercises[mission._id] = mission.name;
      });

    Swal.fire({
      title: `請選擇欲指派給 ${student.userName} 的任務`,
      input: "select",
      inputOptions: {
        影片任務: inputOption.units,
        習題任務: inputOption.exercises,
      },
      inputLabel: "指派任務",
      confirmButtonText: "指派",
      inputPlaceholder: "請選擇一項任務",
      inputValidator: (value) => {
        if (!value) {
          return "請至少選擇一項任務!";
        }
      },
      width: 1200,
      allowOutsideClick: false,
      showCancelButton: false,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_ASSISTANT_SERVICE}/mission`,
          headers: {
            token: `${localStorage.jwt}`,
            user: `${userState.user._id}`,
          },
          data: {
            classroom: classroom.id,
            mission: result.value,
            assignee: student._id,
          },
          withCredentials: true,
        })
          .then((result) => {
            console.log("result:", result.data);
            Swal.fire({
              icon: "success",
              title: `指派單人任務成功!`,
              width: 700,
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "指派單人任務失敗!",
            });
          });
      }
    });
  };

  const handleOnlineMeeting = () => {
    window.open("http://meet.google.com/new", "_blank").focus();
    Swal.fire({
      title: "請貼上視訊邀請連結",
      text: "貼上後班級學生將可以在班級中取得連接並加入視訊!",
      inputPlaceholder: "https://meet.google.com/XXX-XXXX-XXX",
      confirmButtonText: "送出",
      cancelButtonText: "取消",
      allowOutsideClick: false,
      showCloseButton: true,
      showCancelButton: true,
      input: "text",
      width: 700,
      inputValidator: (value) => {
        if (!value) {
          return "請確實貼上視訊邀請連結!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_CONTENT_SERVICE}/classrooms/meetingLink`,
          headers: {
            token: `${localStorage.jwt}`,
            user: `${userState.user._id}`,
          },
          data: {
            classroom: classroom.id,
            meetingLink: result.value,
          },
          withCredentials: true,
        })
          .then((result) => {
            console.log(result.data);
            setClassroom({
              ...classroom,
              meetingLink: result.data.meetingLink,
            });
            Swal.fire({
              title: "成功通知班級學生!",
              icon: "success",
              width: 700,
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              title: "新增課堂視訊連結失敗",
              icon: "error",
              width: 700,
            });
          });
      }
    });
  };

  const handleRemoveOnlineMeeting = () => {
    Swal.fire({
      title: "是否確定移除課堂視訊",
      text: `學生將無法看見目前的連結 ${classroom.meetingLink}`,
      icon: "question",
      confirmButtonText: "移除視訊連結",
      width: 700,
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_CONTENT_SERVICE}/classrooms/meetingLink`,
          headers: {
            token: `${localStorage.jwt}`,
            user: `${userState.user._id}`,
          },
          data: {
            classroom: classroom.id,
            meetingLink: null,
          },
          withCredentials: true,
        })
          .then((result) => {
            setClassroom({
              ...classroom,
              meetingLink: result.data.meetingLink,
            });
            Swal.fire({
              title: "成功移除課堂視訊連結!",
              icon: "success",
              width: 700,
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              title: "移除課堂視訊連結失敗",
              icon: "error",
              width: 700,
            });
          });
      }
    });
  };

  const handleJoinOnlineMeeting = () => {
    const link = classroom?.meetingLink;
    if (!link) {
      Swal.fire({
        title: "目前無課堂視訊可參與!",
        icon: "warning",
        width: 700,
      });
      return;
    }
    window.open(link, "_blank").focus();
  };

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
                handleOnlineMeeting={handleOnlineMeeting}
                handleRemoveOnlineMeeting={handleRemoveOnlineMeeting}
                handleJoinOnlineMeeting={handleJoinOnlineMeeting}
                handleClassroomRemove={handleClassroomRemove}
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
                    {userState.user._id === classroom.manager._id && (
                      <Tab
                        value="missions"
                        label="班級任務"
                        wrapped
                        {...a11yProps("missions")}
                        className={classes.tab}
                      />
                    )}
                  </Tabs>
                </Paper>
                <TabPanel
                  value={tabsValue}
                  index="table"
                  className={classes.tabPanel}
                >
                  <StudentsTable
                    user={userState.user}
                    groupList={classroom.studentGroups}
                    studentList={classroom.studentList}
                    handleStudentRemove={handleStudentRemove}
                    isManager={classroom.isManager}
                    handlePersonalMissionAssign={handlePersonalMissionAssign}
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
                <TabPanel
                  value={tabsValue}
                  index="missions"
                  className={classes.tabPanel}
                >
                  {studentmissions.map((mission) => {
                    return (
                      <>
                        <Typography variant="h6" gutterBottom>
                          任務: {mission.content.name}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          學生: {mission.assignee.userName}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          完成狀態:{" "}
                          {mission.is_complated
                            ? `學生已完成 ${moment(
                                mission.complated_date
                              ).format("(YYYY/MM/DD HH:mm)")}`
                            : "學生尚未完成"}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          批閱狀態:{" "}
                          {mission.content.type === "Video"
                            ? "不需批閱"
                            : mission.is_reviewed
                            ? `教師已批閱 ${moment(
                                mission.reviewed_date
                              ).format("(YYYY/MM/DD HH:mm)")}`
                            : "教師尚未批閱"}
                        </Typography>
                        <hr />
                      </>
                    );
                  })}
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
                studentmissions={studentmissions}
              />
            )}
          </Popup>
        </>
      )}
    </>
  );
}
