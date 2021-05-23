import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { Grid, Button, Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 16,
  },
}));

export default function ButtonMenuBar({
  classroom,
  setPopup,
  setOpenPopup,
  isManager,
}) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleJoinMeet = () => {
    swal.fire({
      title: "加入課堂視訊",
      input: "text",
      inputLabel: "輸入課堂視訊代號",
      showCancelButton: true,
      confirmButtonText: "加入",
      cancelButtonText: "取消",
      width: 700,
      inputValidator: (value) => {
        if (!value) {
          return "請確實輸入課堂視訊代號!";
        }
      },
    });
  };

  const handleRemoveClassroom = () => {
    swal
      .fire({
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
      })
      .then((result) => {
        if (result.isConfirmed) {
          // 解散班級
          navigate("/classroom");
        }
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
              onClick={handleRemoveClassroom}
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
