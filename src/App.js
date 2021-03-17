import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserMenu from "./components/UserMenu";
import Routes from "./Routes";

import { userAuthCheck } from "./actions/AuthActions";

function App() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.userState);

  useEffect(() => {
    // 確認使用者登入狀態
    if (!userState) {
      const token = localStorage.getItem("jwt");
      token && dispatch(userAuthCheck(token));
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
