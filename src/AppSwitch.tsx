import React from "react";
import { Switch, Route } from "react-router-dom";
import DashboardPage from "./page/Dashboard";
import ProfilePage from "./page/Profile";
import FormListPage from "./page/Forms/FormList";
import CreateFormPage from "./page/Forms/CreateForm";
import DocListPage from "./page/Docs/DocList";
import UserListPage from "./page/Users/UserList";

function AppSwitch() {
  return (
    <Switch>
      <Route path="/forms/list" component={FormListPage} />
      <Route path="/forms/create" component={CreateFormPage} />
      <Route path="/documents/list" component={DocListPage} />
      <Route path="/users/list" component={UserListPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/" component={DashboardPage} />
    </Switch>
  );
}

export default AppSwitch;
