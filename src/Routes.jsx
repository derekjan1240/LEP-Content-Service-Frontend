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
import MissionsStudent from "./services/Assistant/pages/MissionsStudent";
import MissionContent from "./services/Assistant/pages/MissionContent";
// 班級系統
import Classrooms from "./services/Assistant/pages/Classrooms";
import Classroom from "./services/Assistant/pages/Classroom";

/** Content Service Pages */
// 習題系統
import Exercises from "./services/Content/pages/Exercises";
import ExercisesAdd from "./services/Content/pages/ExercisesAdd";
import ExercisesRead from "./services/Content/pages/ExerciseRead";

/** Visualization Service Pages */
// 資料視覺化系統
import Visualizations from "./services/Visualization/pages/Visualizations";

// 課程系統
import Stages from "./services/Content/pages/Stages";
import Lectures from "./services/Content/pages/Lectures";
import Units from "./services/Content/pages/Units";

export default function Routes() {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/auth/login", element: <Login /> },
    {
      path: "/auth/profile",
      element: <Profile />,
    },
    {
      path: "/auth/account/management",
      element: <AccountManagement />,
    },
    { path: "/content/stages", element: <Stages /> },
    { path: "/content/stages/:stage_id", element: <Lectures /> },
    { path: "/content/units/:lecture_id", element: <Units /> },
    { path: "/questionnaire", element: <Questionaires /> },
    { path: "/missions", element: <Missions /> },
    { path: "/missions/student", element: <MissionsStudent /> },
    { path: "/missions/content/:mission_id", element: <MissionContent /> },
    { path: "/exercises", element: <Exercises /> },
    { path: "/exercises/add", element: <ExercisesAdd /> },
    { path: "/exercises/:exercise_id", element: <ExercisesRead /> },
    { path: "/classroom", element: <Classrooms /> },
    { path: "/classroom/:classroom_id", element: <Classroom /> },
    { path: "/visualization", element: <Visualizations /> },
    { path: "/dashboard", element: <Dashboard /> },
    // Not found pages
    { path: "*", element: <NotFound /> },
  ]);
}
