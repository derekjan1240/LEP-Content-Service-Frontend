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
};

export default function SigninForm(props) {
  const { setIsSignin } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email 格式錯誤";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "密碼為必填項目";

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
          route: `${process.env.REACT_APP_AUTHENTICATION_SERVICE}/auth/jwt/login`,
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
          <Controls.Button
            className={classes.formButton}
            fullWidth
            type="submit"
            text="登入"
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
        <Grid item xs>
          <Typography className={classes.pointer} variant="body2">
            忘記密碼?
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            className={classes.pointer}
            onClick={() => setIsSignin(false)}
            variant="body2"
          >
            沒有帳號? 點我註冊
          </Typography>
        </Grid>
      </Grid>
    </Form>
  );
}
