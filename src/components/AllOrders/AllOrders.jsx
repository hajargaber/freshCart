import React, { useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { cartContext } from '../Context/cartContext';
import { tokenContext } from '../Context/TokenContext';

export default function AllOrders() {
  const [orders, setOrders] = useState([]); // Fixed useState syntax
  const { getUserOrders } = useContext(cartContext); 
  const { token } = useContext(tokenContext); 

  async function getOrders(id) {
    try {
      let data = await getUserOrders(id);
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    if (token) {
      let decodedToken = jwtDecode(token);
      console.log(decodedToken, "Decoded Token");
      getOrders(decodedToken.id);
    }
  }, [token]);

  return (
    <div className="relative overflow-x-auto mt-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Order ID</th>
            <th scope="col" className="px-6 py-3">Is Paid</th>
            <th scope="col" className="px-6 py-3">Payment Method</th>
            <th scope="col" className="px-6 py-3">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map(order => (
              <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {order.id}
                </th>
                <td className="px-6 py-4">
                  {order.isPaid ? "Paid" : "Not Paid"}
                </td>
                <td className="px-6 py-4">
                  {order.paymentMethodType}
                </td>
                <td className="px-6 py-4">
                  ${order.totalOrderPrice}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
