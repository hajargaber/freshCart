import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../Context/cartContext";
import { tokenContext } from "../Context/TokenContext";
import Loader from "../Shared/Loader/Loader";
import { Link } from "react-router-dom";
import CheckOut from "../CheckOut/CheckOut";

export default function Cart() {
  const { token } = useContext(tokenContext);
  const { cartDetails, getCart, removeProduct, updateCount } =
    useContext(cartContext);

  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    if (token) {
      getCart().finally(() => setLoading(false));
    }
  }, [token]);

  async function deleteProduct(id) {
    setRemoving(true);
    await removeProduct(id);
    await getCart();
    setRemoving(false);
  }

  async function updateProduct(id, count) {
    setRemoving(true);
    await updateCount(id, count);
    await getCart();
    setRemoving(false);
  }

  if (loading) return <div className="middle-loader"> <Loader /></div>;

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-5">My Cart</h2>
      {cartDetails && cartDetails.numOfCartItems === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <div className="flex my-5 justify-between font-semibold items-center py-3">
            <h2 className="text-3xl">
              Total products:{" "}
              <span className="text-main">{cartDetails.numOfCartItems}</span>
            </h2>

            {removing && (
              <div className="w-[20px] flex justify-center">
                <Loader />
              </div>
            )}

            <h2 className="text-3xl">
              Total Price:{" "}
              <span className="text-main">
                {cartDetails.data.totalCartPrice} EGP
              </span>
            </h2>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails.data.products.map((product) => (
                  <tr
                    key={product.product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateProduct(
                              product.product._id,
                              product.count - 1
                            )
                          }
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <input
                            type="number"
                            id={`quantity-${product.product._id}`}
                            className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={product.count}
                            readOnly
                          />
                        </div>
                        <button
                          onClick={() =>
                            updateProduct(
                              product.product._id,
                              product.count + 1
                            )
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price} EGP
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => deleteProduct(product.product._id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Checkout Button */}
          <div className="flex justify-end mt-6">
            <Link to="/checkout"
              onClick={() => {
                // Add your checkout logic here
              }}
              className="px-6 py-3 bg-main text-white rounded-lg  ">
             Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}