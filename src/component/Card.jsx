import { Link } from "react-router-dom";
// helpers
import { productQuantity, shortenText } from "../helpers/helper";
// icons
import { TbListDetails } from "react-icons/tb";
import { TbShoppingBagCheck } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
// CSS
import styles from "./Card.module.css";
import { useCart } from "../context/CartProvider";

function Card({ data }) {
  const { id, title, image, price } = data;

  // states
  const [cartState, cartDispatch] = useCart();

  const quantity = productQuantity(cartState, id);

  // handler
  const clickHandler = (type) => {
    cartDispatch({ type, payload: data });
  };

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
            <button onClick={() => clickHandler("REMOVE_ITEM")}>
              <MdDeleteOutline />
            </button>
          ) : quantity > 1 ? (
            <button onClick={() => clickHandler("DECREASE")}>-</button>
          ) : null}
          {quantity !== 0 ? <span>{quantity}</span> : null}
          {quantity === 0 ? (
            <button onClick={() => clickHandler("ADD_ITEM")}>
              <TbShoppingBagCheck />
            </button>
          ) : (
            <button onClick={() => clickHandler("INCREASE")}>+</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
