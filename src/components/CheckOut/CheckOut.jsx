import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCart } from "../Context/cartContext"; // Use the custom hook
import styles from "./CheckOut.module.css";

export default function CheckOut() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { cartId, cashOnDelivery, onlinePayment } = useCart(); // Use the custom hook
  const [isOnline, setIsOnline] = useState(false);

  const validationSchema = Yup.object({
    details: Yup.string().required("Details are required"),
    phone: Yup.string()
      .matches(/^[0-9]{10,15}$/, "Phone number is not valid")
      .required("Phone number is required"),
    city: Yup.string().required("City is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setErrorMsg("");
        setSuccessMsg("");

        const shippingAddress = {
          details: values.details,
          phone: values.phone,
          city: values.city,
        };

        if (isOnline) {
          const response = await onlinePayment(shippingAddress);
          if (response.status === "success") {
            window.location.href = response.session.url; // Redirect to payment page
          }
        } else {
          const response = await cashOnDelivery(shippingAddress);
          if (response.status === "success") {
            setSuccessMsg("Order placed successfully!");
            resetForm();
          }
        }
      } catch (error) {
        setErrorMsg(error.message || "An error occurred during checkout. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-[50%] mx-auto">
      <h2 className="text-4xl text-gray-600 mb-5">Checkout</h2>

      {errorMsg && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{errorMsg}</div>}
      {successMsg && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{successMsg}</div>}

      {/* Form inputs for details, phone, and city */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          id="details"
          name="details"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.details}
        />
        <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-main">
          Details
        </label>
        {formik.touched.details && formik.errors.details && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.details}</div>
        )}
      </div>

      {/* Phone Input */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          id="phone"
          name="phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-main">
          Phone
        </label>
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
        )}
      </div>

      {/* City Input */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          id="city"
          name="city"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
        />
        <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-main">
          City
        </label>
        {formik.touched.city && formik.errors.city && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.city}</div>
        )}
      </div>

      {/* Checkbox for online payment */}
      <div className="relative z-0 w-full mb-5 group">
        <input type="checkbox" id="online" onChange={() => setIsOnline(!isOnline)} />
        <label htmlFor="online" className="mx-3">Pay online</label>
      </div>

      <button
        type="submit"
        className="text-white bg-main hover:bg-main/70 focus:ring-4 focus:outline-none block ml-auto font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Processing..." : "Pay now"}
      </button>
    </form>
  );
}