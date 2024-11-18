import { Link } from "react-router-dom";
// hooks
import { useDispatch, useSelector } from "react-redux";
// store
import {
  addItem,
  decrease,
  increase,
  removeItem,
} from "../features/cart/cartSlice";
// helpers
import { productQuantity, shortenText } from "../helpers/helper";
// icons
import { TbListDetails } from "react-icons/tb";
import { TbShoppingBagCheck } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
// CSS
import styles from "./Card.module.css";

function Card({ data }) {
  const { id, title, image, price } = data;

  // states
  // const [cartState, cartDispatch] = useCart();
  const cartState = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const quantity = productQuantity(cartState, id);

  return (
    <div className={styles.card}>
      <img src={image} alt={title} />
      <h3>{shortenText(title)}</h3>
      <p>{price}$</p>
      <div className={styles.actions}>
        <Link to={`/products/${id}`}>
          <TbListDetails />
        </Link>
        <div>
          {quantity === 1 ? (
            <button onClick={() => dispatch(removeItem(data))}>
              <MdDeleteOutline />
            </button>
          ) : quantity > 1 ? (
            <button onClick={() => dispatch(decrease(data))}>-</button>
          ) : null}
          {quantity !== 0 ? <span>{quantity}</span> : null}
          {quantity === 0 ? (
            <button onClick={() => dispatch(addItem(data))}>
              <TbShoppingBagCheck />
            </button>
          ) : (
            <button onClick={() => dispatch(increase(data))}>+</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
