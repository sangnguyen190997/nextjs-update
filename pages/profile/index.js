import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import DefaultLayout from "../components/Layout/DefaultLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUser } from "@/services/userApi";

const index = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  useEffect(() => {}, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
    },
    validationSchema: Yup.object().shape({
      fullname: Yup.string().required("(*) Full name is not empty"),
      email: Yup.string()
        .required("(*) Email is not empty")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email is invalid"
        ),
      phone: Yup.string()
        .required("(*) Phone is not empty")
        .matches(/^\d{10}$/, "Number phone is invalid"),
    }),
    onSubmit: async (value) => {
      await updateUser(user.id, value, user.access_token);
    },
  });
  return (
    <div>
      <DefaultLayout>
        <div className="container mx-auto m-24">
          <h1 className="mb-12 text-3xl	text-center font-bold">Your Profile</h1>
          <div className="flex justify-start">
            <div>
              <img
                src="https://picsum.photos/200"
                alt="https://picsum.photos/200"
                width={300}
                className="rounded-full"
              />
            </div>
            <div className="ml-20 w-2/4">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-base font-bold text-gray-900 dark:text-white "
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    required
                    onChange={formik.handleChange}
                    name="fullname"
                    value={formik.values.fullname}
                  />
                  {formik.errors.fullname && formik.touched.fullname ? (
                    <div className="text-danger">{formik.errors.fullname}</div>
                  ) : null}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-base font-bold text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    required
                    onChange={formik.handleChange}
                    name="email"
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-base font-bold text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    required
                    onChange={formik.handleChange}
                    name="phone"
                    value={formik.values.phone}
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <div className="text-danger">{formik.errors.phone}</div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default index;
