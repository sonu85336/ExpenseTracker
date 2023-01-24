import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import classes from "../css/PageHeader.module.css";
//import AuthContext from "../store/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/AuthRedux";
import axios from "axios";
function Logoutpage() {
  const  dispatch = useDispatch()
  const history = useHistory()
  const token = useSelector((state)=>state.expenseitem.token)
  //const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
   // authCtx.logout();
  
   history.replace('/Authpage')
   dispatch(authActions.logout(null))
  
  
  };

   
  return (
    <div className={classes.logout}>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}

export default Logoutpage;
