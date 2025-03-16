import React from 'react'
import { useState , useEffect } from 'react'
import styles from './Loader.module.css'
export default function Loader() {
 const [count,useCount] =useState(0)
  return (
    <div className='mx-auto'>

<img src="/loading-green-loading.gif" alt="loader gif " />


    </div>
  )
}
