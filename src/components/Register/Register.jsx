import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function Register() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setErrorMsg("");
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          values
        );
        if (data.message === "success") {
          navigate("/login");
        }
      } catch (error) {
        setErrorMsg(
          error.response?.data?.message || "Registration failed."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-[50%] mx-auto bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-4xl text-gray-600 mb-5 text-center">Register</h2>

      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMsg}
        </div>
      )}

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          id="name"
          name="name"
          className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="Full Name"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          id="email"
          name="email"
          className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Email address"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="tel"
          id="phone"
          name="phone"
          className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          placeholder="Phone Number"
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          id="password"
          name="password"
          className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Password"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          id="rePassword"
          name="rePassword"
          className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rePassword}
          placeholder="Confirm Password"
        />
        {formik.touched.rePassword && formik.errors.rePassword && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.rePassword}</div>
        )}
      </div>

      <button
        type="submit"
        className={`w-full py-3 rounded-lg text-white font-medium transition ${
          formik.isValid && formik.dirty ? "bg-main hover:bg-main-dark" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? <ClipLoader size={20} color="#fff" /> : "Register"}
      </button>
    </form>
  );
}
