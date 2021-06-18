import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Typography,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";

const services = [
  {
    title: "AUTHENTICATION",
    description: "驗證系統",
    link: process.env.REACT_APP_AUTHENTICATION_SERVICE,
    status: undefined,
  },
  {
    title: "ASSISTANT",
    description: "任務系統、班級系統",
    link: process.env.REACT_APP_ASSISTANT_SERVICE,
    status: undefined,
  },
  {
    title: "CONTENT",
    description: "影片系統、習題系統",
    link: process.env.REACT_APP_CONTENT_SERVICE,
    status: undefined,
  },
  {
    title: "SPECIAL CONTENT",
    description: "主題式課程",
    link: process.env.REACT_APP_SPECIAL_CONTENT_SERVICE,
    status: undefined,
  },
  {
    title: "QUESTIONNAIRE",
    description: "問卷系統",
    link: process.env.REACT_APP_QUESTIONNAIRE_SERVICE,
    status: undefined,
  },
  {
    title: "VISUALIZATION",
    description: "圖像視覺化系統",
    link: process.env.REACT_APP_VISUALIZATION_SERVICE,
    status: undefined,
  },
];

const useStyles = makeStyles(() => ({
  dashboardWrapper: {
    padding: 50,
  },
  dashboardTitle: {
    textAlign: "center",
    fontWeight: 600,
    padding: 20,
  },
  backgroundSuccess: {
    background: "#55efc4",
  },
  backgroundFail: {
    background: "#ff7675",
  },
}));

const ServiceSign = (status) => {
  const { backgroundSuccess, backgroundFail } = useStyles();
  if (status === undefined) {
    return (
      <CardActions>
        <CircularProgress />
      </CardActions>
    );
  } else {
    return (
      <CardActions className={status ? backgroundSuccess : backgroundFail}>
        {status ? (
          <Typography>Available</Typography>
        ) : (
          <Typography>Fail</Typography>
        )}
      </CardActions>
    );
  }
};

const DashboardCards = () => {
  return services.map(({ title, link, status, description }) => {
    return (
      <Grid item xs={12} md={4} key={title}>
        <Card>
          <CardActionArea href={link}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
          {ServiceSign(status)}
        </Card>
      </Grid>
    );
  });
};

const getServicesStatus = (setIsStatusChange) => {
  services.forEach((service) => {
    axios
      .get(service.link)
      .then(function (response) {
        service.status = true;
        setIsStatusChange(service.title + "Success");
      })
      .catch(function (error) {
        service.status = false;
        setIsStatusChange(service.title + "Fail");
      });
  });
};

export default function Dashboard() {
  const { dashboardWrapper, dashboardTitle } = useStyles();
  const [isStatusChange, setIsStatusChange] = useState(false);
  useEffect(() => {
    getServicesStatus(setIsStatusChange);
  }, []);
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} className={dashboardWrapper}>
        <Grid item xs={12}>
          <Typography variant="h3" className={dashboardTitle}>
            Services Heath Check
          </Typography>
        </Grid>
        {DashboardCards()}
      </Grid>
    </Container>
  );
}
