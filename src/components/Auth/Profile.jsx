import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Profile() {
  const userState = useSelector((state) => state.userState);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userState.isLogin) {
      navigate("/login");
    }
  }, [userState]);
  return (
    <>
      <h1>Profile</h1>
      {JSON.stringify(userState)}
    </>
  );
}
