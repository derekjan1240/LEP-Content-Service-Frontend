import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Paper,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
  makeStyles,
} from "@material-ui/core";
import MenuBookIcon from "@material-ui/icons/MenuBook";

import PageHeader from "../../Utility/compmnents/PageHeader";
import OperatorMenu from "../../Utility/compmnents/OperatorMenu";

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

const EntryCard = ({ title, image, route }) => {
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
  const user = useSelector((state) => state.userState.user);
  return (
    <>
      <PageHeader
        title="內容系統"
        subTitle="影片教材"
        icon={<MenuBookIcon fontSize="large" />}
      />
      {user?.role === "Admin" && (
        <OperatorMenu>
          <Button variant="contained" color="primary">
            新增課程
          </Button>
        </OperatorMenu>
      )}
      <Paper className={classes.pageContent}>
        <Grid container justify="center">
          <Grid item xs={12} md={4}>
            <EntryCard
              title="國小"
              image="/BasicEntryLogo.svg"
              route="/content/stages/456176c6-fa36-4754-acbf-f3469def5792"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <EntryCard
              title="國中"
              image="/BasicEntryLogo.svg"
              route="/content/stages/5ea9924d-2324-457f-8c29-d4258f1423c8"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <EntryCard
              title="高中"
              image="/BasicEntryLogo.svg"
              route="/content/stages/9f4c6c96-1d24-45fd-afeb-0c60a743f6d9"
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
