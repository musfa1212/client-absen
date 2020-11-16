import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import AttendanceList from "./components/AttendanceList";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route exact path="/">
          <AttendanceList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
