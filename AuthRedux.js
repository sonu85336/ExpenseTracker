import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialAuthState = {
  token: null,
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;

      // localStorage.setItem('token',state.token)
    },
    logout(state, action) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

const initialExpenseState = {
  expense: [],
  totalAmount:0,
 
};
const ExpenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    addexpense(state, action) {
     
      const newData = action.payload;

      for (let key in newData) {
        state.expense.push({
          id: newData[key].id,
          __id: newData[key].__id,
          enteredExpense: newData[key].enteredExpense,
          enteredDetails: newData[key].enteredDetails,
          enteredCategory: newData[key].enteredCategory,
        });
        state.totalAmount=Number(state.totalAmount) + Number(newData[key].enteredExpense)
      }
      
    },
   

    removeExpense(state, action) {
      state.expense = action.payload;
    },
    editExpense(state, action) {
     // state.expense = action.payload;
     const newData = action.payload;

      for (let key in newData) {
        state.expense.push({
          id: newData[key].id,
        __id:newData[key].__id,
          enteredExpense: newData[key].enteredExpense,
          enteredDetails: newData[key].enteredDetails,
          enteredCategory: newData[key].enteredCategory,
        });

       }
    },
  }
});


const initialThemeState={
  
  darkMode:'light',
  premium:false,
  cvandDark:false,
  
}
const themeSlice = createSlice({
  name:'theme',
  initialState:initialThemeState,
  reducers:{
    changeTheme(state,action){
      //state.darkMode = 'light'
      state.darkMode= state.darkMode==='light'? "dark":"light"
     
    },
    activePremium(state,action){
       state.premium=action.payload;
    },
    cvDarkMode(state,action){
      state.cvandDark=action.payload;
    }
  }
})
const store = configureStore({
  reducer: { auth: authSlice.reducer, expenseitem: ExpenseSlice.reducer ,theme:themeSlice.reducer},
});
export const authActions = authSlice.actions;
export const ExpenseAction = ExpenseSlice.actions;
export const themeAction= themeSlice.actions;
export default store;
