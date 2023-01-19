import React, { useContext } from "react";
import AuthForm from "./component/Auth/AuthForm";
import { Route, Switch, Redirect } from "react-router-dom";
import ExpensePage from "./component/pages/ExpensePage";
import AuthContext from "./component/store/AuthContext";
import ProfilForm from "./component/pages/ProfilForm";
import Logoutpage from "./component/pages/Logoutpage";
import PasswordChange from "./component/Auth/PasswordChange";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      {" "}
      {!authCtx.isLoggedIn && (
        <Route path="*">
          <Redirect to="/Authpage" />
        </Route>
      )}{" "}
      {authCtx.isLoggedIn && <Logoutpage />}
      <Switch>
        {" "}
        {authCtx.isLoggedIn && (
          <Route path="/ExpensePage" exact>
            <ExpensePage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/ExpensePage:ProfilePage">
            <ProfilForm />
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/Authpage">
            <AuthForm />
          </Route>
        )}
        <Route path="/ChangePassword">
          <PasswordChange />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
