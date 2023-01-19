import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../store/AuthContext";
import PageHeader from "./PageHeader";
import classes from "../css/ProfileForm.module.css";
import ExpenseForm from "./ExpenseForm";
import ExpenseInput from "./ExpenseInput";
 
 
function ExpensePage() {
  const authCtx = useContext(AuthContext);
  const [printexpense, setPrintExpense] = useState([]);
  const [getdat, setGetdata] = useState([]);
useEffect(()=>{
  async function fetchExpenses(){
    try{
      const res = await fetch('https://login-auth-460ac-default-rtdb.firebaseio.com/Expense.json',{
        method:"GET",
        headers:{
          "Content-Type": "application/json"
        },
      })
      const data = await res.json();
      if(res.ok){
        const newdata = [];
        for(let key in data){
          newdata.push({id:key,...data[key]});
        }
        setGetdata(newdata)
        setPrintExpense(newdata)
      }else{
        throw data.error
      }
    }catch(error){
      console.log(error.message)
    }
  }
  fetchExpenses()

},[])
 
console.log(getdat,'from expensepage useeffect get data')
  const inputvalueHandler = (expense) => {
    fetch("https://login-auth-460ac-default-rtdb.firebaseio.com/Expense.json", {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res, "form post data");
        return res.json();
      })
      .catch((err) => {
        console.log(err.message);
      });
    setPrintExpense((prevexpense) => {
      return [expense, ...prevexpense];
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDcPWz5JxqUMyayXb7x_M4yzUlvx2qQeJ8",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
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
            let errormessage = "Authentication failed";
            if (data && data.error && data.error.message) {
              errormessage = data.error.message;
            }
            throw new Error(errormessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        alert("success");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
  console.log(printexpense, "from expnesepage");
  return (
    <React.Fragment>
      <PageHeader />
      <hr></hr>
      <form onSubmit={submitHandler}>
        <div className={classes.expensepage}>
          {" "}
          <label htmlFor="emailverification">Please Verify Your Email..</label>
          <button>Email Verificatin</button>
        </div>
      </form>
      <ExpenseForm ondata={inputvalueHandler}></ExpenseForm>
      <ExpenseInput printexpense={printexpense}></ExpenseInput>
    </React.Fragment>
  );
}

export default ExpensePage;
