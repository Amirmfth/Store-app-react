// hooks
import { createContext, useContext, useEffect, useState } from "react";

// services
import api from "../services/config";

// context
const ProductsContext = createContext();

function ProductsProvider({ children }) {
  // states
  const [products, setProducts] = useState([]);

  // effects
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts(await api.get("/products"));
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
}

const useProducts = () => {
  const products = useContext(ProductsContext);
  return products;
};

const useProductDetails = (id) => {
  const product = useContext(ProductsContext).find(
    (product) => product.id === id
  );
  return product;
};

export default ProductsProvider;
export { useProducts, useProductDetails };
