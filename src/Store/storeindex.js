import { configureStore,createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    cart:null,
}
const cartSlice = createSlice({
    name:'cart',
    initialState:initialCartState,
    reducers:{
        cartshowHandler(state,action){
            if(state.cart==true)
        {state.cart = false}else{
            state.cart=true;
        }
        }
    }
})



const store = configureStore({
    reducer:cartSlice.reducer
})
export const  cartAction = cartSlice.actions
export default store;