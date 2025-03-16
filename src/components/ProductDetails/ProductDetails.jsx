import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../Shared/Loader/Loader";
import { cartContext } from "../Context/cartContext";
import { wishlistContext } from "../Context/wishContext"; 
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  
  const { addToCart } = useContext(cartContext);
  const { addToWishlist, removeFromWishlist, wishlist } = useContext(wishlistContext); 

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  };

  function getProductsDetails() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => setDetails(data.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getProductsDetails();
  }, []);

  if (!details) {
    return <Loader />;
  }

  async function addProductToCart(id) {
    let data = await addToCart(id);
    if (data.status === "success") {
      toast.success("🛒 Product added to cart successfully!", { autoClose: 2000 });
    }
  }

  // Wishlist functionality
  const isInWishlist = wishlist.some((item) => item._id === id);

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
    <div className="main-layout mx-auto py-8 px-4 flex gap-8 md:!flex-nowrap  mb-10">
      {/* Left Column - 1/3 width */}
      <div className="w-4/12">
        <Slider {...settings}>
          {details?.images?.map((image, idx) => (
            <div key={idx} className="h-96 p-4">
              <img
                src={image}
                alt={`Product view ${idx + 1}`}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          ))}
          {!details?.images?.length && (
            <div className="h-96 p-4">
              <img
                src={details?.imageCover}
                alt="Product cover"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          )}
        </Slider>
      </div>

      {/* Right Column - 2/3 width */}
      <div className="w-8/12 space-y-6">
        <h1 className="text-3xl font-bold">{details?.title}</h1>
        <p className="text-gray-600 text-lg">{details?.description}</p>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm">
          {details?.category?.name}
        </span>

        <div className="flex justify-between items-center border-b pb-4">
          <p className="text-2xl font-bold text-main">{details?.price} EGP</p>
          <p className="flex items-center gap-1 text-lg">
            <i className="fa fa-star text-[#ffc908]"></i>
            {details?.ratingsAverage}
          </p>
        </div>

        <div className="flex gap-4 items-center">
          {/* Add to Cart Button */}
          <button
            className="w-[80%] bg-main hover:bg-main-dark text-white py-3 rounded-md transition"
            onClick={() => addProductToCart(details.id)}
          >
            Add to cart
          </button>

          {/* Wishlist Button */}
          <button
            className="w-[20%] text-3xl"
            onClick={toggleWishlist}
          >
            <i className={`fa-solid fa-heart ${isInWishlist ? "text-red-500" : ""}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
}
