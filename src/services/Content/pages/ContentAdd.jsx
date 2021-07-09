import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Paper, Button, makeStyles } from "@material-ui/core";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import PageHeader from "../../Utility/compmnents/PageHeader";
import OperatorMenu from "../../Utility/compmnents/OperatorMenu";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

export default function ContentAdd() {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);
  const handleRedisTest = () => {
    if (!userState.user) {
      return;
    }
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_ASSISTANT_SERVICE}/mission/student`,
      headers: {
        token: `${localStorage.jwt}`,
        user: `${userState.user._id}`,
      },
    })
      .then((result) => {
        console.log("Result(Redis):", result.data);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "查詢任務失敗!",
        });
      });
  };
  const handleNonRedisTest = () => {
    if (!userState.user) {
      return;
    }
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_ASSISTANT_SERVICE}/test/missions`,
      headers: {
        token: `${localStorage.jwt}`,
        user: `${userState.user._id}`,
      },
    })
      .then((result) => {
        console.log("Result(NonRedis):", result.data);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "查詢任務失敗!",
        });
      });
  };
  const classes = useStyles();
  return (
    <>
      <PageHeader
        title="內容系統"
        subTitle="新增課程內容"
        icon={<MenuBookIcon fontSize="large" />}
      />
      <OperatorMenu>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/content/stages");
          }}
        >
          回課程影片
        </Button>
      </OperatorMenu>
      <Paper className={classes.pageContent}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNonRedisTest}
          className={classes.button}
        >
          測試 API (NonRedis)
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRedisTest}
          className={classes.button}
        >
          測試 API (Redis)
        </Button>
      </Paper>
    </>
  );
}
