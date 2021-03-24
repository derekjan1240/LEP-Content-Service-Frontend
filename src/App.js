import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CssBaseline, createMuiTheme, ThemeProvider } from "@material-ui/core";
import UserMenu from "./services/Utility/compmnents/UserMenu";
import Routes from "./Routes";

import { setUserState } from "./actions/UtilActions";
import { userAuthCheck } from "./actions/AuthActions";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 確認使用者登入狀態
    const token = localStorage.getItem("jwt");
    if (token) {
      // 檢查 token 是否過期
      dispatch(userAuthCheck(token));
    } else {
      // 未登入 清除 userState
      dispatch(setUserState());
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserMenu />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
