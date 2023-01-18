import React, { useContext } from "react";
import AuthForm from "./component/Auth/AuthForm";
import { Route, Switch ,Redirect} from "react-router-dom";
import ExpensePage from "./component/pages/ExpensePage";
import AuthContext from "./component/store/AuthContext";
import ProfilForm from "./component/pages/ProfilForm";
import Logoutpage from "./component/pages/Logoutpage";
import classes from './component/css/PageHeader.module.css'
function App() {
  const authCtx = useContext(AuthContext);
  return (
    
       <React.Fragment>
        
       {authCtx.isLoggedIn && <Logoutpage/>} 
        <Switch>
        {authCtx.isLoggedIn && (
          <Route path="/ExpensePage" exact>
            <ExpensePage />
          </Route>
        )}
       {authCtx.isLoggedIn&&( <Route path="/ExpensePage:ProfilePage">
<ProfilForm/>
        </Route>)}
       {!authCtx.isLoggedIn&&<Route path='/Authpage'><AuthForm/></Route>}
<Route path = '*'>
  <Redirect to="/Authpage"/>
</Route>
</Switch>
     
      </React.Fragment>
  )
}

export default App;
