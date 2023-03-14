import { DOMAIN } from "@/utils/setting/config";
import axios from "axios";

export const sendMail = async (params, accessToken) => {
  try {
    await axios.post(`${DOMAIN}/email`, params, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    console.log(err.data);
  }
};
