import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
    padding: 10,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    wordBreak: "keep-all",
    margin: "0 10px",
    fontSize: 16,
  },
  tabPanel: {
    width: "100%",
  },
  videoWrapper: {
    position: "relative",
    paddingTop: "56.25%",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  tagButton: {
    margin: 10,
  },
  media: {
    height: 140,
    margin: 30,
    backgroundSize: "contain",
  },
}));

function setProps(index) {
  return {
    id: `subject-tab-${index}`,
    "aria-controls": `subject-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`subject-tabpanel-${index}`}
      aria-labelledby={`subject-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function getTabsContent(units, classes) {
  return units.map((unit, index) => {
    return (
      <Tab
        key={unit.id}
        label={unit.title}
        {...setProps(index)}
        className={classes.tab}
      />
    );
  });
}

function TagButtonGroup({ tags, setVideoCursor }) {
  const classes = useStyles();
  return (
    <Box flexDirection="row">
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setVideoCursor(0)}
        className={classes.tagButton}
      >
        回起始點
      </Button>
      {tags
        .sort((a, b) => {
          if (a.time < b.time) {
            return -1;
          }
          if (a.time > b.time) {
            return 1;
          }
          return 0;
        })
        .map((tag) => {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setVideoCursor(tag.time)}
              className={classes.tagButton}
              key={tag.id}
            >
              {tag.title}
            </Button>
          );
        })}
    </Box>
  );
}

function ImageButton({ title }) {
  const classes = useStyles();
  return (
    <Card style={{ background: "aliceblue" }}>
      <CardActionArea>
        <CardMedia className={classes.media} image="/Test.svg" />
        <CardContent>
          <Typography variant="h4" align="center">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function ChapterTabPanel({ units, value, videoCursor, setVideoCursor }) {
  const classes = useStyles();
  return units.map((unit, index) => {
    return (
      <TabPanel
        value={value}
        index={index}
        className={classes.tabPanel}
        key={unit.id}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} xl={8}>
            <div className={classes.videoWrapper}>
              <VideoContent videoCursor={videoCursor} video={unit} />
            </div>
          </Grid>
          <Grid item xs={12} xl={4}>
            <TagButtonGroup setVideoCursor={setVideoCursor} tags={unit.tags} />
            <Box py={2}>
              <ImageButton title="單元練習卷" />
            </Box>
          </Grid>
          <Grid item xs={12} xl={12}>
            <Box p={3}>
              <Typography variant="h6">{unit.description}</Typography>
            </Box>
          </Grid>
        </Grid>
      </TabPanel>
    );
  });
}

function VideoContent(props) {
  const classes = useStyles();
  return (
    <iframe
      className={classes.video}
      title="This is a unique title"
      width="100%"
      height="100%"
      src={
        "https://www.youtube-nocookie.com/embed/" +
        props.video.youtube_id +
        "?autoplay=1&start=" +
        props.videoCursor
      }
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen={true}
    ></iframe>
  );
}

// 章節
function ChaptersTabs({ units, value, setValue, videoCursor, setVideoCursor }) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setVideoCursor(0);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="章節影片選單"
        className={classes.tabs}
      >
        {getTabsContent(units, classes)}
      </Tabs>
      <ChapterTabPanel
        units={units}
        value={value}
        videoCursor={videoCursor}
        setVideoCursor={setVideoCursor}
      />
    </div>
  );
}

export default function Units() {
  const { lecture_id } = useParams();
  const { state } = useLocation();
  const classes = useStyles();

  const [lecture, setLecture] = useState({});
  const [units, setUnits] = useState([]);
  const [value, setValue] = useState(0);
  const [videoCursor, setVideoCursor] = useState(0);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_CONTENT_SERVICE}/lectures/${lecture_id}`,
    }).then((result) => {
      setLecture(result.data);
      setUnits(
        result.data.units.sort((a, b) => {
          if (a.order < b.order) {
            return -1;
          }
          if (a.order > b.order) {
            return 1;
          }
          return 0;
        })
      );
    });
  }, []);

  useEffect(() => {
    // 設定初始單元影片選擇
    if (units.length && state) {
      setValue(
        units
          .map((e) => {
            return e.id;
          })
          .indexOf(state.unit)
      );
      setVideoCursor(state?.tag || 0);
    }
  }, [units, state]);

  return (
    <Paper className={classes.pageContent}>
      <Grid container spacing={1} justify="center">
        <Grid item xs={12}>
          <Box p={3}>
            <Typography gutterBottom variant="h4" component="h4">
              {lecture.title}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <ChaptersTabs
              units={units}
              value={value}
              setValue={setValue}
              videoCursor={videoCursor}
              setVideoCursor={setVideoCursor}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
