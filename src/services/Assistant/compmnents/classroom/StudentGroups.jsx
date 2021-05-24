import React, { useState, useEffect } from "react";
import { Grid, Box, Button, Typography, makeStyles } from "@material-ui/core";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2),
  },
  menuButton: {
    marginRight: 8,
  },
  group: {
    background: "#f1f2f6",
    borderRadius: 5,
  },
}));

export default function StudentGroups({ groupList, studentList, isManager }) {
  const GroupStudentButton = ({ studentId }) => {
    const student = studentList.filter(
      (student) => student.id === studentId
    )[0];
    return (
      <Button
        variant="contained"
        color="primary"
        className={classes.menuButton}
      >
        {student.name}
      </Button>
    );
  };

  const classes = useStyles();

  useEffect(() => {
    console.log(groupList);
  }, [groupList]);

  return (
    <Grid container spacing={3}>
      {groupList.map((group) => {
        return (
          <Grid item md={4}>
            <Box className={classes.group} p={3}>
              <Box fontWeight="fontWeightBold">
                <Typography variant="h5" gutterBottom>
                  {group.name}
                </Typography>
              </Box>
              <hr />
              <Box p={2}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<PlaylistAddIcon />}
                >
                  指派組別任務
                </Button>
              </Box>
              <hr />
              <Box mt={2}>
                {Array.from(group.memberSet).map((memberId) => (
                  <GroupStudentButton studentId={memberId} />
                ))}
              </Box>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}
