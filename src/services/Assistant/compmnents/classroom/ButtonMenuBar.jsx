import swal from "sweetalert2";
import { Grid, Button, Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 16,
  },
}));

export default function ButtonMenuBar({ setPopup, setOpenPopup, isManager }) {
  const classes = useStyles();

  const handleJoinMeet = () => {
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
              onClick={handleJoinMeet}
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
  );
}
