import React, { useState, useEffect } from "react";
import { Grid, Box, Button, Typography, makeStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import Controls from "../../Utility/compmnents/Controls/Controls";
import { useForm, Form } from "../../Utility/compmnents/UseForm";

const initialFValues = {
  id: 0,
  name: "",
  description: "",
  isAllowAdd: "1",
};

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2),
  },
  menuButton: {
    marginRight: 16,
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

export default function GroupForm({
  classroom,
  studentsList,
  setStudentsList,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const classes = useStyles();

  const INITIAL_GROUP_DATA = {
    withoutGrouped: new Set(studentsList.map((student) => student.id)),
    grouped: [],
  };

  const [groupData, setGroupData] = useState(INITIAL_GROUP_DATA);
  const [studentSelected, setStudentSelected] = useState(new Set());

  // Components
  const studentButton = (student) => {
    return (
      <Button
        key={student.id}
        variant="outlined"
        color="primary"
        className={`${classes.menuButton} ${
          studentSelected.has(student.id) && classes.selectdeButton
        }`}
        value={student.id}
        onClick={() => {
          handleStudentSelected(student.id);
        }}
      >
        {student.name}
      </Button>
    );
  };

  const groupeds = () => {
    return groupData.grouped.map((group) => {
      return studentsList.filter((student) => group.has(student.id));
    });
  };

  // Functions
  const handleStudentSelected = (studentId) => {
    const clonedSet = new Set(studentSelected);
    clonedSet.has(studentId)
      ? clonedSet.delete(studentId)
      : clonedSet.add(studentId);
    setStudentSelected(clonedSet);
  };

  const handleGrouped = () => {
    if (!studentSelected.size) {
      return;
    }

    const clonedSet = new Set(studentSelected);
    const cloneGrouped = groupData.grouped.slice(0);
    const withoutGroupedSet = new Set(
      [...groupData.withoutGrouped].filter(
        (student) => !studentSelected.has(student)
      )
    );
    cloneGrouped.push(clonedSet);
    setGroupData({
      withoutGrouped: withoutGroupedSet,
      grouped: cloneGrouped,
    });
    setStudentSelected(new Set());
  };

  const removeGroup = (index) => {
    const cloneGrouped = groupData.grouped.slice(0);
    const withoutGroupedSet = new Set([
      ...groupData.withoutGrouped,
      ...groupData.grouped[index],
    ]);
    cloneGrouped.splice(index, 1);

    setGroupData({
      withoutGrouped: withoutGroupedSet,
      grouped: cloneGrouped,
    });
  };

  const resetForm = () => {
    setGroupData(INITIAL_GROUP_DATA);
    setStudentSelected(new Set());
  };

  useEffect(() => {
    console.log(groupData);
  }, [groupData]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}></Grid>
        </Grid>
        <Grid item xs={12}>
          <Box m={3}>
            <Button variant="contained" color="primary" onClick={handleGrouped}>
              組成組別
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box m={3} p={2} className={classes.border}>
            <Typography variant="h6" gutterBottom>
              無組別
            </Typography>
            {studentsList
              .filter((student) => groupData.withoutGrouped.has(student.id))
              .map((student) => {
                return studentButton(student);
              })}
          </Box>
        </Grid>
        <hr />
        {groupeds().map((group, index) => {
          return (
            <Grid item xs={12}>
              <Box m={3} p={2} className={classes.border}>
                <div style={{ display: "flex" }}>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ flexGrow: 1 }}
                  >
                    第 {index + 1} 組
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

                {group.map((student) => {
                  return (
                    <Button
                      key={student.id}
                      variant="contained"
                      color="primary"
                      className={classes.menuButton}
                    >
                      {student.name}
                    </Button>
                  );
                })}
              </Box>
            </Grid>
          );
        })}
        <Grid item xs={12}>
          <div className={classes.buttonWrapper}>
            <Controls.Button type="submit" text="儲存" />
            <Controls.Button text="清除" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Form>
    </>
  );
}
