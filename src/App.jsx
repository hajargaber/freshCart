import React, { useState, useEffect, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";
import LayOut from "./components/LayOut/LayOut";
import NotFound from "./components/NotFound/NotFound";
import Register from "./components/Register/Register";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import VerifyResetCode from "./components/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import WishList from "./components/WishList/WishList";
import CheckOut from "./components/CheckOut/CheckOut";
import AllOrders from "./components/AllOrders/AllOrders";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: <LayOut logout={logout} token={token} />,
          children: [
            { index: true, element: <Home /> },
            { path: "categories", element: <Categories /> },
            {
              path: "brands",
              element: (
                <ProtectedRoutes>
                  <Brands />
                </ProtectedRoutes>
              ),
            },
            {
              path: "products",
              element: (
                <ProtectedRoutes>
                  <Products />
                </ProtectedRoutes>
              ),
            },
            {
              path: "wishlist",
              element: (
                <ProtectedRoutes>
                  <WishList />
                </ProtectedRoutes>
              ),
            },
            {
              path: "ProductDetails/:id",
              element: (
                <ProtectedRoutes>
                  <ProductDetails />
                </ProtectedRoutes>
              ),
            },
            {
              path: "cart",
              element: (
                <ProtectedRoutes>
                  <Cart />
                </ProtectedRoutes>
              ),
            },
            {
              path: "checkout",
              element: (
                <ProtectedRoutes>
                  <CheckOut />
                </ProtectedRoutes>
              ),
            },
            {
              path: "allorders",
              element: (
                <ProtectedRoutes>
                  <AllOrders />
                </ProtectedRoutes>
              ),
            },
            { path: "login", element: <Login setToken={setToken} /> },
            { path: "register", element: <Register /> },

            // ✅ تجميع مسارات إعادة تعيين كلمة المرور تحت "/reset-password"
            {
              path: "reset-password",
              children: [
                { index: true, element: <ForgotPassword /> }, // "/reset-password"
                { path: "verify-code", element: <VerifyResetCode /> }, // "/reset-password/verify-code"
                { path: "new-password", element: <ResetPassword /> }, // "/reset-password/new-password"
              ],
            },

            { path: "*", element: <NotFound /> },
          ],
        },
      ]),
    [token]
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
