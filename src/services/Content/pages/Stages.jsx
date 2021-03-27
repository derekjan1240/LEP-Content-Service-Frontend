import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  makeStyles,
} from "@material-ui/core";
import MenuBookIcon from "@material-ui/icons/MenuBook";

import PageHeader from "../../Utility/compmnents/PageHeader";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  entryCard: {
    margin: theme.spacing(3),
    background: "#edf5fd38",
  },
  media: {
    height: 140,
    margin: 20,
    backgroundSize: "contain",
  },
}));

const EntryCard = (props) => {
  const { title, image, route } = props;
  const navigate = useNavigate();
  const handleNavigate = (herf) => {
    navigate(herf);
  };
  const classes = useStyles();
  return (
    <Card className={classes.entryCard}>
      <CardActionArea onClick={() => handleNavigate(route)}>
        <CardMedia className={classes.media} image={image} />
        <CardContent>
          <Typography variant="h4" align="center" noWrap={true}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default function Stages() {
  const classes = useStyles();
  return (
    <>
      <PageHeader
        title="內容系統"
        subTitle="subTitle"
        icon={<MenuBookIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Grid container justify="center">
          <Grid item xs={12} md={4}>
            <EntryCard
              title="國小"
              image="/BasicEntryLogo.svg"
              route="/content/stages/elementary"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <EntryCard
              title="國中"
              image="/BasicEntryLogo.svg"
              route="/content/stages/secondary"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <EntryCard
              title="高中"
              image="/BasicEntryLogo.svg"
              route="/content/stages/highschool"
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={12}>
            <EntryCard
              title="主題式"
              image="/ThemeEntryLogo.svg"
              route="/special/contents"
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
