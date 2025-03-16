import React, { useState, useEffect, useContext } from "react";
import styles from "./RecentProduct.module.css";
import axios from "axios";
import ProductItem from "../../../Shared/ProductItem/ProductItem";
import Loader from "../../../Shared/Loader/Loader";
import { cartContext } from "../../../Context/cartContext";
import { toast } from "react-toastify";
import { theme } from "flowbite-react";

export default function RecentProduct() {
  let [products, setProducts] = useState([]);
  let { addToCart } = useContext(cartContext);

  function getProducts() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        console.log(data);
        setProducts(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function addProductToCart(id) {
    let data = await addToCart(id);

    if (data.status == "success") {
      toast("Product added to cart successfully");
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="main-layout">
      {products.length === 0 && <Loader />}
      {products.length !== 0 &&
        products.map((product) => (
          <ProductItem
            key={product.id}
            addProductToCart={addProductToCart}
            product={product}
          />
        ))}
    </div>
  );
}
