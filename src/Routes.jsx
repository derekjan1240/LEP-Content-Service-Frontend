import React from "react";
import { useRoutes } from "react-router-dom";

/** Utility Pages */
import Home from "./services/Utility/pages/Home";
import NotFound from "./services/Utility/pages/NotFound";
import Dashboard from "./services/Utility/pages/Dashboard";

/** Authentication Service Pages */
// 權限系統
import Login from "./services/Authentication/pages/Login";
import Profile from "./services/Authentication/pages/Profile";
import AccountManagement from "./services/Authentication/pages/AccountManagement";

/** Questionaire Service Pages */
// 問卷系統
import Questionaires from "./services/Questionnaire/pages/Questionaires";

/** Assistant Service Pages */
// 任務系統
import Missions from "./services/Assistant/pages/Missions";
// 班級系統
import Classrooms from "./services/Assistant/pages/Classrooms";

/** Content Service Pages */
// 習題系統
import Exercises from "./services/Content/pages/Exercises";

/** Visualization Service Pages */
// 資料視覺化系統
import Visualizations from "./services/Visualization/pages/Visualizations";

// 課程系統
import ContentStage from "./components/Content/components/ContentStage";
import ContentLecture from "./components/Content/components/ContentLecture";
import ContentVideo from "./components/Content/components/ContentVideo";

export default function Routes() {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/auth/login", element: <Login /> },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/auth/profile",
      element: <Profile />,
    },
    {
      path: "/auth/account/management",
      element: <AccountManagement />,
    },
    {
      path: "/content/stages",
      element: <ContentStage />,
    },
    { path: "/content/stage/:stage_id", element: <ContentLecture /> },
    { path: "/content/video/:video_id", element: <ContentVideo /> },
    { path: "/questionnaire", element: <Questionaires /> },
    { path: "/misssions", element: <Missions /> },
    { path: "/exercises", element: <Exercises /> },
    { path: "/classroom", element: <Classrooms /> },
    { path: "/visualization", element: <Visualizations /> },
    { path: "/dashboard", element: <Dashboard /> },
    // Not found pages
    { path: "*", element: <NotFound /> },
  ]);
}
