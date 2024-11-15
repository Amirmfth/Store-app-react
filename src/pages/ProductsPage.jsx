// hooks
import { useProducts } from "../context/ProductsProvider";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// components
import Card from "../component/Card";
import Loader from "../component/Loader";
// helpers
import {
  filterProducts,
  getInitQuery,
  searchProducts,
} from "../helpers/helper";
// CSS
import styles from "./ProductsPage.module.css";
// icons
import SearchBox from "../component/SearchBox";
import Sidebar from "../component/Sidebar";

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
    setSearch(query.search || "");
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  

  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={styles.container}>
        <div className={styles.products}>
          {!displayed.length && <Loader />}
          {displayed.map((p) => (
            <Card key={p.id} data={p} />
          ))}
        </div>
        <Sidebar query={query} setQuery={setQuery} />
      </div>
    </>
  );
}

export default ProductsPage;
