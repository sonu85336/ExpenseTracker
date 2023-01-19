import React from "react";
import  classes from '../css/ExpenseInput.module.css'
const ExpenseInput =(props)=>{
console.log(  props.printexpense,'from inpuptpage' )

    return (
        <React.Fragment>
<div  className={classes.expenseInput}>
 <ul>
      {props.printexpense.map((item)=>(
        <li key = {Math.random().toString()} >
            <label>Expense Amount</label>
       <span className={classes.data}>{item.enteredExpense} </span>
       <label>Details</label>
      <span className={classes.data}> {item.enteredDetails}</span> 
      <label>Category</label>
      <span className={classes.data}> {item.enteredCategory}</span> 
      <hr></hr>
        </li>
      ))}
    </ul> 
    </div>
    </React.Fragment>
    )
}
export default ExpenseInput;