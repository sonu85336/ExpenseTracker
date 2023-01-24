import React, { useRef, useContext, useEffect, useState } from "react";
import classes from "../css/PageHeader.module.css";
import classes1 from "../css/ProfileForm.module.css";
import { NavLink } from "react-router-dom";
//import AuthContext from "../store/AuthContext";
import { useSelector } from "react-redux";
import axios from "axios";
function ProfilForm() {
  //const authCtx = useContext(AuthContext);
  const idtoken = useSelector((state) => state.auth.token);
  const nameRef = useRef();
  const photourlRef = useRef();
  const [getData, setData] = useState([]);
  const [checking, setChecking] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredUrl = photourlRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDcPWz5JxqUMyayXb7x_M4yzUlvx2qQeJ8",
      {
        method: "POST",
        body: JSON.stringify({
          //      idToken: authCtx.tokenid,
          idToken: idtoken,
          displayName: enteredName,
          photoUrl: enteredUrl,

          returnSecureToken: true,
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
            let erroMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              erroMessage = data.error.message;
            }
            throw new Error(erroMessage);
          });
        }
      })
      .then((data) => {
        console.log("seccess");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  // const get = JSON.stringify(data);
  // localStorage.setItem("data", get);
  useEffect(() => {
    const fetchProfile = async () => {
      const obj = {
        //idToken: authCtx.tokenid,
        idToken: idtoken,
      };
      try {
        const res = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDcPWz5JxqUMyayXb7x_M4yzUlvx2qQeJ8",
          obj
        );

        const data = JSON.stringify(res.data);
        localStorage.setItem("data", data);
        setChecking(true);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (checking) {
      setData(JSON.parse(localStorage.getItem("data")));
      setChecking(false);
    }
  }, [checking]);

  console.log(getData)
  return (
    <React.Fragment>
      <header className={classes.pageheader}>
        {" "}
        <div>Winners never quite, Quitters never win.</div>{" "}
        <span>
          Your profile is 64% completes. A complete Profile has Higher chances
          of landing a job.
          <NavLink
            style={{ textDecoration: "none" }}
            to="/ExpensePage:ProfilePage"
          >
            Complete now
          </NavLink>
        </span>{" "}
      </header>
      <hr />
      <form onSubmit={submitHandler}>
        <div className={classes1.profile}>
          <div className={classes1.contact}>
            <h2>Contact Details </h2>
            <span>
              <button>Cancel</button>
            </span>
          </div>
          <div className={classes1.form}>
            <div>
              <label htmlFor="name">Full Name:</label>
            </div>
            <div>
              <input
                type="text"
                ref={nameRef}
                defaultValue={getData.users[0].displayName}
              ></input>
            </div>
            <div>
              {" "}
              <label htmlFor="img"> Profile Photo URL</label>
            </div>
            <div>
              {" "}
              <input
                type="text"
                ref={photourlRef}
                defaultValue={getData.users[0].photoUrl}
              ></input>
            </div>
          </div>
          <div>
            <button className={classes1.button}>Update</button>
          </div>
          <hr />
        </div>
      </form>
    </React.Fragment>
  );
}

export default ProfilForm;
