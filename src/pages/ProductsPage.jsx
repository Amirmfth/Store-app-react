// hooks
import { useProducts } from "../context/ProductsProvider";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// components
import Card from "../component/Card";
import Loader from "../component/Loader";
// helpers
import {
  createQueryObject,
  filterProducts,
  getInitQuery,
  searchProducts,
} from "../helpers/helper";
// CSS
import styles from "./ProductsPage.module.css";
// icons
import { ImSearch } from "react-icons/im";
import { FaListUl } from "react-icons/fa";

function ProductsPage() {
  // states
  const products = useProducts();
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  // effects
  useEffect(() => {
    setDisplayed(products);
    setQuery(getInitQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "")
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  // handlers
  const searchHandler = () => {
    setQuery((prevQuery) => createQueryObject(prevQuery, { search }));
  };

  const categoryHandler = (e) => {
    const { tagName } = e.target;
    const category = event.target?.innerText.toLowerCase();
    if (tagName !== "LI") return;
    setQuery((prevQuery) => createQueryObject(prevQuery, { category }));
  };

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
          {!displayed.length && <Loader />}
          {displayed.map((p) => (
            <Card key={p.id} data={p} />
          ))}
        </div>
        <div>
          <div>
            <FaListUl />
            <p>Categories</p>
          </div>
          <ul onClick={categoryHandler}>
            <li>All</li>
            <li>Electronics</li>
            <li>Jewelery</li>
            <li>Men's Clothing</li>
            <li>Women's Clothing</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
