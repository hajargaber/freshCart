import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setErrorMsg("");
        const { data } = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          {
            email: values.email,
            newPassword: values.password,
          }
        );
        if (data.message === "success") {
          navigate("/login");
        }
      } catch (error) {
        setErrorMsg(
          error.response?.data?.message || "An unexpected error occurred. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-[50%] mx-auto bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-4xl text-gray-600 mb-5 text-center">Reset Password</h2>

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
          placeholder="Email address"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
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
          placeholder="New Password"
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
          placeholder="Confirm New Password"
        />
        {formik.touched.rePassword && formik.errors.rePassword && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.rePassword}</div>
        )}
      </div>

      <button
        type="submit"
        className={`w-full py-3 rounded-lg text-white font-medium transition ${
          formik.isSubmitting || !formik.isValid || !formik.dirty ? "bg-gray-400 cursor-not-allowed" : "bg-main hover:bg-main-dark"
        }`}
        disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
      >
        {formik.isSubmitting ? <ClipLoader size={20} color="#fff" /> : "Reset Password"}
      </button>
    </form>
  );
}