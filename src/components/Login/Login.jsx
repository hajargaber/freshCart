import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { tokenContext } from "../Context/tokenContext";

export default function Login() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useContext(tokenContext);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setErrorMsg("");
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );

        localStorage.setItem("token", JSON.stringify(data.token));
        setToken(data.token);
        navigate("/");
      } catch (error) {
        setErrorMsg(
          error.response?.data?.message ||
            "An error occurred during login. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-[50%] mx-auto bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-4xl text-gray-600 mb-5 text-center">Login</h2>

      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMsg}
        </div>
      )}

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          id="email"
          name="email"
          className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          autoComplete="email"
          placeholder="Email address"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            autoComplete="current-password"
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-main"
          >
            {showPassword ? "👁️" : "👁️🗨️"}
          </button>
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.password}
          </div>
        )}
      </div>

      <button
        type="submit"
        className={`w-full py-3 rounded-lg text-white font-medium transition ${
          formik.isValid && formik.dirty ? "bg-main hover:bg-main-dark" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? <ClipLoader size={20} color="#fff" /> : "Login"}
      </button>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => navigate("/reset-password")}
          className="text-main hover:text-main-dark underline"
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );
}
