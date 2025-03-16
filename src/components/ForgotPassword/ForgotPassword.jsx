import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
  });

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setErrorMsg('');
        const { data } = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
          values
        );

        if (data.statusMsg === 'success') {
          setSuccessMsg('Reset code sent to your email');
          setTimeout(() => navigate('/reset-password/verify-code'), 2000);
        }
      } catch (error) {
        setErrorMsg(error.response?.data?.message || 'Failed to send reset code');
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-4xl font-bold text-center text-main mb-4">FreshCart</h1>
      <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">Forgot Password</h2>
      
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {errorMsg && <div className="text-red-500 text-center bg-red-100 p-2 rounded-md">{errorMsg}</div>}
        {successMsg && <div className="text-green-500 text-center bg-green-100 p-2 rounded-md">{successMsg}</div>}

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Enter your email"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-main text-white py-3 rounded-lg font-medium hover:bg-main-dark transition"
        >
          {formik.isSubmitting ? <ClipLoader size={20} color="#fff" /> : 'Send Reset Link'}
        </button>
      </form>

      <div className="text-center mt-6">
        <button
          onClick={() => navigate('/login')}
          className="text-main font-medium hover:underline"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}