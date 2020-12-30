import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Questionaires from "./components/Questionaire/Questionaires";
import Contents from "./components/Content/Contents";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Contents />
        </Route>
        <Route path="/exercises">
          {/* <Exercises /> */}
          <h1>習題系統</h1>
        </Route>
        <Route path="/misssions">
          <h1>任務系統</h1>
          {/* <Missions /> */}
        </Route>
        <Route path="/classroom">
          <h1>班級系統</h1>
        </Route>
        <Route path="/account">
          <h1>帳號系統</h1>
        </Route>
        <Route path="/questionnaire">
          <Questionaires />
        </Route>
        <Route path="/visualization">
          <h1>資料視覺化系統</h1>
        </Route>
        <Route path="/special-contents">
          <h1>主題式課程系統</h1>
        </Route>
        <Route exact path="/dashboard">
          <Container maxWidth="xl">
            <Dashboard />
          </Container>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
