//hooks
import { useSelector } from "react-redux";
// components
import BasketCard from "../component/BasketCard";
import BasketSidebar from "../component/BasketSidebar";
// CSS
import styles from "./CheckoutPage.module.css";

function CheckoutPage() {
  //states
  const cartState = useSelector((store) => store.cart);

  if (!cartState.itemsCounter)
    return (
      <div className={styles.container}>
        <p>Empty</p>
      </div>
    );

  return (
    <div className={styles.container}>
      <BasketSidebar state={cartState} />
      <div className={styles.products}>
        {cartState.selectedItems.map((product) => (
          <BasketCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}

export default CheckoutPage;
