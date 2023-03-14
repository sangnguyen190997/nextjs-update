import { useFormik } from "formik";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import HomeLayout from "../components/Home/HomeLayout";
import queryString from "query-string";
import { checkoutProduct } from "@/services/checkoutApi";
import { sendMail } from "@/services/emailApi";
import DefaultLayout from "../components/Layout/DefaultLayout";

const index = () => {
  const { carts, cartTotalPrice } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.auth.login);
  const { access_token } = currentUser;
  const [success, setSuccess] = useState(false);
  const [load, setLoad] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .matches(
          "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
          "Fullname is invalid"
        )
        .min(10)
        .max(20),
      email: Yup.string()
        .required("Required")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email is invalid")
        .min(10),
      phone: Yup.string()
        .required("Required")
        .matches(/^[0-9]+$/, "Number phone is invalid")
        .min(10)
        .max(10),
      address: Yup.string()
        .required("Required")
        .matches(
          "^[/0-9a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
          "Address is invalid"
        )
        .max(30),
    }),
    onSubmit: async (value) => {
      for (let item of carts) {
        const params = {
          product: item.product.id,
          user: currentUser.id,
          img: item.product.image1,
          nameProduct: item.product.name,
          count: item.quantity,
          priceProduct: 100,
        };

        await checkoutProduct(params, access_token);
        await sendMail(value, access_token);
        setLoad(!load);
        setTimeout(() => {
          setLoad(false);
          setSuccess(!success);
        }, 4000);
      }
    },
  });
  console.log({ load });
  return (
    <DefaultLayout>
      <Fragment>
        {load && (
          <div className="wrapper_loader">
            <div className="loader"></div>
          </div>
        )}

        <div className="container mx-auto m-20">
          <section className="py-5 bg-slate-100	">
            <div className="container mx-auto">
              <div className="flex justify-between p-10">
                <h1 className="h2 uppercase mb-0 font-semibold text-4xl	">
                  Checkout
                </h1>
                <h1 className="text-2xl">Home / Cart / Checkout</h1>
              </div>
            </div>
          </section>
          {!success && (
            <section className="py-10">
              <h2 className="uppercase mb-4 font-semibold">BILLING DETAILS</h2>
              <div className="grid grid-cols-12">
                <div className="col-span-9">
                  <form className="mr-10" onSubmit={formik.handleSubmit}>
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white uppercase">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Enter Your Full Name Here!"
                        id="fullName"
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                      />
                      <p className="text-sm text-red-500">
                        {formik.errors.fullName}
                      </p>
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white uppercase">
                        Email
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Enter Your Email Here!"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      <p className="text-sm text-red-500">
                        {formik.errors.email}
                      </p>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white uppercase"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Enter Your Phone Number Here!"
                        id="phone"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                      />
                      <p className="text-sm text-red-500">
                        {formik.errors.phone}
                      </p>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white uppercase"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Enter Your Address Here!"
                        id="address"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                      />
                      <p className="text-sm text-red-500">
                        {formik.errors.address}
                      </p>
                    </div>
                    <section>
                      <button
                        type="submit"
                        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Check out
                      </button>
                    </section>
                  </form>
                </div>

                <div className="col-span-3">
                  <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className="card-body">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
                        Your Order
                      </h5>
                      <ul className="list-none mb-0">
                        {carts.map((item, index) => (
                          <div key={index}>
                            <li className="border-b-2 my-5"></li>
                            <li className="flex items-center justify-between">
                              <strong className="uppercase font-semibold">
                                {item.product.name}
                              </strong>
                              <span className="text-current">
                                ${item.product.price} x {item.quantity}
                              </span>
                            </li>
                            <li className="border-b-2 my-5"></li>
                          </div>
                        ))}
                        <li className="flex items-center justify-between mb-4">
                          <strong className="uppercase font-semibold">
                            Total
                          </strong>
                          <span>${cartTotalPrice}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          {success && (
            <section className="py-5">
              <div className="p-5">
                <h1>You Have Successfully Ordered!</h1>
                <p style={{ fontSize: "1.2rem" }}>Please Check Your Email.</p>
              </div>
            </section>
          )}
        </div>
      </Fragment>
    </DefaultLayout>
  );
};

export default index;
