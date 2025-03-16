import React, { useContext, useEffect, useState } from "react";
import { wishlistContext } from "../Context/wishContext";
import { tokenContext } from "../Context/TokenContext";
import { cartContext } from "../Context/cartContext"; 
import Loader from "../Shared/Loader/Loader";

export default function WishList() {
  const { token } = useContext(tokenContext);
  const { wishlist, getWishlist, removeFromWishlist } = useContext(wishlistContext);
  const { addToCart } = useContext(cartContext); 

  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null); 

  useEffect(() => {
    if (token) {
      getWishlist().finally(() => setLoading(false));
    }
  }, [token]);

  async function deleteWishlistItem(id) {
    setRemoving(id);
    await removeFromWishlist(id);
    await getWishlist();
    setRemoving(null);
  }

  async function handleAddToCart(productId) {
    setAddingToCart(productId); 
    try {
      await addToCart(productId); 
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart(null); 
    }
  }

  if (loading) return <div className="middle-loader"> <Loader /></div>;

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-5">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md">
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-48 object-cover mb-3"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-700">{product.price} EGP</p>
              <div className="flex gap-2 mt-3">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  onClick={() => deleteWishlistItem(product.id)}
                  disabled={removing === product.id}
                >
                  {removing === product.id ? "Removing..." : "Remove"}
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={addingToCart === product.id}
                >
                  {addingToCart === product.id ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}