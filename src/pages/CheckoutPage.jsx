//hooks
import { useCart } from "../context/CartProvider";
// components
import BasketCard from "../component/BasketCard";
import BasketSidebar from "../component/BasketSidebar";
// CSS
import styles from "./CheckoutPage.module.css"

function CheckoutPage() {
  //states
  const [cartState, cartDispatch] = useCart();

  //handlers
  const clickHandler = (type, payload) => cartDispatch({ type, payload });

  if (!cartState.itemsCounter)
    return (
      <div className={styles.container}>
        <p>Empty</p>
      </div>
    );

  return (
    <div className={styles.container}>
      <BasketSidebar state={cartState} clickHandler={clickHandler} />
      <div className={styles.products}>
        {cartState.selectedItems.map((product) => (
          <BasketCard
            key={product.id}
            data={product}
            clickHandler={clickHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default CheckoutPage;
