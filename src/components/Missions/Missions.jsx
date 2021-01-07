import { Grid, Typography } from "@material-ui/core";

export default function Missions() {
  return (
    <Grid container justify="center" spacing={3}>
      <Grid item xs={12} lg={8}>
        <Typography variant="h3" gutterBottom>
          任務系統
        </Typography>
      </Grid>
    </Grid>
  );
}
