import { Grid, Box, Typography } from "@material-ui/core";

export default function NotFound() {
  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12}>
        <Box mx={5}>
          <Typography gutterBottom variant="h5" component="h2">
            Not Found!
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
