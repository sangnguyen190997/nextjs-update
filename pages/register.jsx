import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "@/services/authApi";
export default function register() {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: Yup.object().shape({
      fullname: Yup.string().required("(*) Full name is not empty"),
      email: Yup.string()
        .required("(*) Email is not empty")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email is invalid"
        ),
      password: Yup.string()
        .required("(*) Password is not empty")
        .min(6, "Must be 6-32 letters")
        .max(32, "Must be 6-32 letters"),
      phone: Yup.string()
        .required("(*) Phone is not empty")
        .matches(/^\d{10}$/, "Number phone is invalid"),
    }),
    onSubmit: async (value) => {
      await registerUser(value);
    },
  });

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
            REGISTER YOUR ACCOUNT
          </div>
          <div className="mt-10">
            <form onSubmit={formik.handleSubmit} encType="application/json">
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="name"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Full Name:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <FaUserAlt />
                  </div>

                  <input
                    onChange={formik.handleChange}
                    required
                    id="fullname"
                    type="text"
                    name="fullname"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-orange-400"
                    placeholder="Name"
                  />
                  {formik.errors.fullname && formik.touched.fullname ? (
                    <div className="text-red-500"></div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>

                  <input
                    onChange={formik.handleChange}
                    required
                    id="email"
                    type="email"
                    name="email"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-orange-400"
                    placeholder="E-Mail Address"
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Password:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </div>

                  <input
                    onChange={formik.handleChange}
                    required
                    id="password"
                    type="password"
                    name="password"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-orange-400"
                    placeholder="Password"
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col mb-6">
                <label
                  htmlFor="c-password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Phone:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <FaUserAlt />
                  </div>

                  <input
                    onChange={formik.handleChange}
                    required
                    id="phone"
                    type="text"
                    name="phone"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-orange-400"
                    placeholder="Phone"
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <div className="text-danger">{formik.errors.phone}</div>
                  ) : null}
                </div>
              </div>

              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-orange-600 hover:bg-orange-700 rounded py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">Register</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center mt-6">
            <Link
              href="/login"
              className="inline-flex items-center font-bold text-orange-500 hover:text-orange-700 text-xs text-center"
            >
              <span>
                <FaSignInAlt className="text-xl" />
              </span>
              <span className="ml-2">Already have an account?</span>
            </Link>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
