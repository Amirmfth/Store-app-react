// hooks
import { useProducts } from "../context/ProductsProvider";
import { useState } from "react";
// components
import Card from "../component/Card";
import Loader from "../component/Loader";
// CSS
import styles from "./ProductsPage.module.css";
// icons
import { ImSearch } from "react-icons/im";

function ProductsPage() {
  // states
  const [search, setSearch] = useState("");
  const products = useProducts();

  // handlers
  const searchHandler = () => {
    
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
        />
        <button onClick={searchHandler}>
          <ImSearch />
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.products}>
          {!products.length && <Loader />}
          {products.map((p) => (
            <Card key={p.id} data={p} />
          ))}
        </div>
        <div>sidebar</div>
      </div>
    </>
  );
}

export default ProductsPage;
