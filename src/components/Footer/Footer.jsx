import React from 'react'
import { useState , useEffect } from 'react'
import styles from './Footer.module.css'
export default function Footer() {
 const [count,useCount] =useState(0)
  return (
<footer className='bg-[rgb(242,242,242)]  bottom-0 w-screen p-6'>
  <div className="container w-full">
    <h2 className='text-3xl text-[#212529]'>Get the freshcart App</h2>
    <p className='text-[#6d767e] font-light mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, libero.</p>
    <div className="flex mb-5">
    <input   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block grow me-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email..." required />
      <button className='bg-main text-white rounded p-3'>Share app link</button>
    </div>
    <div className="partner flex justify-between py-6 border-y-2">
      <div className="payment">
        <p>payment partners</p>
      </div>
      <div className="app">
        <p>get with freshcart</p>
      </div>
    </div>
  </div>
</footer>
  )
}
