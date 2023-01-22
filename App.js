import React, { useContext } from "react";
import AuthForm from "./component/Auth/AuthForm";
import { Route, Switch, Redirect } from "react-router-dom";
import ExpensePage from "./component/pages/ExpensePage";
//import AuthContext from "./component/store/AuthContext";
import ProfilForm from "./component/pages/ProfilForm";
import Logoutpage from "./component/pages/Logoutpage";
import PasswordChange from "./component/Auth/PasswordChange";
import { useSelector,useDispatch } from "react-redux";

import { themeAction } from "./component/store/AuthRedux";
import ReactSwitch from 'react-js-switch';
import'./component/css/Dark_lightMode.css'


function App() {
  // const authCtx = useContext(AuthContext);
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const premium = useSelector((state)=>state.theme.premium)
  const activePremium = useSelector((state) => state.theme.cvandDark);
const toggleThem = ()=>{
  dispatch(themeAction.changeTheme())
}
  return (
    <React.Fragment>
      <div  id={darkMode}>
        {" "}
      {isLoggedIn&&activePremium&& <div className="switch">
          <label>{darkMode==='light' ?'Light Mode' : "Dark Mode"}</label>
        <ReactSwitch onChange={toggleThem}  /></div>} 
        {!isLoggedIn && (
          <Route path="*">
            <Redirect to="/Authpage" />
          </Route>
        )}{" "}
        {isLoggedIn && <Logoutpage />}
        <Switch>
          {" "}
          {isLoggedIn && (
            <Route path="/ExpensePage" exact>
              <ExpensePage />
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/ExpensePage:ProfilePage">
              <ProfilForm />
            </Route>
          )}
          {!isLoggedIn && (
            <Route path="/Authpage">
              <AuthForm />
            </Route>
          )}
          <Route path="/ChangePassword">
            <PasswordChange />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
