import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
  AppBar,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import AppBreadcrumbs from "../../AppBreadcrumbs";
// 暫時使用假資料
import { FAKE_GRADE_DATA } from "./FakeContentData";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`grade-content-tabpanel-${index}`}
      aria-labelledby={`grade-content-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `grade-content-${index}`,
    "aria-controls": `grade-content-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

function GradeContentTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="GradeContentTabs"
        className={classes.tabs}
      >
        {props.gradeData.map((grade, index) => {
          return (
            <Tab label={grade.title} {...a11yProps(index)} key={grade.id} />
          );
        })}
      </Tabs>
      {props.gradeData.map((grade, index) => {
        return (
          <TabPanel value={value} index={index} key={grade.id}>
            Item {index}
          </TabPanel>
        );
      })}
    </div>
  );
}

//---
export default function ContentLecture() {
  const { stage_id } = useParams();
  const [gradeData, setGradeData] = useState([]);
  useEffect(() => {
    // 取得 Grade 資料 ...
    setGradeData(FAKE_GRADE_DATA);
  }, []);
  const breadcrumbs = [
    {
      title: "Stages",
      href: "/content/stages",
    },
    {
      title: "Current > Stage:" + stage_id,
      href: null,
    },
  ];
  return (
    <Box p={6}>
      <GradeContentTabs gradeData={gradeData} />
    </Box>
  );
}
