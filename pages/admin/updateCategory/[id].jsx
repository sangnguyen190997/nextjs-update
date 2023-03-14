import React, { useEffect } from "react";
import Sidebar_com from "../components/Sidebar_com";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileBase from "react-file-base64";
import {
  update_Category,
  getCategoriesData,
  getCategoryById,
} from "@/services/admin";
import Router from "next/router";

import Image from "next/image";

export async function getStaticProps({ params }) {
  const CategoryData = await getCategoryById(params.id);

  return {
    props: { CategoryData },
  };
}

export async function getStaticPaths() {
  const category = await getCategoriesData();

  return {
    paths: category.map((cate) => {
      return {
        params: { id: String(cate.id) },
      };
    }),
    fallback: false,
  };
}

export default function updateCategory({ CategoryData }) {
  const [formData, setFormData] = useState({
    name: CategoryData.name,
    isActive: CategoryData.isActive,
  });

  const [checked, setChecked] = useState(true);
  const handleImageChange = (base64) => {
    setImageData(base64);
  };

  const updateNow = async () => {
    const res = await update_Category(formData);
    if (res.msg) {
      toast.success(res.msg);
      Router.push("/admin/categories");
    } else {
      toast.error(res.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateNow();
  };

  const fnCheckBox = (e) => {
    setChecked(!checked);
    setFormData({ ...formData, isActive: checked });
  };

  return (
    <div className="w-full h-screen flex">
      <Sidebar_com />
      <div className="w-10/12 h-full flex flex-col items-center bg-gray-300 ">
        <div className="w-full p-4  mt-10 mb-4 flex items-center justify-center">
          <h1 className="text-4xl font-semibold tracking-widest border-b p-2 uppercase">
            Update Category
          </h1>
        </div>

        <form className="" onSubmit={handleSubmit}>
          <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium  ">
              Category Name
            </label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              type="text"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-600 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              placeholder="Category name"
              required
            />
          </div>
          <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium ">
              Is Active
            </label>
            <input
              type="checkbox"
              value={formData.isActive}
              onChange={(e) => fnCheckBox(e)}
            />
          </div>

          <button
            type="submit"
            class="text-white bg-orange-600 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-600 dark:focus:ring-orange-600"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
