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

export default function StudentGroups({ groupList, isManager }) {
  const GroupStudentButton = ({ student }) => {
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

  const classes = useStyles();

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
              {isManager && (
                <>
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
                </>
              )}
              <Box mt={2}>
                {group.members.map((student) => (
                  <GroupStudentButton student={student} />
                ))}
              </Box>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}
