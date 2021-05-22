import React, { useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Controls from "../../../Utility/compmnents/Controls/Controls";
import { useForm, Form } from "../../../Utility/compmnents/UseForm";

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2),
  },
}));

const isAllowAddItems = [
  { id: "Open", value: "1", title: "開放" },
  { id: "Stop", value: "0", title: "停止" },
];

const initialFValues = {
  id: 0,
  name: "",
  description: "",
  isAllowAdd: "1",
};

export default function ClassroomForm({
  classroomForEdit = null,
  handleAddOrEdit,
}) {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "班級名稱為必填";
    if ("description" in fieldValues)
      temp.description = fieldValues.description ? "" : "班級簡介為必填";
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
    if (classroomForEdit != null)
      setValues({
        ...classroomForEdit,
      });
  }, [classroomForEdit]);

  const classes = useStyles();

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Controls.RadioGroup
            name="isAllowAdd"
            label="是否開放加入班級"
            value={values.isAllowAdd}
            onChange={handleInputChange}
            items={isAllowAddItems}
            required
          />
          <Controls.Input
            label="班級名稱"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <Controls.Input
            label="班級簡介"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
            multiline
          />
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
