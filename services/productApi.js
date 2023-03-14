import { DOMAIN } from "@/utils/setting/config";
import axios from "axios";

export const getProduct = async (params) => {
  try {
    const res = await axios.get(`${DOMAIN}/products`, { params });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getListProductFilter = async (params) => {
  try {
    const res = await axios.get(`http://localhost:3000/products${params}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getListProductPanigation = async (params) => {
  try {
    const res = await axios.get(`${DOMAIN}/products/panigation${params}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${DOMAIN}/products/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
