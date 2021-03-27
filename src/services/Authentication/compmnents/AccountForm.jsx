import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../Utility/compmnents/Controls/Controls";
import { useForm, Form } from "../../Utility/compmnents/UseForm";

const roleItems = [
  { id: "Admin", title: "管理員" },
  { id: "Teacher", title: "老師" },
  { id: "Parent", title: "家長" },
  { id: "Student", title: "學生" },
];

const initialFValues = {
  id: 0,
  userName: "",
  email: "",
  role: "student",
};

export default function AccountForm(props) {
  const { addOrEdit, recordForEdit } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("userName" in fieldValues)
      temp.userName = fieldValues.userName ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("departmentId" in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length != 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="userName"
            label="使用者"
            value={values.userName}
            onChange={handleInputChange}
            error={errors.userName}
          />
          <Controls.Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="role"
            label="角色"
            value={values.role}
            onChange={handleInputChange}
            items={roleItems}
          />
          <div>
            <Controls.Button type="submit" text="送出" />
            <Controls.Button text="清除" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
