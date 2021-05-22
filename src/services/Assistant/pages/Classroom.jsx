import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";
import swal from "sweetalert2";
import axios from "axios";
import {
  Paper,
  Grid,
  Button,
  IconButton,
  Typography,
  Box,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
} from "@material-ui/core";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

// Icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

// Components
import PageHeader from "../../Utility/compmnents/PageHeader";
import OperatorMenu from "../../Utility/compmnents/OperatorMenu";
import ClassroomForm from "../compmnents/ClassroomForm";
import GroupForm from "../compmnents/GroupForm";
import useTable from "../../Utility/compmnents/UseTable";
import Popup from "../../Utility/compmnents/Popup";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  menuButton: {
    marginRight: 16,
  },
}));

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

const headCells = [
  { id: "fullName", label: "姓名" },
  { id: "age", label: "年齡" },
  { id: "email", label: "Email" },
  { id: "group", label: "組別" },
  { id: "actions", label: "操作", disableSorting: true },
];

/* Components */
const ButtonMenu = ({ classroom, setPopup, setOpenPopup, isManager }) => {
  const classes = useStyles();

  const handleJoinmeet = () => {
    swal.fire({
      title: "加入課堂視訊",
      input: "text",
      inputLabel: "輸入課堂視訊代號",
      showCancelButton: true,
      confirmButtonText: "加入",
      cancelButtonText: "取消",
      inputValidator: (value) => {
        if (!value) {
          return "請確實輸入課堂視訊代號!";
        }
      },
    });
  };

  return (
    <>
      <Grid item md={12}>
        <Box mt={4}>
          {isManager && (
            <>
              <Button
                variant="contained"
                color="primary"
                className={classes.menuButton}
                onClick={() => {
                  setPopup({
                    title: "學生分組",
                    type: 1,
                  });
                  setOpenPopup(true);
                }}
              >
                學生分組
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.menuButton}
              >
                發布公告
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.menuButton}
                target="_blank"
                href={`http://meet.google.com/new`}
              >
                發起課堂視訊
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.menuButton}
              >
                解散班級
              </Button>
            </>
          )}
          {!isManager && (
            <>
              <Button
                variant="contained"
                color="primary"
                className={classes.menuButton}
                onClick={handleJoinmeet}
                // href={`https://meet.google.com/lookup/${classroom.invitationCode}`}
              >
                加入課堂視訊
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.menuButton}
              >
                退出班級
              </Button>
            </>
          )}
        </Box>
      </Grid>
    </>
  );
};
const ClassInfo = ({ classroom, setPopup, setOpenPopup, isManager }) => {
  const classes = useStyles();
  return (
    <>
      <Grid item md={10}>
        <Box display="flex" alignItems="center">
          <Typography variant="h3">{classroom.name}</Typography>
          {isManager && (
            <IconButton
              aria-label="edit"
              className={classes.margin}
              onClick={() => {
                setPopup({
                  title: `編輯班級 - ${classroom.name}`,
                  type: 0,
                });
                setOpenPopup(true);
              }}
            >
              <EditIcon fontSize="large" />
            </IconButton>
          )}
        </Box>
        <Box mt={3}>
          <Typography variant="h5">
            班級教師: {classroom.manager?.userName}
          </Typography>
        </Box>
        {isManager && (
          <Box mt={2}>
            <Typography variant="h5">
              是否開放學生加入班級: {classroom.isAllowAdd ? "是" : "否"}
            </Typography>
          </Box>
        )}
        <Box mt={4}>
          <Typography variant="h6">{classroom.description}</Typography>
        </Box>
      </Grid>
      <Grid item md={2}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <QRCode value="https://www.youtube.com/" size={120} />
          <Box p={2}>
            <Typography>邀請碼: {classroom.invitationCode}</Typography>
          </Box>
        </Box>
      </Grid>
    </>
  );
};
const StudentsTable = ({ groupList, studentList }) => {
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  useEffect(() => {
    setRecords(studentList || []);
  }, [studentList]);

  const handleRemoveStudent = () => {
    swal
      .fire({
        icon: "warning",
        title: "確定要將該學生移出班級嗎?",
        confirmButtonText: "確定",
        cancelButtonText: "離開",
        showCancelButton: true,
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swal.fire({
            icon: "success",
            title: "學生移出班級成功",
          });
        }
      });
  };

  const classes = useStyles();

  const test = (student) => {
    const group = groupList.filter((group) => group.memberSet.has(student.id));
    if (group.length) {
      return group[0].name;
    } else {
      return "無";
    }
  };

  return (
    <Paper>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.age}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{test(student)}</TableCell>
              <TableCell style={{ width: "30%" }}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<PlaylistAddIcon />}
                >
                  指派任務
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<AssignmentIcon />}
                >
                  學習紀錄
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={handleRemoveStudent}
                >
                  移除學生
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </Paper>
  );
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
    // setStudentList(FAKE_CLASS_DATA.studentList);
    // setGroupList(FAKE_CLASS_DATA.groupList);
  }, []);

  useEffect(() => {
    console.log("classroom:", classroom);
  }, [classroom]);

  const handleOnClick = (herf) => {
    navigate(herf);
  };

  const handleClassroomEdit = (data, resetForm) => {
    console.log(data);
    resetForm();
    setOpenPopup(false);
    swal.fire({
      icon: "success",
      title: `更新班級 ${data.name} 成功!`,
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
                handleOnClick("/classroom");
              }}
            >
              回班級列表
            </Button>
          </OperatorMenu>
          <Paper className={classes.pageContent}>
            <Grid container spacing={3}>
              <ClassInfo
                classroom={classroom}
                setPopup={setPopup}
                setOpenPopup={setOpenPopup}
                isManager={isManager()}
              />
              <ButtonMenu
                classroom={classroom}
                setPopup={setPopup}
                setOpenPopup={setOpenPopup}
                isManager={isManager()}
              />

              {/* 教師 > 學生列表 */}
              {isManager() && (
                <Grid item md={12}>
                  <StudentsTable
                    groupList={classroom.groupList}
                    studentList={classroom.studentList}
                  />
                </Grid>
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
