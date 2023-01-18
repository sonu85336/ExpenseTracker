import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import classes from "./AuthForm.module.css";
function PasswordChange() {
  const emailRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredemail = emailRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDcPWz5JxqUMyayXb7x_M4yzUlvx2qQeJ8",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredemail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errormessage = "Authentication failed";
          if (data && data.error && data.error.message) {
            errormessage = data.error.message;
          }
          throw new Error(errormessage)
        });
      }
    })
    .then((data)=>{
        console.log(data)
        console.log('success')
    })
    .catch((err)=>{
        alert(err.message)
    })

  };
  return (
    <form onSubmit={submitHandler}>
      <div className={classes.auth}>
        <div>
          <label>Enter the email which you have registered.</label>
        </div>
        <div>
          <input type="email" ref={emailRef}></input>
        </div>
        <div>
          <button>Send Link</button>
        </div>
        <NavLink
          style={{ textDecoration: "none", color: "brown" }}
          to="/Authpage"
        >
          Alreary a user?Login
        </NavLink>
      </div>
    </form>
  );
}

export default PasswordChange;
