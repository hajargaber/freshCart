import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";
import { tokenContext } from "./TokenContext";

export const wishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { token } = useContext(tokenContext);
  const API_URL = `https://ecommerce.routemisr.com/api/v1/wishlist`;
  const headers = { token };

  async function getWishlist() {
    try {
      const { data } = await axios.get(API_URL, { headers });
      setWishlist(data.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  async function addToWishlist(productId) {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data } = await axios.post(API_URL, { productId }, { headers });
      if (data.status === "success") {
        await getWishlist();
      }
      return data;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  }
  
  async function removeFromWishlist(id) {
    try {
      await axios.delete(`${API_URL}/${id}`, { headers });
      setWishlist((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  }

  useEffect(() => {
    if (token) {
      getWishlist();
    }
  }, [token]);

  return (
    <wishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        getWishlist,
        isLoading,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
