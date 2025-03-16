import React from 'react'
import { useState , useEffect } from 'react'
import styles from './Home.module.css'
import RecentProduct from './components/RecentProduct/RecentProduct'
import Popularcategories from './components/Popularcategories/Popularcategories'
import StaticSlider from './components/StaticSlider/StaticSlider'

export default function Home() {
 const [count,useCount] =useState(0)
  return (
    <div>
      <StaticSlider/>
      <Popularcategories/>
      <RecentProduct/>
   </div>
  )
}
