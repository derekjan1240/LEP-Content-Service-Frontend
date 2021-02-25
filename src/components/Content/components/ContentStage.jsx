import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles({
  media: {
    height: 140,
    margin: 20,
    backgroundSize: "contain",
  },
});

const EntryButton = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleNavigate = (herf) => {
    navigate(herf);
  };

  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardActionArea
          onClick={() => handleNavigate("/content/stage/" + props.stageData.id)}
        >
          <CardMedia
            className={classes.media}
            image={props.stageData.icon_src}
          />
          <CardContent>
            <Typography variant="h4" align="center" noWrap={true}>
              {props.stageData.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default function ContentStage() {
  const classes = useStyles();
  const [stageData, setStageData] = useState([]);

  useEffect(() => {
    // 取得 Stage 資料
    const FAKE_STAGE_DATA = [
      {
        id: 0,
        title: "國小",
        icon_src: "/BasicEntryLogo.svg",
      },
      {
        id: 1,
        title: "國中",
        icon_src: "/BasicEntryLogo.svg",
      },
      {
        id: 2,
        title: "高中",
        icon_src: "/BasicEntryLogo.svg",
      },
    ];
    setStageData(FAKE_STAGE_DATA);
  }, []);

  return (
    <Box p={6}>
      {/* 課綱 */}
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <Box p={5}>
            <Typography variant="h3" align="center">
              <b>108課綱 教材</b>
            </Typography>
          </Box>
        </Grid>
        {stageData.map((stage) => {
          return <EntryButton stageData={stage} key={stage.id} />;
        })}
      </Grid>
      {/* 主題式 */}
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <Box p={5} mt={3}>
            <Typography variant="h3" align="center">
              <b>主題式 教材</b>
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardActionArea>
            <CardMedia className={classes.media} image="/ThemeEntryLogo.svg" />
            <CardContent>
              <Typography variant="h4" align="center" noWrap={true}>
                主題式
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Box>
  );
}
