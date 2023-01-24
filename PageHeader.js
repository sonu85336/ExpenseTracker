import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import classes from "../css/PageHeader.module.css";
import { useEffect } from "react";
//import AuthContext from '../store/AuthContext'
import { useSelector } from "react-redux";
function PageHeader() {
  //const authCtx = useContext(AuthContext)
  
  return (
    <React.Fragment>
      <header className={classes.pageheader}>
        {" "}
        <div>Welcome to Expense Tracker !!!</div>{" "}
        <span>
          Your profile incomplete.
          <NavLink
            style={{ textDecoration: "none" }}
            to="/ExpensePage:ProfilePage"
          >
            Complete now
          </NavLink>
        </span>{" "}
      </header>
    </React.Fragment>
  );
}

export default PageHeader;
