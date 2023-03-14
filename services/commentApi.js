import { DOMAIN } from "@/utils/setting/config";
import axios from "axios";

export const createComment = async (params, accessToken) => {
  try {
    await axios.post(`${DOMAIN}/comments`, params, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getComment = async (id) => {
  try {
    const res = await axios.get(`${DOMAIN}/comments/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
