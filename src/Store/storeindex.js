import { configureStore,createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    cartisvisble:false,
}
const cartVisibleSlice = createSlice({
    name:'cart',
    initialState:initialCartState,
    reducers:{
        cartshowHandler(state,action){
           
        state.cartisvisble = !state.cartisvisble
       
        }
    }
})

const cartSlice = createSlice({
name:'cartitem',
initialState:{
    items:[],
    totalQuantity:0,
},
reducers:{
    addItemToCart(state,action){
        const newItem = action.payload;
        const existingItem = state.items.find((item)=>item.id===newItem.id)
        state.totalQuantity++;
        if(!existingItem){
            state.items.push({
                id:newItem.id,
                price:newItem.price,
                quantity:1,
                totalPrice:newItem.price,
                name:newItem.title
            });
        }else{
            existingItem.quantity++;
            existingItem.totalPrice= existingItem.totalPrice+newItem.price;
        }
    },
    removeItemFromCart(state,action){
        const id = action.payload;
        const existingItem = state.items.find(item=>item.id===id)
        state.totalQuantity--;
        if(existingItem.quantity===1){
            state.items= state.items.filter(item=>item.id !==id);
        }
        else{
           existingItem.quantity--;
        }
    }
}
})



const store = configureStore({
    reducer:{visible:cartVisibleSlice.reducer,cart:cartSlice.reducer}
})
export const  cartshowAction = cartVisibleSlice.actions;
export const cartActions= cartSlice.actions;
export default store;