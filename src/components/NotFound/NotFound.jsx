import React from 'react'
import { useState , useEffect } from 'react'
import styles from './NotFound.module.css'
import notFoundImg from '../../assets/imgs/error.svg'
export default function NotFound() {
 const [count,useCount] =useState(0)
  return (
    <div className='container '>
      <img src={notFoundImg} className='w-full' alt="errorPhoto" />
    </div>
  )
}
