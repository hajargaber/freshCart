import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./Products.module.css";
import { counterContext } from "../Context/counterContext";
import ProductItem from "../Shared/ProductItem/ProductItem";
import Loader from "../Shared/Loader/Loader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const counter = useContext(counterContext);

  const API_URL = "https://ecommerce.routemisr.com/api/v1/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log("Fetched Products:", response.data);
        setProducts(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.products}>
      <h2 className="text-2xl text-main font-bold text-center my-4">All Products</h2>

      {loading && <div className="middle-loader"> <Loader /></div>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex flex-wrap gap-4 justify-center">
        {products.length > 0
          ? products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          : !loading && <p className="text-center">No products found.</p>}
      </div>
    </div>
  );
}
