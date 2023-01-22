import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {  useSelector } from 'react-redux';

function App() {
  const  cartshow = useSelector((state)=>state.visible.cartisvisble)
  
  return (
    <Layout>
     {cartshow&& <Cart  />}
      <Products />
    </Layout>
  );
}

export default App;
