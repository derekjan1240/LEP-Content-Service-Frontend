import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
  tab: {
    wordBreak: "keep-all",
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

function getTabsContent(data, classes) {
  return data.map((data, index) => {
    return (
      <Tab label={data.title} {...setProps(index)} className={classes.tab} />
    );
  });
}

function TagButtonGroup(props) {
  const classes = useStyles();
  return (
    <Box flexDirection="row">
      <Button
        variant="contained"
        color="secondary"
        onClick={() => props.setVideoCursor(0)}
        className={classes.tagButton}
      >
        Start
      </Button>
      {props.tags.map((tag) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.setVideoCursor(tag.time)}
            className={classes.tagButton}
          >
            {tag.title}
          </Button>
        );
      })}
    </Box>
  );
}

function ImageButton() {
  const classes = useStyles();
  return (
    <Card>
      <CardActionArea>
        <CardMedia className={classes.media} image="/ThemeEntryLogo.svg" />
        <CardContent>
          <Typography variant="h4" align="center">
            相關操作
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function ChapterTabPanel(props) {
  const classes = useStyles();
  return props.data.map((data, index) => {
    return (
      <TabPanel value={props.value} index={index} className={classes.tabPanel}>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={8}>
            <div className={classes.videoWrapper}>
              <VideoContent videoCursor={props.videoCursor} video={data} />
            </div>
          </Grid>
          <Grid item xs={12} xl={4}>
            <TagButtonGroup
              setVideoCursor={props.setVideoCursor}
              tags={data.tags}
            />
            <Box>
              <ImageButton />
              <ImageButton />
            </Box>
          </Grid>
          <Grid item xs={12} xl={12}>
            <Typography variant="h6">{data.description}</Typography>
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
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen={true}
    ></iframe>
  );
}

// 章節
function ChaptersTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [videoCursor, setVideoCursor] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setVideoCursor(0);
  };

  const fakeData = [
    {
      youtube_id: "e9Eds2Rc_x8",
      title: "CS50 Lecture 1 - C",
      description: `This is CS50, Harvard University's introduction to the intellectual enterprises of computer science and the art of programming. Demanding, but definitely doable. Social, but educational. A focused topic, but broadly applicable skills. CS50 is the quintessential Harvard course.`,
      tags: [
        {
          title: "C",
          time: 82,
        },
        {
          title: "CS50 Sandbox",
          time: 427,
        },
        {
          title: "hello.c",
          time: 533,
        },
        {
          title: "Compilation",
          time: 322,
        },
        {
          title: "Command-Line Arguments",
          time: 1188,
        },
        {
          title: "User Input",
          time: 1310,
        },
        {
          title: "get_string",
          time: 1373,
        },
        {
          title: "Variables",
          time: 1443,
        },
        {
          title: "printf",
          time: 1545,
        },
      ],
    },
    {
      youtube_id: "8PrOp9t0PyQ",
      title: "CS50 Lecture 2 - Arrays",
      description: `This is CS50, Harvard University's introduction to the intellectual enterprises of computer science and the art of programming. Demanding, but definitely doable. Social, but educational. A focused topic, but broadly applicable skills. CS50 is the quintessential Harvard course.`,
      tags: [
        {
          title: "Preprocessing",
          time: 390,
        },
        {
          title: "Null Terminator",
          time: 4288,
        },
      ],
    },
    {
      youtube_id: "fykrlqbV9wM",
      title: "CS50 Lecture 3 - Algorithms",
      description: `This is CS50, Harvard University's introduction to the intellectual enterprises of computer science and the art of programming. Demanding, but definitely doable. Social, but educational. A focused topic, but broadly applicable skills. CS50 is the quintessential Harvard course.`,
      tags: [
        {
          title: "Weeks 2 Recap",
          time: 82,
        },
        {
          title: "Algorithms Demo",
          time: 166,
        },
        {
          title: "Binary Search",
          time: 584,
        },
      ],
    },
  ];

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
        {getTabsContent(fakeData, classes)}
      </Tabs>
      <ChapterTabPanel
        data={fakeData}
        value={value}
        videoCursor={videoCursor}
        setVideoCursor={setVideoCursor}
      />
    </div>
  );
}

export default function Units() {
  let { video_id } = useParams();

  const classes = useStyles();

  return (
    <Paper className={classes.pageContent}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <Box mx={5}>
            <Typography gutterBottom variant="h5" component="h2">
              Video ID: {video_id}
            </Typography>
          </Box>
          <Box mx={5}>
            <Typography gutterBottom variant="h5" component="h2">
              <ChaptersTabs />
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
