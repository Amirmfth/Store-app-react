// hooks
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// store
import { fetchProducts } from "../features/product/productSlice";
// components
import Loader from "../component/Loader";
// CSS
import styles from "./DetailsPage.module.css";
// icons
import { SiOpenproject } from "react-icons/si";
import { IoMdPricetag } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";

function DetailsPage() {
  //states
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products } = useSelector((store) => store.product);
  const productDetails = products.find((p) => p.id === +id);

  useEffect(() => {
    if (products.length) return;
    dispatch(fetchProducts());
  }, []);

  if (!productDetails) return <Loader />;

  return (
    <div className={styles.container}>
      <img src={productDetails.image} alt={productDetails.title} />
      <div className={styles.information}>
        <h3>{productDetails.title}</h3>
        <p className={styles.description}>{productDetails.description}</p>
        <p className={styles.category}>
          <SiOpenproject />
          {productDetails.category}
        </p>
        <div>
          <span className={styles.price}>
            <IoMdPricetag />
            {productDetails.price}$
          </span>
          <Link to="/products">
            <FaArrowLeft />
            <span>Back to shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
