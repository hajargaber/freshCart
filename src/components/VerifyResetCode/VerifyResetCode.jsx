import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function VerifyResetCode() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("Reset code is required"),
  });

  const formik = useFormik({
    initialValues: { resetCode: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setErrorMsg("");
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          values
        );

        if (data.status === "Success") {
          navigate("/reset-password/new-password");
        } else {
          setErrorMsg("Invalid or expired reset code. Please try again.");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            setErrorMsg("Invalid reset code. Please check and try again.");
          } else if (error.response.status === 410) {
            setErrorMsg("Reset code has expired. Please request a new one.");
          } else {
            setErrorMsg("An unexpected error occurred. Please try again later.");
          }
        } else {
          setErrorMsg("Network error. Please check your internet connection.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-main mb-6">Verify Reset Code</h2>

      {errorMsg && (
        <div className="text-red-500 text-center bg-red-100 p-2 rounded-md mb-4">
          {errorMsg}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="resetCode" className="block text-gray-700 font-medium mb-1">
            Enter your reset code:
          </label>
          <input
            type="text"
            id="resetCode"
            name="resetCode"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resetCode}
            placeholder="Enter reset code"
          />
          {formik.touched.resetCode && formik.errors.resetCode && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.resetCode}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full bg-main text-white py-3 rounded-lg font-medium hover:bg-main-dark transition ${
            formik.isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <ClipLoader size={20} color="#fff" /> : "Verify Code"}
        </button>
      </form>
    </div>
  );
}