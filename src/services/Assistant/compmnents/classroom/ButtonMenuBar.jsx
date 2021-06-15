import { Grid, Button, Box, makeStyles } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";

const infoTheme = createMuiTheme({
  palette: {
    primary: {
      main: cyan[600],
      contrastText: "#fff",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 16,
  },
}));

export default function ButtonMenuBar({
  classroom,
  setPopup,
  setOpenPopup,
  handleClassroomRemove,
  handleOnlineMeeting,
  handleRemoveOnlineMeeting,
  handleJoinOnlineMeeting,
}) {
  const classes = useStyles();

  return (
    <Grid item md={12}>
      <Box my={4}>
        {classroom.isManager && (
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
            {classroom.meetingLink ? (
              <Button
                variant="contained"
                color="secondary"
                className={classes.menuButton}
                onClick={handleRemoveOnlineMeeting}
              >
                關閉課堂視訊
              </Button>
            ) : (
              <ThemeProvider theme={infoTheme}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.menuButton}
                  onClick={handleOnlineMeeting}
                >
                  發起課堂視訊
                </Button>
              </ThemeProvider>
            )}
            <Button
              variant="contained"
              color="secondary"
              className={classes.menuButton}
              onClick={handleClassroomRemove}
            >
              解散班級
            </Button>
          </>
        )}
        {!classroom.isManager && (
          <>
            {classroom.meetingLink && (
              <ThemeProvider theme={infoTheme}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.menuButton}
                  onClick={handleJoinOnlineMeeting}
                >
                  加入課堂視訊
                </Button>
              </ThemeProvider>
            )}
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
  );
}
