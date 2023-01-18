import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "../css/PageHeader.module.css";
import AuthContext from "../store/AuthContext";

function Logoutpage() {
  const history = useHistory()
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
  history.replace('/Authpage')
  };
  return (
    <div className={classes.logout}>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}

export default Logoutpage;
