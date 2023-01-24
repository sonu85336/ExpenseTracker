import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {  useSelector,useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { cartshowAction } from './Store/storeindex';
import Notification from './components/UI/Notification';
import { cartActions } from './Store/storeindex';
import {fetchCartData }from './Store/Action'
let isInitial = true;
function App() {
  const dispatch = useDispatch()
  const  cartshow = useSelector((state)=>state.visible.cartisvisble)
  const cart = useSelector((state)=>state.cart)
  const notification = useSelector((state)=>state.visible.notification)

  useEffect(()=>{
   dispatch(fetchCartData())
  },[dispatch])
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        cartshowAction.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );
      const response = await fetch(
        'https://reduxpractice-c0253-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }

      dispatch(
        cartshowAction.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        cartshowAction.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    });
  }, [cart, dispatch]);

//   useEffect(()=>{
//     const getdata=  async ()=>{
    
//     try{  const res = await fetch(
//         'https://reduxpractice-c0253-default-rtdb.firebaseio.com/cart.json',
//         {
//           method: 'GET',
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = await res.json()
//           dispatch(cartActions.fetchdata(data))
//     }catch(error){
//       console.log(error.message);
//     }
//   }
//   getdata()
// },[])

  return (<React.Fragment>
   {notification&& <Notification  status= {notification.status}
   title={notification.title}
   message={notification.message}
   />}
    <Layout>
      
     {cartshow&& <Cart  />}
      <Products />
    </Layout>
    </React.Fragment>
  );
}

export default App;
