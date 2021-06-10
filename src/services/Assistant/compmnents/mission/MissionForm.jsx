import React, { useEffect } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import Controls from "../../../Utility/compmnents/Controls/Controls";
import { useForm, Form } from "../../../Utility/compmnents/UseForm";

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2),
  },
}));

const typeItems = [
  { id: "Video", value: "Video", title: "影片任務" },
  { id: "Exercise", value: "Exercise", title: "習題任務" },
];

const initialFValues = {
  id: String(new Date().getTime()),
  type: "Video",
  name: "",
  unit: "",
  exercise: "",
};

export default function MissionForm({
  units,
  exercises,
  missionForEdit = null,
  handleAddOrEdit,
}) {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "任務名稱為必填";
    if ("unit" in fieldValues && fieldValues.type === "Video")
      temp.unit = fieldValues.unit ? "" : "影片為必填";
    if ("exercise" in fieldValues && fieldValues.type === "Exercise")
      temp.exercise = fieldValues.exercise ? "" : "習題為必填";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleAddOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (missionForEdit != null)
      setValues({
        ...missionForEdit,
      });
  }, [missionForEdit]);

  useEffect(() => {
    if (values.type === "Video") {
      values.exercise = "";
    } else {
      values.unit = "";
    }
  }, [values]);

  const classes = useStyles();

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Controls.RadioGroup
            name="type"
            label="種類"
            value={values.type}
            onChange={handleInputChange}
            items={typeItems}
            required
          />
          <Controls.Input
            label="任務名稱"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          {values.type === "Video" && (
            <FormControl variant="outlined" fullWidth error={errors.unit}>
              <InputLabel htmlFor="exercise">影片</InputLabel>
              <Select
                native
                value={values.unit}
                onChange={handleInputChange}
                inputProps={{
                  name: "unit",
                  id: "unit",
                }}
                label="影片"
              >
                <option aria-label="None" value="" />
                {units.map((unit) => {
                  return (
                    <option key={unit.id} value={unit.id}>
                      {unit.title}
                    </option>
                  );
                })}
              </Select>
              <FormHelperText>影片為必填</FormHelperText>
            </FormControl>
          )}
          {values.type === "Exercise" && (
            <FormControl variant="outlined" fullWidth error={errors.exercise}>
              <InputLabel htmlFor="exercise">習題</InputLabel>
              <Select
                native
                value={values.exercise}
                onChange={handleInputChange}
                inputProps={{
                  name: "exercise",
                  id: "exercise",
                }}
                label="標籤"
              >
                <option aria-label="None" value="" />
                {exercises.map((exercise) => {
                  return (
                    <option key={exercise.id} value={exercise.id}>
                      {exercise.title}
                    </option>
                  );
                })}
              </Select>
              <FormHelperText>習題為必填</FormHelperText>
            </FormControl>
          )}
        </Grid>
        <Grid item xs={12}>
          <div className={classes.buttonWrapper}>
            <Controls.Button type="submit" text="送出" />
            <Controls.Button text="清除" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
