import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  FormControl,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import Controls from "../../../Utility/compmnents/Controls/Controls";
import { useForm, Form } from "../../../Utility/compmnents/UseForm";

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2),
  },
  menuButton: {
    margin: 8,
    whiteSpace: "nowrap",
  },
  selectdeButton: {
    background: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      background: theme.palette.primary.main,
      color: "#fff",
    },
  },
  border: {
    borderRadius: 5,
    background: "#f1f2f6",
  },
}));

const initialFValues = {
  groupName: "",
};

const INIT_STATE = {
  missionSelect: "",
  groupingNumber: 1,
  error: "",
};

export default function GroupForm({
  classroom,
  handleGroupEdit,
  studentmissions,
}) {
  const classes = useStyles();

  const [initValue, setInitValue] = useState(null);
  const [groupData, setGroupData] = useState(null);
  const [studentSelected, setStudentSelected] = useState(new Set());
  const [state, setState] = useState(INIT_STATE);
  const [filterMissions, setFilterMissions] = useState([]);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("groupName" in fieldValues)
      if (fieldValues.groupName.length === 0) {
        temp.groupName = "組名為必填項目";
      } else if (fieldValues.groupName.length > 10) {
        temp.groupName = "組名不得超過 10 個字";
      } else if (
        groupData.groupList.filter(
          (group) => group.name === fieldValues.groupName
        ).length !== 0
      ) {
        temp.groupName = "組名不得重複";
      } else {
        temp.groupName = "";
      }
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  useEffect(() => {
    const allStudentSet = new Set(
      classroom.studentList.map((student) => student._id)
    );
    const groupedSet = classroom.studentGroups.map((group) =>
      group.members.map((member) => member._id)
    );
    const groupedFlatSet = new Set(groupedSet.flat());
    const withoutGroupedSet = new Set(
      [...allStudentSet].filter((x) => !groupedFlatSet.has(x))
    );
    setInitValue({
      allStudentSet,
      groupedSet,
      groupedFlatSet,
      withoutGroupedSet,
    });
  }, []);

  useEffect(() => {
    if (initValue) {
      setGroupData({
        withoutGrouped: initValue.withoutGroupedSet,
        groupList: classroom.studentGroups,
      });
    }
  }, [initValue]);

  useEffect(() => {
    const filterMissions = [];
    const tempSet = new Set([]);
    studentmissions.forEach((mission) => {
      if (mission.is_reviewed) {
        if (!tempSet.has(mission.content._id)) {
          filterMissions.push(mission);
        }
        tempSet.add(mission.content._id);
      }
    });
    setFilterMissions(filterMissions);
  }, [studentmissions]);

  /* Components */
  // 學生按鈕
  const studentButton = (student) => {
    return (
      <Button
        key={student._id}
        variant="outlined"
        color="primary"
        className={`${classes.menuButton} ${
          studentSelected.has(student._id) && classes.selectdeButton
        }`}
        value={student._id}
        onClick={() => {
          handleStudentSelected(student._id);
        }}
      >
        {student.userName}
      </Button>
    );
  };
  // 組別區塊
  const GroupStudentButton = ({ studentId }) => {
    const student = classroom.studentList.filter(
      (student) => student._id === studentId
    )[0];
    return (
      <Button
        variant="contained"
        color="primary"
        className={classes.menuButton}
      >
        {student.userName}
      </Button>
    );
  };
  const Groups = () => {
    return groupData.groupList.map((group, index) => {
      return (
        <Grid item xs={12} key={group.id}>
          <Box m={3} p={2} className={classes.border}>
            <div style={{ display: "flex" }}>
              <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                {group.name}
              </Typography>
              <Controls.ActionButton
                color="secondary"
                onClick={() => {
                  removeGroup(index);
                }}
              >
                <CloseIcon />
              </Controls.ActionButton>
            </div>

            {Array.from(group.members).map((member) => {
              return (
                <GroupStudentButton studentId={member._id} key={member._id} />
              );
            })}
          </Box>
        </Grid>
      );
    });
  };

  /* Functions */
  // 處理被選擇學生
  const handleStudentSelected = (studentId) => {
    const clonedSet = new Set(studentSelected);
    clonedSet.has(studentId)
      ? clonedSet.delete(studentId)
      : clonedSet.add(studentId);
    setStudentSelected(clonedSet);
  };
  // 處理組成組別
  const handleGrouped = () => {
    if (!studentSelected.size || !validate()) {
      return;
    }

    const clonedSet = new Set(studentSelected);
    const newGroupList = groupData.groupList.slice(0);
    const newWithoutGroupedSet = new Set(
      [...groupData.withoutGrouped].filter(
        (student) => !studentSelected.has(student)
      )
    );
    newGroupList.push({
      id: `${new Date().getTime()}`,
      name: values.groupName,
      members: classroom.studentList.filter((student) =>
        clonedSet.has(student._id)
      ),
    });

    setGroupData({
      withoutGrouped: newWithoutGroupedSet,
      groupList: newGroupList,
    });
    // Reset 被選取學生清單
    setStudentSelected(new Set());
    // Reset 組名
    resetForm();
  };
  // 解散特定組別
  const removeGroup = (index) => {
    const newGroupList = groupData.groupList.slice(0);
    const newWithoutGroupedSet = groupData.withoutGrouped.size
      ? new Set([
          ...groupData.withoutGrouped,
          ...groupData.groupList[index].members.map((student) => student._id),
        ])
      : new Set([
          ...groupData.groupList[index].members.map((student) => student._id),
        ]);
    newGroupList.splice(index, 1);
    setGroupData({
      withoutGrouped: newWithoutGroupedSet,
      groupList: newGroupList,
    });
  };
  // 組別初始化
  const resetAll = () => {
    resetForm();
    setGroupData({
      withoutGrouped: initValue.withoutGroupedSet,
      groupList: classroom.studentGroups,
    });
    setStudentSelected(new Set());
    setState(INIT_STATE);
  };
  // 儲存分組
  const handleSubmit = (e) => {
    e.preventDefault();
    handleGroupEdit(groupData.groupList, resetAll);
  };

  const handleAIGrouping = (type) => {
    console.log(state);

    const allStudentSet = new Set(
      classroom.studentList.map((student) => student._id)
    );

    const compare = (a, b) => {
      if (a.scores < b.scores) {
        return 1;
      }
      if (a.scores > b.scores) {
        return -1;
      }
      return 0;
    };
    // 只分組前測批閱完成的學生
    const datas = studentmissions
      .filter(
        (mission) =>
          mission.content._id === state.missionSelect && mission.is_reviewed
      )
      .map((mission) => {
        return {
          mission: mission.content,
          student: mission.assignee,
          scores: mission.review.total.scores,
        };
      })
      .sort(compare);

    const groupStudentSet = new Set(datas.map((data) => data.student._id));
    const withoutGroupedSet = new Set(
      [...allStudentSet].filter((x) => !groupStudentSet.has(x))
    );

    if (state.groupingNumber > datas.length) {
      setState({
        ...state,
        error: `⚠ 組別數量 (${state.groupingNumber}) 超過已完成此前測的學生數 (${datas.length})，請調整組別數或改用其他前測!`,
      });
      return;
    }

    let numberOfPerGroup = Math.floor(datas.length / state.groupingNumber);
    // 餘數用於判斷幾組要多塞一人
    let remainder = datas.length % state.groupingNumber;
    let groups = [];
    let tempArr = [];
    if (type === 1) {
      console.log("同質性分組", groupData);
      for (let index = 0; index < state.groupingNumber; index++) {
        index < remainder
          ? tempArr.push(datas.splice(0, numberOfPerGroup + 1))
          : tempArr.push(datas.splice(0, numberOfPerGroup));
      }
    } else {
      console.log("異質性分組", groupData);
      for (let index = 0; index < state.groupingNumber; index++) {
        tempArr.push([]);
      }

      datas.forEach((data, index) => {
        console.log("tA:", tempArr);
        if (Math.floor(index / state.groupingNumber) % 2 === 0) {
          // 奇數輪
          tempArr[index % state.groupingNumber].push(datas[index]);
        } else {
          // 偶數輪
          tempArr[
            state.groupingNumber - 1 - (index % state.groupingNumber)
          ].push(datas[index]);
        }
      });
    }

    tempArr.forEach((datas, index) => {
      groups.push({
        id: `${new Date().getTime()}`,
        members: datas.map((data) => data.student),
        name: `第 ${index + 1} 組`,
      });
    });

    setGroupData({
      groupList: groups,
      withoutGrouped: withoutGroupedSet,
    });

    setStudentSelected(new Set());
    setState(INIT_STATE);
  };

  const handleChange = (event) => {
    let value = event.target.value;
    if (event.target.name === "groupingNumber") {
      value =
        value > classroom.studentList.length
          ? classroom.studentList.length
          : value;
      value = value < 1 ? 1 : value;
    }
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              m={3}
              mb={0}
            >
              <FormControl
                className={classes.formControl}
                style={{ maxWidth: "50%" }}
              >
                <InputLabel id="demo-simple-select-label">前測</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="missionSelect"
                  value={state.missionSelect}
                  onChange={handleChange}
                >
                  {filterMissions.map((mission) => {
                    return (
                      <MenuItem value={mission.content._id}>
                        {mission.content.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl
                className={classes.formControl}
                style={{ maxWidth: "20%" }}
              >
                <TextField
                  required
                  id="grouping-number"
                  name="groupingNumber"
                  value={state.groupingNumber}
                  onChange={handleChange}
                  type="number"
                  label="組別數量"
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                className={classes.menuButton}
                onClick={() => {
                  handleAIGrouping(1);
                }}
              >
                同質性分組
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.menuButton}
                onClick={() => {
                  handleAIGrouping(2);
                }}
              >
                異質性分組
              </Button>
            </Box>
          </Grid>
          {state.error && (
            <Grid item xs={12}>
              <Box px={4}>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  style={{ color: "#f83245" }}
                >
                  {state.error}
                </Typography>
              </Box>
            </Grid>
          )}
          <hr />
          <Grid item xs={12}>
            <Box display="flex" flexDirection="row" alignItems="center" m={3}>
              <Controls.Input
                name="groupName"
                label="新組名"
                variant="outlined"
                defaultValue="請輸入新組名"
                value={values.groupName}
                onChange={handleInputChange}
                error={errors.groupName}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleGrouped}
                className={classes.menuButton}
              >
                組成組別
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box m={3} p={2} className={classes.border}>
              <Typography variant="h6" gutterBottom>
                無組別
              </Typography>
              {groupData &&
                classroom.studentList
                  .filter((student) =>
                    groupData.withoutGrouped.has(student._id)
                  )
                  .map((student) => {
                    return studentButton(student);
                  })}
            </Box>
          </Grid>
          <hr />
          {groupData && <Groups />}
          <Grid item xs={12}>
            <div className={classes.buttonWrapper}>
              <Controls.Button type="submit" text="儲存" />
              <Controls.Button text="清除" color="default" onClick={resetAll} />
            </div>
          </Grid>
        </Grid>
      </Form>
    </>
  );
}
