// hooks
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// store
import { fetchProducts } from "../features/product/productSlice";
// components
import Card from "../component/Card";
import Loader from "../component/Loader";
import SearchBox from "../component/SearchBox";
import Sidebar from "../component/Sidebar";
// helpers
import {
  filterProducts,
  getInitQuery,
  searchProducts,
} from "../helpers/helper";
// CSS
import styles from "./ProductsPage.module.css";

function ProductsPage() {
  // states
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.product);
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  // effects
  useEffect(() => {
    if (products.length) return;
    dispatch(fetchProducts());
  }, []);

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
          {loading && <Loader />}
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
