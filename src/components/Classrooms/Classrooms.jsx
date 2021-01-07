import { Grid, Typography } from "@material-ui/core";

export default function Classrooms() {
  return (
    <Grid container justify="center" spacing={3}>
      <Grid item xs={12} lg={8}>
        <Typography variant="h3" gutterBottom>
          班級系統
        </Typography>
      </Grid>
    </Grid>
  );
}
