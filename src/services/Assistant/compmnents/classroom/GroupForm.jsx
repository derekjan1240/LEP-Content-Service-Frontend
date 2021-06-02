import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Box, Button, Typography, makeStyles } from "@material-ui/core";
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

export default function GroupForm({ classroom, handleGroupEdit }) {
  const classes = useStyles();

  const [initValue, setInitValue] = useState(null);
  const [groupData, setGroupData] = useState(null);
  const [studentSelected, setStudentSelected] = useState(new Set());
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
    const groupedSet = classroom.studentGroups.map((group) => group.memberSet);
    const groupedFlatSet = new Set(
      classroom.studentGroups
        .map((group) => group.memberSet)
        .map((set) => {
          return Array.from(set);
        })
        .flat()
    );
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

            {Array.from(group.memberSet).map((memberId) => {
              return <GroupStudentButton studentId={memberId} key={memberId} />;
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
      memberSet: clonedSet,
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
    const newWithoutGroupedSet = new Set([
      ...groupData.withoutGrouped,
      ...groupData.groupList[index].memberSet,
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
  };
  // 儲存分組
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit:", groupData);
    handleGroupEdit(groupData.groupList, resetAll);
    // setClassroom({
    //   ...classroom,
    //   groupList: groupData.groupList,
    // });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="row" alignItems="center" px={3}>
            <Button
              variant="contained"
              color="primary"
              className={classes.menuButton}
            >
              同質性分組
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.menuButton}
            >
              異質性分組
            </Button>
          </Box>
        </Grid>
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
                .filter((student) => groupData.withoutGrouped.has(student._id))
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
      </Form>
    </>
  );
}
