import { DOMAIN } from "@/utils/setting/config";
import axios from "axios";

export const checkoutProduct = async (params, accessToken) => {
  try {
    await axios.post(`${DOMAIN}/carts`, params, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
