import React from 'react'
import { useState , useEffect } from 'react'
import styles from './StaticSlider.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function StaticSlider() {
 const [count,useCount] =useState(0)
 const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  adaptiveHeight: true
}
  return (
    <div className='main-layout !flex-nowrap !gap-0'>
      <div className="w-9/12">
      
       <Slider {...settings}>
         <img src="/slider-image-1.jpeg" className='h-[400px]' alt="silder photo" />
         <img src="/slider-image-3.jpeg" className='h-[400px]' alt="silder photo" />
         <img src="/slider-2.jpeg" className='h-[400px]' alt="silder photo" />
      </Slider>
      
      
      
      
      </div>
      <div className="w-3/12">
      <img src={"/grocery-banner-2.jpeg"}  className='h-[200px]' alt="photo" />
      <img src={"/grocery-banner.png"} className='h-[200px]' alt="photo" />
      </div>

    </div>
  )
}
