//hooks
import { useDispatch } from "react-redux";
// store
import { decrease, increase, removeItem } from "../features/cart/cartSlice";
//helpers
import { shortenText } from "../helpers/helper";
// CSS
import styles from "./BasketCard.module.css";
//icons
import { MdDeleteOutline } from "react-icons/md";

function BasketCard({ data }) {
  const dispatch = useDispatch();
  const { image, title, price, quantity } = data;

  return (
    <div className={styles.card}>
      <div>
        <img src={image} alt={title} />
        <span className={styles.price}>{price}$</span>
      </div>
      <p>{shortenText(title)}</p>
      <div className={styles.actions}>
        {quantity === 1 && (
          <button onClick={() => dispatch(removeItem(data))}>
            {<MdDeleteOutline />}
          </button>
        )}
        {quantity > 1 && (
          <button onClick={() => dispatch(decrease(data))}>-</button>
        )}
        <span>{quantity}</span>
        <button onClick={() => dispatch(increase(data))}>+</button>
      </div>
    </div>
  );
}

export default BasketCard;
