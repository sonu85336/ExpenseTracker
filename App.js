import React, { useContext } from "react";
import AuthForm from "./component/Auth/AuthForm";
import { Route, Switch } from "react-router-dom";
import ExpensePage from "./component/pages/ExpensePage";
import AuthContext from "./component/store/AuthContext";
import ProfilForm from "./component/pages/ProfilForm";
function App() {
  const authCtx = useContext(AuthContext);
  return (
    
       <React.Fragment>
        <Switch>
        {authCtx.isLoggedIn && (
          <Route path="/ExpensePage" exact>
            <ExpensePage />
          </Route>
        )}
        <Route path="/ExpensePage:ProfilePage">
<ProfilForm/>
        </Route>
      
</Switch>
      {!authCtx.isLoggedIn&&<AuthForm/>}
      </React.Fragment>
  )
}

export default App;
