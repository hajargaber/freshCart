import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Popularcategories.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Popularcategories() {
  const [categories, setCategories] = useState([]); 

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      console.log(data);
      setCategories(data.data); 
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="py-20">
      <h2 className="mb-5 text-3xl">Shop Popular Categories</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <img
            src={category.image}
            alt="category"
            className="h-[300px] w-full object-cover"
            key={category.id}
          />
        ))}
      </Slider>
    </div>
  );
}
