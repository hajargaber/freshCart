import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { tokenContext } from "./TokenContext";

// Create the Cart Context
export const cartContext = createContext();

// Cart Context Provider Component
export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartDetails, setCartDetails] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [cartId, setCartId] = useState("");
  const { token } = useContext(tokenContext);

  const API_URL = `https://ecommerce.routemisr.com/api/v1/cart`;
  const headers = { token };

  // Fetch the user's cart
  async function getCart() {
    try {
      const { data } = await axios.get(API_URL, { headers });
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        setCartDetails(data);
        setCartId(data?.data?._id || ""); // Set the cart ID
      }
      return data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error; // Re-throw the error for handling in components
    }
  }

  // Add a product to the cart
  async function addToCart(productId) {
    if (isAdding) return; // Prevent multiple clicks
    setIsAdding(true);

    try {
      const { data } = await axios.post(API_URL, { productId }, { headers });
      if (data.status === "success") {
        await getCart(); // Refresh the cart data
      }
      return data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error; // Re-throw the error for handling in components
    } finally {
      setTimeout(() => setIsAdding(false), 1000); // Reset the adding state
    }
  }

  // Remove a product from the cart
  async function removeProduct(id) {
    try {
      const { data } = await axios.delete(`${API_URL}/${id}`, { headers });
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        setCartDetails(data);
      }
      return data;
    } catch (error) {
      console.error("Error removing product:", error);
      throw error; // Re-throw the error for handling in components
    }
  }

  // Update the quantity of a product in the cart
  async function updateCount(id, count) {
    try {
      const { data } = await axios.put(
        `${API_URL}/${id}`,
        { count },
        { headers }
      );
      if (data.status === "success") {
        setNumOfCartItems(data.numOfCartItems);
        setCartDetails(data);
      }
      return data;
    } catch (error) {
      console.error("Error updating count:", error);
      throw error; // Re-throw the error for handling in components
    }
  }

  // Handle cash-on-delivery orders
  async function cashOnDelivery(shippingAddress) {
    if (!cartId) {
      throw new Error("Cart ID is missing. Please add items to the cart.");
    }
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress },
        { headers }
      );
      return data;
    } catch (error) {
      console.error("Error during checkout:", error);
      throw error; // Re-throw the error for handling in components
    }
  }

  // Handle online payment orders
  async function onlinePayment(shippingAddress) {
    if (!cartId) {
      throw new Error("Cart ID is missing. Please add items to the cart.");
    }
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        { shippingAddress },
        { headers }
      );
      return data;
    } catch (error) {
      console.error("Error during checkout:", error);
      throw error; // Re-throw the error for handling in components
    }
  }
  async function getUserOrders(userId) {
    if (!cartId) {
      // throw new Error("Cart ID is missing. Please add items to the cart.");
    }
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      return data;
    } catch (error) {
      console.error("Error during checkout:", error);
      throw error; // Re-throw the error for handling in components
    }
  }

  // Fetch the cart when the token changes
  useEffect(() => {
    if (token) {
      getCart();
    }
  }, [token]);

  // Provide the context values
  return (
    <cartContext.Provider
      value={{
        numOfCartItems,
        setNumOfCartItems,
        addToCart,
        getCart,
        cartDetails,
        isAdding,
        removeProduct,
        updateCount,
        cashOnDelivery,
        cartId,
        onlinePayment,
        getUserOrders,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
