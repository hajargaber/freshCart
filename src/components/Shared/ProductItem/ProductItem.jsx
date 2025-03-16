import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../Context/cartContext";
import { wishlistContext } from "../../Context/wishContext";
import { toast } from "react-toastify";

export default function ProductItem({ product }) {
  const { addToCart, isAdding } = useContext(cartContext);
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(wishlistContext);
  const { imageCover, title, category, price, ratingsAverage, id } = product;

  const isInWishlist = wishlist.some((item) => item._id === id);

  async function handleAddToCart() {
    let data = await addToCart(id);
    if (data.status === "success") {
      toast.success("🛒 Added to cart!", { autoClose: 2000 });
    } else {
      toast.error("❌ Failed to add to cart!", { autoClose: 2000 });
    }
  }

  async function toggleWishlist() {
    if (isInWishlist) {
      await removeFromWishlist(id);
      toast.info("❌ Removed from wishlist", { autoClose: 2000 });
    } else {
      await addToWishlist(id);
      toast.success("❤️ Added to wishlist!", { autoClose: 2000 });
    }
  }

  return (
    <div className="w-full md:w-1/3 lg:w-1/5 sm:w-full mb-10 px-2 md:px-4 mx-auto">
      <div className="product shadow hover:shadow-main transition-all duration-400 p-3 rounded-lg ">
        <Link to={`/ProductDetails/${id}`}>
          <img src={imageCover} className="mb-1 w-full" alt="product img" />
          <span className="text-[#0aad0a]">{category.name}</span>
          <h2 className="mb-4 font-bold">
            {title.split(" ").splice(0, 2).join(" ")}
          </h2>
          <div className="flex justify-between">
            <p>{price} EGP</p>
            <p>
              <i className="fa fa-star text-[#ffc908]"></i>
              {ratingsAverage}
            </p>
          </div>
        </Link>
        <div className="flex">
          <button
            className={`btn rounded-md bg-main w-[80%] mx-auto text-white p-2 ${
              isAdding ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add to cart"}
          </button>

          <button className="px-4 w-[20%] text-3xl" onClick={toggleWishlist}>
            <i
              className={`fa-solid fa-heart ${
                isInWishlist ? "text-red-500" : ""
              }`}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}
