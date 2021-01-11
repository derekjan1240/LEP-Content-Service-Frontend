import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import QuestionnaireTable from "./QuestionnaireTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
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
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    fontSize: 20,
    background: "#f0932b",
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fakeData = {
    system: [
      {
        id: 1,
        title: "Kolb 學習風格量表_01",
        description: `這裡是問卷的基本描述 ...`,
        rate: 4.5,
      },
      {
        id: 2,
        title: "Kolb 學習風格量表_02",
        description: `這裡是問卷的基本描述 ...`,
        rate: 4.4,
      },
      {
        id: 3,
        title: "Kolb 學習風格量表_03",
        description: `這裡是問卷的基本描述 ...`,
        rate: 4.3,
      },
      {
        id: 4,
        title: "Kolb 學習風格量表_04",
        description: `這裡是問卷的基本描述 ...`,
        rate: 4.2,
      },
      {
        id: 5,
        title: "Kolb 學習風格量表_05",
        description: `這裡是問卷的基本描述 ...`,
        rate: 4.1,
      },
      {
        id: 6,
        title: "Kolb 學習風格量表_06",
        description: `這裡是問卷的基本描述 ...`,
        rate: 4,
      },
    ],
    custom: [
      {
        id: 1,
        title: "Kolb 學習風格量表_自訂_01",
        description: `這裡是問卷的基本描述 ...`,
        rate: 4.5,
        author: "Bot",
      },
      {
        id: 2,
        title: "Kolb 學習風格量表_自訂_02",
        description: `這裡是問卷的基本描述 ...`,
        rate: 4.4,
        author: "Bot",
      },
      {
        id: 3,
        title: "Kolb 學習風格量表_自訂_03",
        description: `這裡是問卷的基本描述 ...`,
        rate: 4.3,
        author: "Bot",
      },
    ],
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab
            className={classes.tab}
            label="學習風格量表"
            {...a11yProps(0)}
          />
          <LinkTab
            className={classes.tab}
            label="學習興趣量表"
            {...a11yProps(1)}
          />
          <LinkTab className={classes.tab} label="自訂量表" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom>
            用於探索學生特有的學習偏好與方式，便於教師設計更適合學生之學習課程，來提供學生在學習中具有選擇的機會，並更專注、投入於學習之中。
          </Typography>
        </Box>
        <hr />
        <QuestionnaireTable data={fakeData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom>
            用於探索學生對特定學科知識探索之傾向與動機，評估學生的學習興趣藉此設計出吸引學生之學習主題，激發學生主動學習的機會。
          </Typography>
        </Box>
        <hr />
        <QuestionnaireTable data={fakeData} />
        {/* STEM 興趣量表 */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box p={3}>
          <Typography variant="h5" gutterBottom>
            教師自行設計之問卷，用於評估學生之特性，方便教師設計差異化教學之課程內容。
          </Typography>
        </Box>
        <hr />
        {/* 自訂量表 */}
      </TabPanel>
    </div>
  );
}
