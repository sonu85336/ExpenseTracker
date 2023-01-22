import classes from './CartButton.module.css';
import { useDispatch ,useSelector} from 'react-redux';
import { cartshowAction } from '../../Store/storeindex';
const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state)=> state.cart.totalQuantity)
  const cartshowHandler = ()=>{
    dispatch(cartshowAction.cartshowHandler())
  }
  return (
    <button className={classes.button}  onClick={cartshowHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
