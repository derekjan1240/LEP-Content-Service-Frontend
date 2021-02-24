import React from "react";
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
    <Grid item xs={12} md={props.type ? 6 : 4}>
      <Card>
        <CardActionArea
          onClick={() => handleNavigate("/content/stage/" + props.stage)}
        >
          <CardMedia
            className={classes.media}
            image={props.type ? `/ThemeEntryLogo.svg` : `/BasicEntryLogo.svg`}
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

const SyllabusEntry = () => {
  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12}>
        <Box p={5}>
          <Typography variant="h3" align="center">
            <b>108課綱 教材</b>
          </Typography>
        </Box>
      </Grid>
      <EntryButton title="國小" stage={0} type={0} />
      <EntryButton title="國中" stage={1} type={0} />
      <EntryButton title="高中" stage={2} type={0} />
    </Grid>
  );
};

const ThemeEntry = () => {
  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12}>
        <Box p={5} mt={3}>
          <Typography variant="h3" align="center">
            <b>主題式 教材</b>
          </Typography>
        </Box>
      </Grid>
      <EntryButton title="主題式" stage={99} type={1} />
    </Grid>
  );
};

export default function ContentStage() {
  return (
    <Box p={6}>
      {SyllabusEntry()}
      {ThemeEntry()}
    </Box>
  );
}
