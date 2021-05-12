import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  CircularProgress,
  Box,
  Tabs,
  Tab,
  Button,
} from "@material-ui/core";
import axios from "axios";
// 暫時使用假資料
// import { FAKE_GRADE_DATA } from "./FakeContentData";

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
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

SubjectPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  subject: PropTypes.object.isRequired,
};

function LecturesContent(props) {
  const navigate = useNavigate();
  const handleNavigate = (herf) => {
    navigate(herf);
  };
  const { selectedGrade, selectedSubject } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [lectures, setLectures] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_CONTENT_SERVICE}/lectures`,
      params: {
        grade: selectedGrade,
        subject: selectedSubject,
      },
    }).then((result) => {
      setLectures(result.data);
      setIsLoading(false);
    });
  }, []);

  if (!isLoading) {
    if (lectures.length) {
      return lectures.map((lecture) => {
        console.log(lecture);
        return (
          <Box key={lecture.id} p={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleNavigate(`/content/units/${lecture.id}`)}
            >
              {lecture.title}
            </Button>
          </Box>
        );
      });
    } else {
      return <h1>本科目暫時無章節</h1>;
    }
  } else {
    return <CircularProgress />;
  }
}

function GradeContent(props) {
  props.subjects.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  });

  const { grade, subjects } = props;
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
              value={index}
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
            <LecturesContent
              selectedGrade={grade.id}
              selectedSubject={subjects[selectedSubject].id}
            />
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
      hidden={value !== index}
      id={`grade-content-tabpanel-${index}`}
      aria-labelledby={`grade-content-tab-${index}`}
      {...other}
    >
      {<Box p={3}>{children}</Box>}
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
        {gradeData.map((grade, index) => {
          return (
            <Tab
              value={index}
              label={grade.title}
              {...a11yProps(index, "grade")}
              key={grade.id}
            />
          );
        })}
      </Tabs>
      {gradeData.map((grade, index) => {
        return (
          <GradePanel
            value={selectedGrade}
            grade={grade}
            index={index}
            key={grade.id}
          >
            <GradeContent
              grade={grade}
              subjects={grade.subjects}
              key={grade.id}
            />
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
    axios({
      method: "get",
      url: `${process.env.REACT_APP_CONTENT_SERVICE}/stages/${stage_id}`,
    }).then((result) => {
      result.data.grades.sort((a, b) => {
        if (a.order < b.order) {
          return -1;
        }
        if (a.order > b.order) {
          return 1;
        }
        return 0;
      });
      setGradeData(result.data.grades);
    });
  }, []);

  const classes = useStyles();

  return (
    <Paper className={classes.pageContent}>
      <GradeContentTabs gradeData={gradeData} />
    </Paper>
  );
}
