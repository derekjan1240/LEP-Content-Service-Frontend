import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Form } from "../../Utility/compmnents/UseForm";
import Controls from "../../Utility/compmnents/Controls/Controls";

import { userLogin } from "../../../actions/UtilActions";

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: "100% !important",
    margin: "8px 0 !important",
  },
  pointer: {
    cursor: "pointer",
  },
  formButton: {
    margin: theme.spacing(1, 0),
  },
}));

function getFormData() {
  const $Form = document.querySelector("#From_Login");
  return Object.fromEntries(new FormData($Form));
}

const initialFValues = {
  email: "",
  password: "",
  role: "Student",
};

const roleItems = [
  { id: "Student", title: "學生" },
  { id: "Parent", title: "家長" },
  { id: "Teacher", title: "老師" },
  { id: "Admin", title: "管理員" },
];

export default function SignupForm(props) {
  const { setIsSignin } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("userName" in fieldValues)
      temp.userName = fieldValues.userName ? "" : "使用者名稱為必填項目";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email 格式錯誤";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "密碼為必填項目";
    if ("role" in fieldValues)
      temp.role = ["Student", "Parent", "Teacher", "Admin"].includes(
        fieldValues.role
      )
        ? ""
        : "使用者身分錯誤";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  useEffect(() => {
    console.log("init reset form");
  }, []);

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(
        userLogin({
          data: getFormData(),
          route: `${process.env.REACT_APP_AUTHENTICATION_SERVICE}/users`,
        })
      );
    }
  };

  return (
    <Form id="From_Login" onSubmit={handleSubmit}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Controls.Input
            className={classes.fullWidth}
            label="使用者名稱"
            name="userName"
            value={values.userName}
            onChange={handleInputChange}
            error={errors.userName}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.Input
            className={classes.fullWidth}
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.Input
            className={classes.fullWidth}
            label="密碼"
            name="password"
            type="password"
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.RadioGroup
            name="role"
            label="使用者身分"
            value={values.role}
            onChange={handleInputChange}
            items={roleItems}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.Button
            className={classes.formButton}
            fullWidth
            type="submit"
            text="註冊"
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.Button
            className={classes.formButton}
            fullWidth
            text="清除"
            color="default"
            onClick={resetForm}
          />
        </Grid>
        <Grid item>
          <Typography
            className={classes.pointer}
            onClick={() => setIsSignin(true)}
            variant="body2"
          >
            已經有帳號? 點我登入
          </Typography>
        </Grid>
      </Grid>
    </Form>
  );
}
