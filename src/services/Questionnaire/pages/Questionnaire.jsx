import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { Paper, Grid, Box, Button, makeStyles } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import AssignmentIcon from "@material-ui/icons/Assignment";

import PageHeader from "../../Utility/compmnents/PageHeader";
import OperatorMenu from "../../Utility/compmnents/OperatorMenu";
import QuestionnaireContent from "../compmnents/QuestionnaireContent";

import teal from "@material-ui/core/colors/teal";

const infoTheme = createMuiTheme({
  palette: {
    primary: {
      main: teal[600],
      contrastText: "#fff",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: 16,
  },
  questionnaireCard: {
    borderBottom: "1px dashed #636e72",
  },
}));

export default function Questionnaire() {
  // 登入檢查
  let [searchParams, setSearchParams] = useSearchParams();
  const { questionnaire_id } = useParams();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  const [questionnaire, setQuestionnaire] = useState(null);
  const [questionnaireResult, setQuestionnaireResult] = useState(null);
  const [checked, setChecked] = useState(new Set());
  const [isComplated, setIsComplated] = useState(false);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }

    if (userState.user) {
      const url =
        searchParams.get("preview") === "true"
          ? `${process.env.REACT_APP_QUESTIONNAIRE_SERVICE}/questionnaires/${questionnaire_id}`
          : `${process.env.REACT_APP_QUESTIONNAIRE_SERVICE}/questionnaires/result/${questionnaire_id}`;

      // 取得問卷
      axios({
        method: "GET",
        url: url,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
      })
        .then((result) => {
          console.log("問卷:", result.data);
          if (searchParams.get("preview") === "true") {
            setQuestionnaire(result.data);
          } else {
            setQuestionnaire(result.data.questionnaire);
            setQuestionnaireResult(result.data);
            if (result.data.is_complated) {
              setIsComplated(true);
              setChecked(new Set(result.data.answers));
            }
          }
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "查詢問卷失敗!",
          });
        });
    }
  }, [userState]);

  const handleQuestionnaireFinish = () => {
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_QUESTIONNAIRE_SERVICE}/questionnaires/result/${questionnaireResult._id}`,
      headers: {
        token: `${localStorage.jwt}`,
        user: `${userState.user._id}`,
      },
      data: {
        answers: [...checked],
      },
      withCredentials: true,
    })
      .then((result) => {
        console.log("result:", result.data);
        Swal.fire({
          icon: "success",
          title: `問卷儲存成功!`,
          width: 700,
        }).then(() => {
          navigate("/questionnaire/student");
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "問卷儲存失敗!",
          width: 700,
        });
      });
  };

  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="問卷系統"
        subTitle="填寫問卷"
        icon={<AssignmentIcon fontSize="large" />}
      />
      <OperatorMenu>
        <Button
          variant="contained"
          color="primary"
          className={classes.menuButton}
          onClick={() => {
            navigate("/questionnaire");
          }}
        >
          回問卷管理
        </Button>
        {isComplated && (
          <ThemeProvider theme={infoTheme}>
            <Button
              variant="contained"
              color="primary"
              className={classes.menuButton}
              onClick={() => {}}
            >
              查看分析報告
            </Button>
          </ThemeProvider>
        )}
      </OperatorMenu>
      {!userState.isChecking && (
        <Paper className={classes.pageContent}>
          <Grid container spacing={3}>
            <QuestionnaireContent
              questionnaire={questionnaire}
              checked={checked}
              setChecked={setChecked}
              isComplated={isComplated}
            />
            {questionnaireResult && !questionnaireResult.is_complated && (
              <Grid item md={12}>
                <Box p={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleQuestionnaireFinish}
                  >
                    完成問卷
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Paper>
      )}
    </>
  );
}
