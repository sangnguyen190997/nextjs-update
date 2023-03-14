import { DOMAIN } from "@/utils/setting/config";
import axios from "axios";

export const getCategory = async () => {
  try {
    const res = await axios.get(`${DOMAIN}/category`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
