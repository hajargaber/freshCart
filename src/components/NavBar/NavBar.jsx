import React, { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import styles from "./NavBar.module.css";
import logo from "../../assets/imgs/freshcart-logo.svg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { counterContext } from "../Context/counterContext";
import { tokenContext } from "../Context/tokenContext";
import { cartContext } from "../Context/cartContext";

export default function NavBar() {
  let navigate = useNavigate();
  let { token } = useContext(tokenContext);
  // console.log(token);
  let { numOfCartItems } = useContext(cartContext);
  function logOut() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center gap-4">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} alt="fresh logo" />
          </Link>

          <div
            className="hidden w-full md:block md:w-auto absolute top-[40px] left-0 md:relative md:top-0"
            id="navbar-default"
          >
            {token ? (
              <ul className="font-medium flex items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to={""}
                    className="block py-2 px-3  rounded-sm   dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"Cart"}
                    className="block py-2 px-3 text-gray-900 rounded-sm md:border-0  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Cart {numOfCartItems}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"Products"}
                    className="block py-2 px-3 text-gray-900 rounded-sm md:border-0  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"wishList"}
                    className="block py-2 px-3 text-gray-900 rounded-sm md:border-0  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Wish List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"Categories"}
                    className="block py-2 px-3 text-gray-900 rounded-sm md:border-0  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"Brands"}
                    className="block py-2 px-3 text-gray-900 rounded-sm md:border-0  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Brands
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <ul className="flex gap-3">
            <li>
              <i className="fa-brands fa-instagram cursor-pointer"></i>
            </li>
            <li>
              <i className="fa-brands fa-facebook cursor-pointer"></i>
            </li>
            <li>
              <i className="fa-brands fa-tiktok cursor-pointer"></i>
            </li>
            <li>
              <i className="fa-brands fa-twitter cursor-pointer"></i>
            </li>
            <li>
              <i className="fa-brands fa-linkedin cursor-pointer"></i>
            </li>
            <li>
              <i className="fa-brands fa-youtube cursor-pointer"></i>
            </li>
          </ul>
          <ul className="flex gap-3">
            {token ? (
              <li>
                <span onClick={logOut} className="cursor-pointer">
                  SignOut
                </span>
              </li>
            ) : (
              <>
                {" "}
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
