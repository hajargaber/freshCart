import React from 'react'
import { useState , useEffect } from 'react'
import styles from './StaticSlider.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import photo1 from './../../../../assets/41nN4nvKaAL._AC_SY200_.jpg';
import photo2 from './../../../../assets/61cSNgtEISL._AC_SY200_.jpg';
import photo3 from './../../../../assets/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg';
import photo4 from './../../../../assets/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg';




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
    <div className='main-layout !flex-nowrap !gap-0 flex justify-center mt-5'>
      <div className="w-96">
      
       <Slider {...settings}>
         <img src={photo1} className='w-24' alt="silder photo" />
         <img src={photo2} className='w-24' alt="silder photo" />
      </Slider>
      
      
      
      
      </div>
      <div className="w-3/12">
      <img src={photo3}  className='' alt="photo" />
      <img src={photo4} className='' alt="photo" />
      </div>

    </div>
  )
}
