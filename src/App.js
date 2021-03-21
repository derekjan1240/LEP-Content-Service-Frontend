import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import UserMenu from "./components/UserMenu";
import Routes from "./Routes";

import { setUserState } from "./actions/UtilActions";
import { userAuthCheck } from "./actions/AuthActions";

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
    <>
      <UserMenu />
      <Routes />
    </>
  );
}

export default App;
