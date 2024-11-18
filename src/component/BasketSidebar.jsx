// hooks
import { useDispatch } from "react-redux";
// store
import { checkout as checkoutAction } from "../features/cart/cartSlice";
//icons
import { TbChecklist } from "react-icons/tb";
import { FaHashtag } from "react-icons/fa6";
import { BsPatchCheck } from "react-icons/bs";
// CSS
import styles from "./BasketSidebar.module.css";

function BasketSidebar({ state }) {
  const dispatch = useDispatch();
  const { totalPrice, itemsCounter, checkout } = state;
  return (
    <div className={styles.sidebar}>
      <div>
        <TbChecklist />
        <p>Total Price:</p>
        <span>{totalPrice}</span>
      </div>
      <div>
        <FaHashtag />
        <p>Quantity:</p>
        <span>{itemsCounter}</span>
      </div>
      <div>
        <BsPatchCheck />
        <p>Status</p>
        <span>{!checkout && "Pending"}</span>
      </div>
      <button onClick={() => dispatch(checkoutAction())}>Checkout</button>
    </div>
  );
}

export default BasketSidebar;
