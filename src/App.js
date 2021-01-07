import React from "react";
import { useRoutes } from "react-router-dom";
import UserMenu from "./components/UserMenu";
import NotFound from "./components/Util/NotFound";
import Dashboard from "./components/Dashboard";

import Home from "./components/Home";

import Questionaires from "./components/Questionaire/Questionaires";

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
