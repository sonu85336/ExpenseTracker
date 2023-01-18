import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import classes from '../css/PageHeader.module.css'
import { useEffect } from 'react'
import AuthContext from '../store/AuthContext'
function PageHeader() {
  const authCtx = useContext(AuthContext)
  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDcPWz5JxqUMyayXb7x_M4yzUlvx2qQeJ8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.tokenid,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.ProfileDetails(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);
  return (
     <React.Fragment  >
      <header  className={classes.pageheader}> <div >Welcome to Expense Tracker !!!</div> <span>Your profile incomplete.<NavLink 
       style={{textDecoration:'none'}} to="/ExpensePage:ProfilePage">Complete now</NavLink></span> </header>
     </React.Fragment>
  )
}

export default PageHeader
