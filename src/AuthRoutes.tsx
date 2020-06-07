import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./page/Login";

function AuthRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default AuthRoutes;
