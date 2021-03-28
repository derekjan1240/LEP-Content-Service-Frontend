import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Box, Tabs, Tab, Button } from "@material-ui/core";
// 暫時使用假資料
import { FAKE_GRADE_DATA } from "./FakeContentData";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

function a11yProps(index, type) {
  return {
    id: `${type}-content-${index}`,
    "aria-controls": `${type}-content-tabpanel-${index}`,
  };
}

function SubjectPanel(props) {
  const { children, value, subject, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== subject.id}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === subject.id && <Box p={3}>{children}</Box>}
    </div>
  );
}

SubjectPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  subject: PropTypes.object.isRequired,
};

function GradeContent(props) {
  const { subjects } = props;
  const navigate = useNavigate();
  const handleNavigate = (herf) => {
    navigate(herf);
  };
  const [selectedSubject, setSelectedSubject] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedSubject(newValue);
  };

  return (
    <Box>
      <Tabs
        value={selectedSubject}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {subjects.map((subject, index) => {
          return (
            <Tab
              value={subject.id}
              label={subject.title}
              {...a11yProps(index, "subject")}
              key={subject.id}
            />
          );
        })}
      </Tabs>
      {subjects.map((subject, index) => {
        return (
          <SubjectPanel
            value={selectedSubject}
            subject={subject}
            index={index}
            key={subject.id}
          >
            {/* 暫時使用假章節 */}
            <Box p={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNavigate("/content/units/1")}
              >
                章節 1
              </Button>
            </Box>
            <Box p={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNavigate("/content/units/2")}
              >
                章節 2
              </Button>
            </Box>
            <Box p={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNavigate("/content/units/3")}
              >
                章節 3
              </Button>
            </Box>
          </SubjectPanel>
        );
      })}
    </Box>
  );
}

function GradePanel(props) {
  const { children, value, grade, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== grade.id}
      id={`grade-content-tabpanel-${index}`}
      aria-labelledby={`grade-content-tab-${index}`}
      {...other}
    >
      {value === grade.id && <Box p={3}>{children}</Box>}
    </div>
  );
}

GradePanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  grade: PropTypes.object.isRequired,
};

function GradeContentTabs(props) {
  const { gradeData } = props;
  const classes = useStyles();
  const [selectedGrade, setSelectedGrade] = useState(0);

  const handleChange = (event, newValue) => {
    console.log(event, newValue);
    setSelectedGrade(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedGrade}
        onChange={handleChange}
        aria-label="GradeContentTabs"
        className={classes.tabs}
      >
        <Tab value={0} label={"年級"} />
        {gradeData.map((grade, index) => {
          return (
            <Tab
              value={grade.id}
              label={grade.title}
              {...a11yProps(grade.title, "grade")}
              key={grade.id}
            />
          );
        })}
      </Tabs>
      <div
        role="tabpanel"
        hidden={selectedGrade !== 0}
        id={`grade-content-tabpanel-intro`}
        aria-labelledby={`grade-content-tab-intro`}
      >
        {selectedGrade === 0 && (
          <Box p={3}>
            <Typography variant="h5">我是介紹文字</Typography>
          </Box>
        )}
      </div>
      {gradeData.map((grade, index) => {
        return (
          <GradePanel
            value={selectedGrade}
            grade={grade}
            index={index}
            key={grade.id}
          >
            <GradeContent subjects={grade.subjects} key={grade.id} />
          </GradePanel>
        );
      })}
    </div>
  );
}

export default function Lectures() {
  const { stage_id } = useParams();
  const [gradeData, setGradeData] = useState([]);

  useEffect(() => {
    console.log(stage_id);
    // stage_id: elementary, secondary, highschool
    // 由 stage 拉 grades & subjects
    setGradeData(FAKE_GRADE_DATA);
  }, []);

  const classes = useStyles();

  return (
    <Paper className={classes.pageContent}>
      <GradeContentTabs gradeData={gradeData} />
    </Paper>
  );
}
