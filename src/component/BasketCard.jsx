//helpers
import { shortenText } from "../helpers/helper";
// CSS
import styles from "./BasketCard.module.css";
//icons
import { MdDeleteOutline } from "react-icons/md";

function BasketCard({ data, clickHandler }) {
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
          <button onClick={() => clickHandler("REMOVE_ITEM", data)}>
            {<MdDeleteOutline />}
          </button>
        )}
        {quantity > 1 && (
          <button onClick={() => clickHandler("DECREASE", data)}>-</button>
        )}
        <span>{quantity}</span>
        <button onClick={() => clickHandler("INCREASE", data)}>+</button>
      </div>
    </div>
  );
}

export default BasketCard;
