import { Paper, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

export default function OperatorMenu({ children }) {
  const classes = useStyles();
  return (
    <Paper className={classes.pageContent}>
      <Grid container justify="center">
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Paper>
  );
}
