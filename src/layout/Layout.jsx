// routes
import { Link } from "react-router-dom";
// icons
import { PiShoppingCartSimpleBold } from "react-icons/pi";
// hooks
import { useSelector } from "react-redux";
// css
import styles from "./Layout.module.css";

function Layout({ children }) {
  //states
  const state = useSelector((store) => store.cart);
  return (
    <>
      <header className={styles.header}>
        <Link to="/products">Amirmfth | Shop</Link>
        <Link to="/checkout">
          <div>
            <PiShoppingCartSimpleBold />
            {!!state.itemsCounter && <span>{state.itemsCounter}</span>}
          </div>
        </Link>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed by Amir with ❤️</p>
      </footer>
    </>
  );
}

export default Layout;
