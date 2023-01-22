//import { useRef, useState } from 'react';
import classes from "../css/ExpenseForm.module.css";
import ExpenseInput from "./ExpenseInput";
import React, { useCallback, useRef, useEffect, useState } from "react";

import { ExpenseAction, themeAction } from "../store/AuthRedux";
import { useSelector, useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
// import classes from "../css/ProfileForm.module.css";

// import ExpenseInput from "./ExpenseInput";
const ExpenseForm = (props) => {
  const showExpense = useSelector((state) => state.expenseitem.expense);
  const totalAmount = useSelector((state) => state.expenseitem.totalAmount);
  const activePremium = useSelector((state) => state.theme.cvandDark);
  const dispatch = useDispatch();
  const premium = useSelector((state) => state.theme.premium);

  const [enteredExpense, setEnteredExpense] = useState("");
  const [enteredDetails, setEnteredDetails] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [printexpense, setPrintExpense] = useState([]);
  //const [activePremium,setActivepremium]= useState(false)
  // const [premium, setPremium] = useState(false);
  const amountRef = useRef();
  const DetailRef = useRef();
  const CategoryRef = useRef();
const activePremiumHandler = ()=>{
dispatch(themeAction.cvDarkMode(true))
}
  const headers = [
    { label: "Expense Amount", key: "enteredExpense" },
    { label: "Details", key: "enteredDetails" },
    { label: "Category", key: "enteredCategory" },
  ];

  const csvLink = {
    filename: "file.csv",
    headers: headers,
    data: showExpense,
  };
  const EditExpenseHandler = (data) => {
    let removeitem = showExpense.findIndex((item) => item.id === data.id);
    const arr = [...showExpense];
    const updateItems = arr.splice(removeitem, 1);
    console.log(updateItems, "from edit");
    // setPrintExpense(arr)
    dispatch(ExpenseAction.editExpense(arr));

    amountRef.current.value = data.enteredExpense;
    DetailRef.current.value = data.enteredDetails;
    CategoryRef.current.value = data.enteredCategory;
  };
  /********************************** */

  // console.log(printexpense, "from expnesepage");
  const removeItemHanler = (data) => {
    let removeitem = showExpense.findIndex((item) => item.id === data.id);
    const arr = [...showExpense];
    const updateItems = arr.splice(removeitem, 1);
    console.log(updateItems);

    // setPrintExpense(arr);
    dispatch(ExpenseAction.removeExpense(arr));
  };

  /************************ */
  const expenseHandler = (event) => {
    setEnteredExpense(event.target.value);
  };
  const detailsHandler = (event) => {
    setEnteredDetails(event.target.value);
  };
  const categoryHandler = (event) => {
    setEnteredCategory(event.target.value);
  };
  const SubmitHandler = (event) => {
    event.preventDefault();
    const obj = {
      enteredExpense,
      enteredDetails,
      enteredCategory,
      __id: Math.random().toString(),
    };

    fetch("https://login-auth-460ac-default-rtdb.firebaseio.com/Expense.json", {
      method: "POST",
      body: JSON.stringify(obj),
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
    // setPrintExpense((prevexpense) => {
    //   return [obj, ...prevexpense];
    // });
    if (totalAmount > 10000) {
      dispatch(themeAction.activePremium(true));
    }
  };
  useEffect(() => {
    if (totalAmount > 10000) {
      dispatch(themeAction.activePremium(true));
    }
  }, [totalAmount]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch(
          "https://login-auth-460ac-default-rtdb.firebaseio.com/Expense.json",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          const newdata = [];
          for (let key in data) {
            newdata.push({ id: key, ...data[key] });
          }

          //setPrintExpense(newdata);
          dispatch(ExpenseAction.addexpense(newdata));
        } else {
          throw data.error;
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchExpenses();
  }, []);

  return (
    <div>
      {premium && (
        <div className={classes.premium}>
          <button onClick={activePremiumHandler}>Active Premium</button>
        </div>
      )}

      <div className={classes.expensefrom}>
        <h1>EXPENSE TRACKER</h1>
        <form onSubmit={SubmitHandler}>
          <div className={classes.input}>
            <div>
              {" "}
              <label htmlFor="Expense Amount">Expense Amount</label>
            </div>{" "}
            <div>
              <input
                type="number"
                ref={amountRef}
                value={enteredExpense}
                onChange={expenseHandler}
                id="enteredExpense"
              ></input>
            </div>
            <div>
              {" "}
              <label htmlFor="Details">Details</label>
            </div>{" "}
            <div>
              <input
                type="text"
                ref={DetailRef}
                value={enteredDetails}
                id="enteredDetails"
                onChange={detailsHandler}
              ></input>
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <select
                ref={CategoryRef}
                onChange={categoryHandler}
                value={enteredCategory}
                id="enteredCategory"
              >
                <option>Food</option>
                <option>Petrol</option>
                <option>Salary</option>
                <option>Travlling</option>
                <option>Study</option>
                <option>House Keeping</option>
              </select>
            </div>
            <div>
              <button>Submit</button>
            </div>
          </div>
        </form>
      </div>
      {showExpense.map((item) => (
        <ExpenseInput
          key={item.__id}
          id={item.id}
          item={item}
          onRemove={removeItemHanler}
          EditExpenseHandler={EditExpenseHandler}
        />
      ))}
      <div>
        <h1>Total Amount = {totalAmount}</h1>
      </div>
    {premium&&activePremium&&<div  className={classes.csv}>
        <CSVLink {...csvLink}><button >Download CSV</button></CSVLink>
      </div>}  
    </div>
  );
};
export default ExpenseForm;
