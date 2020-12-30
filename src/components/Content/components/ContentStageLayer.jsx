import React from "react";
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
    margin: 30,
    backgroundSize: "contain",
  },
});

function toLectureLayer(props) {
  props.setPageLayer(1);
  props.setContentStage(props.stage);
}

const EntryButton = (props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={props.type ? 6 : 4}>
      <Card>
        <CardActionArea onClick={() => toLectureLayer(props)}>
          <CardMedia
            className={classes.media}
            image={
              props.type
                ? `${process.env.PUBLIC_URL}ThemeEntryLogo.svg`
                : `${process.env.PUBLIC_URL}BasicEntryLogo.svg`
            }
          />
          <CardContent>
            <Typography variant="h4" align="center">
              {props.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

const SyllabusEntry = (prop) => {
  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12}>
        <Box p={5}>
          <Typography variant="h3" align="center">
            <b>108課綱 教材</b>
          </Typography>
        </Box>
      </Grid>
      <EntryButton
        title="國小"
        stage={1}
        type={0}
        setPageLayer={prop.setPageLayer}
        setContentStage={prop.setContentStage}
      />
      <EntryButton
        title="國中"
        stage={2}
        type={0}
        setPageLayer={prop.setPageLayer}
        setContentStage={prop.setContentStage}
      />
      <EntryButton
        title="高中"
        stage={3}
        type={0}
        setPageLayer={prop.setPageLayer}
        setContentStage={prop.setContentStage}
      />
    </Grid>
  );
};

const ThemeEntry = (prop) => {
  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12}>
        <Box p={5} mt={3}>
          <Typography variant="h3" align="center">
            <b>主題式 教材</b>
          </Typography>
        </Box>
      </Grid>
      <EntryButton
        title="主題式"
        stage={0}
        type={1}
        setPageLayer={prop.setPageLayer}
        setContentStage={prop.setContentStage}
      />
    </Grid>
  );
};

export default function ContentStageLayer(prop) {
  return (
    <Box p={6}>
      {SyllabusEntry(prop)}
      {ThemeEntry(prop)}
    </Box>
  );
}
