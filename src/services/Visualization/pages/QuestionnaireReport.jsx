import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import { Bar, Pie } from "react-chartjs-2";
import {
  Paper,
  Grid,
  Box,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

import BarChartIcon from "@material-ui/icons/BarChart";

import PageHeader from "../../Utility/compmnents/PageHeader";
import OperatorMenu from "../../Utility/compmnents/OperatorMenu";

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

export default function QuestionnaireReport() {
  // 登入檢查
  const { questionnaire_result_id } = useParams();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userState);

  const [questionnaireResult, setQuestionnaireResult] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }

    if (userState.user) {
      // 取得問卷
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_VISUALIZATION_SERVICE}/questionnaire/report/${questionnaire_result_id}`,
        headers: {
          token: `${localStorage.jwt}`,
          user: `${userState.user._id}`,
        },
      })
        .then((result) => {
          console.log("問卷報告資料:", result.data);
          setData(result.data);
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

  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="資料視覺化系統"
        subTitle="問卷分析報告"
        icon={<BarChartIcon fontSize="large" />}
      />
      <OperatorMenu>
        <Button
          variant="contained"
          color="primary"
          className={classes.menuButton}
          onClick={() => {
            navigate("/visualization");
          }}
        >
          回資料視覺化系統
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.menuButton}
          onClick={() => {
            navigate("/questionnaire");
          }}
        >
          回問卷系統
        </Button>
      </OperatorMenu>
      {!userState.isChecking && data && (
        <Paper className={classes.pageContent}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Typography variant="h4" gutterBottom>
                分析報告-{data.questionnaireResult.questionnaire.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                指派教師: {data.questionnaireResult.assigner.userName}
              </Typography>
              <Typography variant="h6" gutterBottom>
                答題學生: {data.questionnaireResult.assignee.userName}
              </Typography>
              <Typography variant="h6" gutterBottom>
                作答時間:{" "}
                {moment(data.questionnaireResult.complated_date).format(
                  "YYYY/MM/DD HH:mm"
                )}
              </Typography>
              <Typography variant="h6" gutterBottom>
                總題數:{" "}
                {data.questionnaireResult.questionnaire.questions.length} 題
              </Typography>
              <Box display="flex">
                <Typography variant="h6" gutterBottom>
                  分析結果:
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ marginLeft: 10 }}
                >
                  Activist: {data.performance.Activist}
                  <br />
                  Reflector: {data.performance.Reflector}
                  <br />
                  Theorist: {data.performance.Theorist}
                  <br />
                  Pragmatist: {data.performance.Pragmatist}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={12}>
              <hr />
            </Grid>
            {data.verticalBarDataset && (
              <Grid item md={4}>
                <Pie
                  data={data.verticalBarDataset}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text: "問卷作答統計",
                      },
                    },
                  }}
                />
              </Grid>
            )}
            {data.pieDataset && (
              <Grid item md={4}>
                <Bar
                  data={data.pieDataset}
                  options={{
                    indexAxis: "y",
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "right",
                      },
                      title: {
                        display: true,
                        text: "作答類型統計",
                      },
                    },
                  }}
                  style={{ height: 500 }}
                />
              </Grid>
            )}
            <Grid item md={12}>
              <hr />
            </Grid>
            <Grid item md={12}>
              <Box p={3}>
                <Typography variant="h6" gutterBottom>
                  <b>ACTIVISTS</b> want practical tasks and very little theory.
                  They learn best from activities where:
                </Typography>
                <ul>
                  <li>New experiences are emphasised;</li>
                  <li>
                    The focus is on the present and on doing such activities as
                    games, problem solving, simulations;
                  </li>
                  <li>There is a lot of action and excitement;</li>
                  <li>They can lead and be in the limelight;</li>
                  <li>
                    Ideas are generated without any concern about practical
                    constraints;
                  </li>
                  <li>They have to respond to a challenge and take risks;</li>
                  <li>The central focus is on team problem-solving.</li>
                </ul>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box p={3}>
                <Typography variant="h6" gutterBottom>
                  <b>THEORISTS</b> want handouts, something to take away and
                  study. They learn best from activities where:
                </Typography>
                <ul>
                  <li>
                    The learning forms a part of a conceptual whole, such as a
                    model for a theory;
                  </li>
                  <li>
                    There is time to explore the interrelationship amongst
                    elements;
                  </li>
                  <li>
                    They can explore the theory and methodology underlying the
                    subject under investigation;
                  </li>
                  <li>They are intellectually stretched;</li>
                  <li>
                    There is a clear and obvious purpose to the activities;
                  </li>
                  <li>There is a reliance on rationality and logic;</li>
                  <li>
                    They can analyse situations and then generalise their
                    findings;
                  </li>
                  <li>They are asked to understand complex situations.</li>
                </ul>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box p={3}>
                <Typography variant="h6" gutterBottom>
                  <b>REFLECTORS</b> want lots of breaks to go off and read and
                  discuss. They learn best from activities where:
                </Typography>
                <ul>
                  <li>There are opportunities to observe and consider;</li>
                  <li>
                    There is a strong element of passive involvement such as
                    listening to a speaker or watching a video;
                  </li>
                  <li>
                    There is time to think before having to act or contribute;
                  </li>
                  <li>
                    There is opportunity for research and problems can be probed
                    in some depth;
                  </li>
                  <li>They can review what was happening;</li>
                  <li>
                    They are asked to produce reports that carefully analyse a
                    situation or issue;
                  </li>
                  <li>
                    There is interaction with others without any risks of strong
                    feelings coming to the fore;
                  </li>
                  <li>
                    They can finalise a view without being put under pressure.
                  </li>
                </ul>
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box p={3}>
                <Typography variant="h6" gutterBottom>
                  <b>PRAGMATISTS</b> want shortcuts and tips. They learn best
                  from activities where:
                </Typography>
                <ul>
                  <li>
                    There is a clear link back to some job-related problem;
                  </li>
                  <li>
                    Material is directed towards techniques that make their work
                    easier;
                  </li>
                  <li>They are able to practice what they have learned;</li>
                  <li>They can relate to a successful role model;</li>
                  <li>
                    There are many opportunities to implement what has been
                    learned;
                  </li>
                  <li>
                    The relevance is obvious and the learning is easily
                    transferred to their jobs;
                  </li>
                  <li>
                    What is done is practical such as drawing up action plans or
                    trialing techniques or procedures.
                  </li>
                </ul>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
}
