import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
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
        <CardMedia
          className={classes.media}
          image={`${process.env.PUBLIC_URL}ThemeEntryLogo.svg`}
        />
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
    {
      youtube_id: "lBcPPnl1pew",
      title: "万能青年旅店《冀西南林路行》",
      description: `章節一的相關介紹: 國民中學階段每節上課時間為45分鐘，學校須依據規範的各領域及彈性學習的學習節數進行課程規劃，各校可以視課程實施及學生學習進度需求，經學校課程發展委員會通過後，彈性調節每節分鐘數與年級、班級的組合。
      在符合相關規範與原則下，學校可彈性調整或重組領域學習節數，實施各種學習形式的跨領域統整課程，並可進行不同教師間的協同教學，此類跨領域統整課程最多可佔領域學習課程總節數五分之一。
      部分領域含數個科目，除了實施領域教學外，也可以在經學校課程發展委員會通過後，進行分科教學，學生可在不同年級修習安排不同科目，不必每個科目在每學期都修習。`,
      tags: [
        {
          title: "泥河",
          time: 84,
        },
        {
          title: "平等云雾",
          time: 433,
        },
        {
          title: "采石",
          time: 517,
        },
        {
          title: "河北墨麒麟",
          time: 1416,
        },
      ],
    },
    {
      youtube_id: "QQng1OScuco",
      title: "透明雜誌 - 時空裂縫",
      description: `章節二的相關介紹: 國民中學階段每節上課時間為45分鐘，學校須依據規範的各領域及彈性學習的學習節數進行課程規劃，各校可以視課程實施及學生學習進度需求，經學校課程發展委員會通過後，彈性調節每節分鐘數與年級、班級的組合。
      在符合相關規範與原則下，學校可彈性調整或重組領域學習節數，實施各種學習形式的跨領域統整課程，並可進行不同教師間的協同教學，此類跨領域統整課程最多可佔領域學習課程總節數五分之一。
      部分領域含數個科目，除了實施領域教學外，也可以在經學校課程發展委員會通過後，進行分科教學，學生可在不同年級修習安排不同科目，不必每個科目在每學期都修習。`,
      tags: [
        {
          title: "凌晨晚餐",
          time: 100,
        },
        {
          title: "時速160公里的吉他、貝斯和鼓",
          time: 625,
        },
        {
          title: "Young Heart Guitar",
          time: 2051,
        },
        {
          title: "透明雜誌FOREVER",
          time: 2336,
        },
      ],
    },
    {
      youtube_id: "O4jU1LWu_Mc",
      title: "一大片的風景",
      description: `盪在空中，台北獨立樂團，成軍於96年地下社會，前身為追麻雀吉他手賴Q、Digihai貝斯手沐謙與1976鼓手大師兄對於日本90年代樂團fishmans以及雷鬼、Dub等節奏音樂的喜愛而組成。
      盪在空中團員現為主唱&吉他手賴Q、貝斯手愛吹倫 (無政府/Taimaica Soundsystem)、吉他手陳顥 (88 balaz/表兒)、鼓手隆 (雀斑/花不拉屎)，96年至今參與各大小獨立音樂祭並定期在live house演出。
      盪在空中企圖在搖滾樂中加強對於黑人等節奏音樂的探索，音樂在正拍與反拍之間遊走，重視grooving與情緒的律動，主唱賴Q以台語老調吟唱新島國浪子之聲，企圖探索老調與新時代音樂之實驗性。
      99 年秋，盪在空中由音樂喜好者獨立出資，發行首發迷你專輯《一大片的風景》，至台灣首席藍調樂團賽璐璐的阿義錄音室錄製，由Green!eyes樂團首腦王昱辰錄音製作，並重金送至日本製作曾我部惠一、Audio Active等樂團之mastering studio做聲音後製，並於2010年秋天展開全島巡迴演出，誠摯歡迎音樂同好者到場一同共襄盛舉。`,
      tags: [],
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

export default function ContentVideoLayer(props) {
  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12}>
        <Box mx={5} mt={5}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.setPageLayer(1)}
          >
            回上一層
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box mx={5}>
          <Typography gutterBottom variant="h5" component="h2">
            <ChaptersTabs />
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
