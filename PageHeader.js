import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from '../css/PageHeader.module.css'
function PageHeader() {
  return (
     <React.Fragment  >
      <header  className={classes.pageheader}> <div >Welcome to Expense Tracker !!!</div> <span>Your profile incomplete.<NavLink 
       style={{textDecoration:'none'}} to="/ExpensePage:ProfilePage">Complete now</NavLink></span> </header>
     </React.Fragment>
  )
}

export default PageHeader
