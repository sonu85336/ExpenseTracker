import classes from './CartButton.module.css';
import { useDispatch } from 'react-redux';
import { cartAction } from '../../Store/storeindex';
const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartshowHandler = ()=>{
    dispatch(cartAction.cartshowHandler())
  }
  return (
    <button className={classes.button}  onClick={cartshowHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
