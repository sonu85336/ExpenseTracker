import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import { cartAction } from './Store/storeindex';
function App() {
  const  cartshow = useSelector((state)=>state.cart)
  
  return (
    <Layout>
     {cartshow&& <Cart  />}
      <Products />
    </Layout>
  );
}

export default App;
