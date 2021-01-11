import React from "react";
import { useRoutes } from "react-router-dom";
import UserMenu from "./components/UserMenu";
import NotFound from "./components/Util/NotFound";
import Dashboard from "./components/Dashboard";

// 首頁
import Home from "./components/Home";
// 問卷系統
import Questionaires from "./components/Questionaire/Questionaires";
// 任務系統
import Missions from "./components/Missions/Missions";
// 習題系統
import Exercises from "./components/Exercises/Exercises";
// 班級系統
import Classrooms from "./components/Classrooms/Classrooms";
// 課程系統
import ContentStage from "./components/Content/components/ContentStage";
import ContentLecture from "./components/Content/components/ContentLecture";
import ContentVideo from "./components/Content/components/ContentVideo";

function App() {
  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/content/stages", element: <ContentStage /> },
    { path: "/content/stage/:stage_id", element: <ContentLecture /> },
    { path: "/content/video/:video_id", element: <ContentVideo /> },
    { path: "/questionnaire", element: <Questionaires /> },
    { path: "/misssions", element: <Missions /> },
    { path: "/exercises", element: <Exercises /> },
    { path: "/classroom", element: <Classrooms /> },
    { path: "/dashboard", element: <Dashboard /> },
    // Not found routes work as you'd expect
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <div className="App">
      <UserMenu />
      {element}
    </div>
  );
}

export default App;
