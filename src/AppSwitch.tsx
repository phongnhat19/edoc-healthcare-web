import React from "react";
import { Switch, Route } from "react-router-dom";
import DashboardPage from "./page/Dashboard";
import ProfilePage from "./page/Profile";
import FormListPage from "./page/Forms/FormList";
import CreateFormPage from "./page/Forms/CreateForm";
import DocListPage from "./page/Docs/DocList";
import UserListPage from "./page/Users/UserList";
import NewDocForm from "./page/Docs/NewDocForm";
import NewUserPage from "./page/Users/NewUser";
import DocDetailPage from "./page/Docs/DocDetail";

function AppSwitch() {
  return (
    <Switch>
      <Route path="/forms/list" component={FormListPage} />
      <Route path="/forms/create" component={CreateFormPage} />
      <Route path="/documents/detail/:docId" component={DocDetailPage} />
      <Route path="/documents/list" component={DocListPage} />
      <Route path="/documents/create" component={NewDocForm} />
      <Route path="/users/list" component={UserListPage} />
      <Route path="/users/create" component={NewUserPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/" component={DashboardPage} />
    </Switch>
  );
}

export default AppSwitch;
