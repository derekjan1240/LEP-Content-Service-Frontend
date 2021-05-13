import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  makeStyles,
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import Axios from "axios";

import { setUserState } from "../../../actions/UtilActions";
import PageHeader from "../../Utility/compmnents/PageHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  pageContent: {
    width: "100%",
    margin: 0,
    padding: theme.spacing(3),
    background: "#fff",
  },
  title: {
    padding: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
  avatar: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(3),
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3),
  },
}));

export default function Profile() {
  // 登入檢查
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);

  const [role, setRole] = useState(userState?.user?.role || "");
  const [state, setState] = useState({});

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  useEffect(() => {
    if (!userState.user && !userState.isChecking) {
      navigate("/auth/login");
    }
    if (userState?.user?.role) {
      // setRole(userState?.user?.role);
      setState({
        userName: userState.user.userName,
        email: userState.user.email,
        role: userState.user.role,
        age: userState.user.age,
      });
    }
  }, [userState]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  // 更新個人資料 > Redux state 更新
  const updateProfile = () => {
    console.log("update!", state, localStorage.jwt);
    Axios({
      method: "Put",
      url: `${process.env.REACT_APP_AUTHENTICATION_SERVICE}/users`,
      headers: { Authorization: `Bearer ${localStorage.jwt}` },
      data: {
        ...state,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(setUserState(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStateChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.valueAsNumber || event.target.value,
    });
  };

  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="個人檔案"
        subTitle="subTitle"
        icon={<AccountBoxIcon fontSize="large" />}
      />
      {!userState.isChecking && (
        <div className={classes.root}>
          <Grid container spacing={0} className={classes.pageContent}>
            <Grid item xs={12}>
              <Typography variant="h3" align="left" className={classes.title}>
                <b>Hello! {userState?.user?.userName}</b>
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Avatar
                alt={userState?.user?.userName}
                src="/Avatar.svg"
                className={classes.avatar}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <form
                noValidate
                autoComplete="off"
                className={classes.formWrapper}
              >
                <Box p={1}>
                  <TextField
                    id="outlined-basic"
                    label="姓名"
                    variant="outlined"
                    name="name"
                    defaultValue={userState?.user?.userName}
                    fullWidth
                    onChange={handleStateChange}
                  />
                </Box>
                <Box p={1}>
                  <TextField
                    id="outlined-basic"
                    label="E-Mail"
                    variant="outlined"
                    name="email"
                    defaultValue={userState?.user?.email}
                    fullWidth
                    onChange={handleStateChange}
                  />
                </Box>
                <Box p={1}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      當前身份
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      name="role"
                      defaultValue={userState?.user?.role}
                      onChange={handleStateChange}
                      label="當前身份"
                    >
                      <MenuItem value={""} disabled>
                        無
                      </MenuItem>
                      <MenuItem value={"Student"}>Student</MenuItem>
                      <MenuItem value={"Parent"}>Parent</MenuItem>
                      <MenuItem value={"Teacher"}>Teacher</MenuItem>
                      <MenuItem value={"Admin"}>Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box p={1}>
                  <TextField
                    id="outlined-basic"
                    label="年齡"
                    variant="outlined"
                    name="age"
                    type="number"
                    defaultValue={userState?.user?.age}
                    fullWidth
                    onChange={handleStateChange}
                  />
                </Box>

                <Box p={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={updateProfile}
                  >
                    更新
                  </Button>
                </Box>
              </form>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}
