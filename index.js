// import {createStore} from 'redux'

// const initialstate = {counter:0,showCounter:true}
// const couterReducer = (state =initialstate,action)=>{
// if(action.type === 'increment'){
    
//     return {
//     counter:state.counter+5,
//     showCounter:state.showCounter
// }
// }
// if(action.type === 'decrement'){
//     return {
//         counter:state.counter-5,
//         showCounter:state.showCounter
//     }
// }
// if(action.type === 'increase'){
//   return {  counter:state.counter+ action.amount,
//  showCounter:state.showCounter,
// }
 
// }
// if(action.type=== 'toggel'){
//     return {
//         showCounter:!state.showCounter,
//         counter:state.counter,

//     }
// }

// return state;

// }

// const store =createStore(couterReducer);

// export default store;
// // const counterSubscriber = ()=>{
// //     const  latestState = store.getState()
// //     console.log(latestState)
// // }

// // store.subscribe(counterSubscriber)
// // store.dispatch({type:'increment'})

import {createSlice,configureStore} from  '@reduxjs/toolkit';

const initialCounterState =  {counter:0,showCounter:true}

const counterSlice = createSlice({
    name:'counter',
    initialState:initialCounterState,
    reducers:{
        increment(state){
            state.counter++;
        },
        decrement(state){
            state.counter--;
        },
        increase(state,action){
            state.counter = state.counter + action.payload;
        },
        toggleCounter(state){
            state.showCounter=!state.showCounter;
        }
    }
});

const initalAuthState={
    isAuthenticated:false,
}

const authSlice = createSlice({
    name:'authentication',
    initialState:initalAuthState,
    reducers:{
        login(state){
            state.isAuthenticated=true;
        }
        ,
        logout(state){
            state.isAuthenticated=false;
        }
    }
})
const store = configureStore({
    reducer:{counter:counterSlice.reducer,auth:authSlice.reducer}
})
export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;
