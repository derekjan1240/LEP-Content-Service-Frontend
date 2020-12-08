import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

function App() {
  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Connection test
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" color="primary" href="#contained-buttons">
            Auth svc check
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" color="primary" href="#contained-buttons">
            Assistant svc check
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" color="primary" href="#contained-buttons">
            Content svc check
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" color="primary" href="#contained-buttons">
            Special Content svc check
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" color="primary" href="#contained-buttons">
            Questionnaire svc check
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" color="primary" href="#contained-buttons">
            Visualization svc check
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
