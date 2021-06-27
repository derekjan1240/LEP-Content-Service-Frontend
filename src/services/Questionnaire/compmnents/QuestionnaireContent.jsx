import React from "react";

import { Grid, Box, Typography, Checkbox, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: 16,
  },
  questionnaireCard: {
    borderBottom: "1px dashed #636e72",
  },
}));

export default function QuestionnaireContent({
  questionnaire,
  checked,
  setChecked,
  isComplated,
}) {
  const handleCheck = (value) => {
    const checkedCloned = new Set(checked);
    checkedCloned.has(value)
      ? checkedCloned.delete(value)
      : checkedCloned.add(value);
    setChecked(checkedCloned);
  };

  const classes = useStyles();

  return (
    <>
      {questionnaire && (
        <Grid item md={12}>
          <Box p={3} className={classes.questionnaireCard}>
            <Typography variant="h4" gutterBottom>
              <b>{questionnaire.name}</b>
            </Typography>
            <Typography variant="h6" gutterBottom>
              {questionnaire.description}
            </Typography>
            <hr />
            {questionnaire.questions.map((question, index) => (
              <Box
                p={3}
                key={question.title}
                display="flex"
                alignItems="center"
              >
                <Checkbox
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                  checked={checked.has(index)}
                  disabled={isComplated}
                  onClick={() => {
                    handleCheck(index);
                  }}
                />
                <Typography variant="body1">
                  {index + 1}
                  {".  "}
                  {question.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      )}
    </>
  );
}
