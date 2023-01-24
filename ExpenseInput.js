import React from "react";
import classes from "../css/ExpenseInput.module.css";
import { useDispatch } from "react-redux";
import { ExpenseAction } from "../store/AuthRedux";
import { useSelector } from "react-redux";
import { removingExpenses } from "../store/expenses-actions";
const ExpenseInput = (props) => {
  const dispatch = useDispatch();
  const deleteHandler = (item) => {
   dispatch(removingExpenses(item.id))
  };

  const EditHandler = item => {
    props.EditExpenseHandler(item)
  }

  return (
    <React.Fragment>
      <div className={classes.expenseInput}>
        <ul>
          <li>
            <label>Expense Amount</label>
            <span className={classes.data}>{props.item.enteredExpense} </span>
            <label>Details</label>
            <span className={classes.data}> {props.item.enteredDetails}</span>
            <label>Category</label>
            <span className={classes.data}> {props.item.enteredCategory}</span>
            <span>
              <button onClick={() => EditHandler(props.item)}>Edit</button>
            </span>
            <span>
              <button onClick={() => deleteHandler(props.item)}>Delete</button>
            </span>
            <hr></hr>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
export default ExpenseInput;
